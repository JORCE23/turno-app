from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
import os
import httpx
import joblib
import pandas as pd
from datetime import datetime, timedelta
from dotenv import load_dotenv

# Buscar el .env explícitamente en la carpeta raíz y forzar su lectura
ruta_env = os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env')

if os.path.exists(ruta_env):
    print(f"📄 ¡Archivo .env físico ENCONTRADO en la ruta exacta!")
    load_dotenv(ruta_env, override=True)
else:
    print(f"⚠️ EL ARCHIVO FÍSICO NO EXISTE EN: {ruta_env}")
    print("   👉 Revisa si Windows lo guardó como '.env.txt' sin querer.")

print("☁️ Open-Meteo API (No requiere Key). ¡Listo para consultar el clima!")

app = FastAPI(title="Turno MVP API")

# Configurar CORS para permitir que el frontend local se conecte
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Permitir todos en MVP
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Intentar cargar el modelo ML al iniciar el servidor
model_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'modelo.pkl')
modelo_ml = None
if os.path.exists(model_path):
    modelo_ml = joblib.load(model_path)

@app.get("/")
def read_root():
    return {"message": "Turno MVP API funcionando", "status": "ok"}

@app.get("/api/dashboard")
async def get_dashboard_data():
    data_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'dashboard_data.json')
    
    if not os.path.exists(data_path):
        return {"error": "Datos no generados aún. Ejecuta python turno_procesar.py"}
        
    with open(data_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    # --- MOTOR DE ANALÍTICA PRESCRIPTIVA ---
    clima = await obtener_clima_concepcion()
    prediccion_res = obtener_prediccion_hoy()
    
    prediccion = prediccion_res.get("prediccion_ventas", 0) if "prediccion_ventas" in prediccion_res else 0
    meta_diaria = 1500000  # Meta ficticia del local para hoy
    brecha = meta_diaria - prediccion
    
    recomendaciones_ia = []
    
    # Regla 1: Cruzando Clima con Operación
    if "error" not in clima:
        if clima.get("lluvia"):
            recomendaciones_ia.append({
                "mensaje": f"Lluvia en tiempo real ({clima['temperatura']}°C). Las ventas en salón caerán. Sugerencia: Habilita 1 repartidor extra y lanza promo por Delivery."
            })
        else:
            recomendaciones_ia.append({
                "mensaje": f"Buen clima detectado ({clima['temperatura']}°C). Sugerencia: Habilita mesas en la terraza y prioriza venta de bebidas frías."
            })
    else:
        recomendaciones_ia.append({
            "mensaje": "⚠️ Clima no disponible. Verifica que el archivo .env tenga la OPENWEATHER_API_KEY correcta."
        })
            
    # Regla 2: Cruzando Predicción con Metas
    if brecha > 0 and prediccion > 0:
        recomendaciones_ia.append({
            "mensaje": f"Predicción: ${prediccion:,.0f} CLP. Te faltan ${brecha:,.0f} para tu meta diaria. Sugerencia: Lanza Happy Hour anticipado a las 18:30 para empujar ventas."
        })

    # Nos aseguramos de mantener la llave de recomendaciones original intacta
    if "recomendaciones" not in data:
        data["recomendaciones"] = []
        
    data["clima"] = clima
    data["prediccion_hoy"] = prediccion
    data["recomendaciones_ia"] = recomendaciones_ia
        
    return data

@app.get("/api/clima")
async def obtener_clima_concepcion():
    # Coordenadas exactas (Concepción, Chile)
    lat = "-36.82699"
    lon = "-73.04977"
    
    # API Open-Meteo sin Keys
    url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,precipitation,weather_code&timezone=America%2FSantiago"
    
    # timeout=3.0 obliga a que no se quede pegado pensando si el wifi parpadea
    async with httpx.AsyncClient(timeout=3.0) as client:
        try:
            respuesta = await client.get(url)
            if respuesta.status_code == 200:
                datos = respuesta.json()
                current = datos.get("current", {})
                temp = current.get("temperature_2m", 0)
                precip = current.get("precipitation", 0)
                wmo_code = current.get("weather_code", 0)
                es_lluvia = precip > 0 or wmo_code in [51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99]
                condicion = "lluvia" if es_lluvia else ("nublado" if wmo_code in [1, 2, 3, 45, 48] else "despejado")
                return {"temperatura": temp, "condicion": condicion, "lluvia": es_lluvia}
        except Exception as e:
            print(f"❌ Error de clima: {e}")
            
        return {"temperatura": 14, "condicion": "nublado (simulado)", "lluvia": False}

@app.get("/api/prediccion")
def obtener_prediccion_hoy():
    if modelo_ml is None:
        return {"error": "El modelo no está entrenado. Ejecuta entrenar_modelo.py primero."}
    
    hoy = datetime.now()
    
    # 1. Crear las features exactas que necesita el modelo en formato DataFrame
    X_pred = pd.DataFrame([{
        'dia_semana': hoy.weekday(),
        'es_fin_de_semana': 1 if hoy.weekday() >= 4 else 0,
        'dia_mes': hoy.day
    }])
    
    # 2. Generar predicción
    prediccion = modelo_ml.predict(X_pred)[0]
    
    return {
        "fecha": hoy.strftime("%Y-%m-%d"),
        "prediccion_ventas": int(prediccion)
    }

@app.get("/api/prediccion_semana")
def obtener_prediccion_semana():
    if modelo_ml is None:
        return {"error": "El modelo no está entrenado. Ejecuta entrenar_modelo.py primero."}
    
    hoy = datetime.now()
    dias_semana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
    
    nombres_dias = []
    predicciones = []
    
    for i in range(7):
        dia_futuro = hoy + timedelta(days=i)
        X_pred = pd.DataFrame([{
            'dia_semana': dia_futuro.weekday(),
            'es_fin_de_semana': 1 if dia_futuro.weekday() >= 4 else 0,
            'dia_mes': dia_futuro.day
        }])
        pred = modelo_ml.predict(X_pred)[0]
        nombres_dias.append(dias_semana[dia_futuro.weekday()])
        predicciones.append(int(pred))
        
    return {
        "dias": nombres_dias,
        "predicciones": predicciones
    }
