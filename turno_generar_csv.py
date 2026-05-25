import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta
import os

def generar_datos_prueba():
    print("Generando datos de prueba (ventas_raw.csv)...")
    os.makedirs('data', exist_ok=True)
    
    # Parámetros
    dias = 30
    fecha_fin = datetime.now()
    fecha_inicio = fecha_fin - timedelta(days=dias)
    
    # Productos
    productos = [
        {"nombre": "Cerveza IPA", "categoria": "Bebidas", "precio": 4500},
        {"nombre": "Pisco Sour", "categoria": "Bebidas", "precio": 5500},
        {"nombre": "Hamburguesa Clásica", "categoria": "Comida", "precio": 8900},
        {"nombre": "Papas Bravas", "categoria": "Comida", "precio": 6500},
        {"nombre": "Tabla Para Compartir", "categoria": "Comida", "precio": 14900},
        {"nombre": "Bebida Lata", "categoria": "Bebidas", "precio": 2000}
    ]
    
    # Medios de pago
    medios_pago = ["Debito", "Credito", "Efectivo", "Transferencia"]
    prob_pago = [0.55, 0.30, 0.10, 0.05]
    
    registros = []
    
    for i in range(dias):
        fecha_actual = fecha_inicio + timedelta(days=i)
        es_fin_semana = fecha_actual.weekday() >= 4 # Viernes, Sábado, Domingo
        
        # Más transacciones los fines de semana
        num_transacciones = random.randint(80, 150) if es_fin_semana else random.randint(30, 70)
        
        for _ in range(num_transacciones):
            hora = random.randint(12, 23)
            minuto = random.randint(0, 59)
            fecha_hora = fecha_actual.replace(hour=hora, minute=minuto)
            
            # 1 a 4 productos por ticket
            num_productos = random.randint(1, 4)
            ticket_id = f"T-{fecha_hora.strftime('%Y%m%d')}-{random.randint(1000, 9999)}"
            
            for _ in range(num_productos):
                prod = random.choice(productos)
                cantidad = random.randint(1, 3)
                medio = np.random.choice(medios_pago, p=prob_pago)
                
                registros.append({
                    "ticket_id": ticket_id,
                    "fecha_hora": fecha_hora.strftime('%Y-%m-%d %H:%M:%S'),
                    "fecha": fecha_actual.strftime('%Y-%m-%d'),
                    "hora": hora,
                    "producto": prod["nombre"],
                    "categoria": prod["categoria"],
                    "cantidad": cantidad,
                    "precio_unitario": prod["precio"],
                    "total": prod["precio"] * cantidad,
                    "medio_pago": medio
                })
                
    df = pd.DataFrame(registros)
    df.to_csv('data/ventas_raw.csv', index=False)
    print(f"Archivo generado en data/ventas_raw.csv con {len(df)} registros.")

if __name__ == "__main__":
    generar_datos_prueba()
