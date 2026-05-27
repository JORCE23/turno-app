import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
import joblib
import os

def entrenar_y_guardar_modelo():
    print("🧠 Iniciando entrenamiento del modelo ML de Turno...")
    
    # 1. Cargar datos
    ruta_csv = 'data/ventas_raw.csv'
    if not os.path.exists(ruta_csv):
        print(f"❌ Error: No se encontró {ruta_csv}. Ejecuta turno_generar_csv.py primero.")
        return

    df = pd.read_csv(ruta_csv)
    
    # 2. Preparar los datos (Ingeniería de Características)
    print("📊 Preparando features temporales...")
    df['fecha_hora'] = pd.to_datetime(df['fecha_hora'])
    
    # Agrupar el total de ventas por día
    ventas_diarias = df.groupby(df['fecha_hora'].dt.date)['total'].sum().reset_index()
    ventas_diarias.columns = ['fecha', 'total_ventas']
    ventas_diarias['fecha'] = pd.to_datetime(ventas_diarias['fecha'])
    
    # Crear variables (Features) que el modelo usará para aprender
    ventas_diarias['dia_semana'] = ventas_diarias['fecha'].dt.dayofweek
    ventas_diarias['es_fin_de_semana'] = ventas_diarias['dia_semana'].apply(lambda x: 1 if x >= 4 else 0) # Viernes(4), Sábado(5), Domingo(6)
    ventas_diarias['dia_mes'] = ventas_diarias['fecha'].dt.day
    
    # 3. Separar X (features) e y (target/meta)
    X = ventas_diarias[['dia_semana', 'es_fin_de_semana', 'dia_mes']]
    y = ventas_diarias['total_ventas']
    
    # Para el MVP, como tenemos pocos datos históricos (ej. 30 días), usamos casi todo para entrenar
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.1, random_state=42)
        
    # 4. Entrenar el modelo
    print("⚙️ Entrenando algoritmo RandomForestRegressor...")
    modelo = RandomForestRegressor(n_estimators=100, random_state=42)
    modelo.fit(X_train, y_train)
    
    # 5. Evaluar (Métrica de calidad)
    predicciones = modelo.predict(X_test)
    mae = mean_absolute_error(y_test, predicciones)
    print(f"✅ Entrenamiento completado.")
    print(f"📉 Margen de error estimado (MAE): ${mae:,.0f} CLP")
    
    # 6. Exportar el modelo
    os.makedirs('data', exist_ok=True)
    ruta_modelo = 'data/modelo.pkl'
    joblib.dump(modelo, ruta_modelo)
    print(f"💾 Modelo empaquetado exitosamente en: {ruta_modelo}")

if __name__ == "__main__":
    entrenar_y_guardar_modelo()