from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
import os
import httpx
import joblib
import pandas as pd
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

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
            
    # Regla 2: Cruzando Predicción con Metas
    if brecha > 0 and prediccion > 0:
        recomendaciones_ia.append({
            "mensaje": f"Predicción: ${prediccion:,.0f} CLP. Te faltan ${brecha:,.0f} para tu meta diaria. Sugerencia: Lanza Happy Hour anticipado a las 18:30 para empujar ventas."
        })

    data["clima"] = clima
    data["prediccion_hoy"] = prediccion
    data["recomendaciones_ia"] = recomendaciones_ia
        
    return data

@app.get("/api/clima")
async def obtener_clima_concepcion():
    # Coordenadas exactas (Concepción, Chile)
    lat = "-36.82699"
    lon = "-73.04977"
    
    api_key = os.getenv("OPENWEATHER_API_KEY")
    if not api_key:
        return {"error": "API Key de OpenWeather no configurada en el entorno"}
        
    url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}&units=metric&lang=es"
    
    async with httpx.AsyncClient() as client:
        respuesta = await client.get(url)
        if respuesta.status_code == 200:
            datos = respuesta.json()
            es_lluvia = "rain" in datos["weather"][0]["main"].lower() or "lluvia" in datos["weather"][0]["description"].lower()
            return {
                "temperatura": datos["main"]["temp"],
                "condicion": datos["weather"][0]["description"],
                "lluvia": es_lluvia
            }
        return {"error": "Error al conectar con OpenWeather"}

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
