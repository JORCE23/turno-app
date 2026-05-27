import pandas as pd
import json
import os
from datetime import datetime

def procesar_datos():
    print("Procesando ventas_raw.csv y generando dashboard_data.json...")
    
    if not os.path.exists('data/ventas_raw.csv'):
        print("Error: No existe data/ventas_raw.csv. Ejecuta turno_generar_csv.py primero.")
        return
        
    df = pd.read_csv('data/ventas_raw.csv')
    
    # KPIs Básicos
    ventas_totales = int(df['total'].sum())
    fecha_max = df['fecha'].max()
    ventas_hoy = int(df[df['fecha'] == fecha_max]['total'].sum())
    tickets_unicos = df['ticket_id'].nunique()
    ticket_promedio = int(ventas_totales / tickets_unicos) if tickets_unicos > 0 else 0
    
    # Productos más vendidos
    top_productos = df.groupby('producto')['cantidad'].sum().sort_values(ascending=False).head(5).to_dict()
    
    # Ventas por día (últimos 7 días)
    ventas_por_dia = df.groupby('fecha')['total'].sum().tail(7).to_dict()
    
    # Preparar el JSON de salida (simulando lo que el backend de Fase 2 haría en tiempo real)
    dashboard_data = {
        "ultima_actualizacion": datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        "kpis": {
            "ventas_totales_30d": ventas_totales,
            "ventas_hoy": ventas_hoy,
            "ticket_promedio": ticket_promedio,
            "total_tickets": tickets_unicos
        },
        "top_productos": top_productos,
        "ventas_recientes": ventas_por_dia,
        "recomendaciones": [
            {
                "tipo": "stock",
                "mensaje": "El consumo de Cerveza IPA superó el promedio. Sugerencia: Reponer stock antes del viernes."
            },
            {
                "tipo": "staffing",
                "mensaje": "Detectamos un peak consistente a las 20:00 hrs. Sugerencia: Añadir 1 garzón extra en ese horario."
            }
        ]
    }
    
    with open('data/dashboard_data.json', 'w', encoding='utf-8') as f:
        json.dump(dashboard_data, f, ensure_ascii=False, indent=4)
        
    print("Archivo data/dashboard_data.json generado exitosamente.")

if __name__ == "__main__":
    procesar_datos()
