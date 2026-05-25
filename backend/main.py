from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
import os

app = FastAPI(title="Turno MVP API")

# Configurar CORS para permitir que el frontend local se conecte
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Permitir todos en MVP
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Turno MVP API funcionando", "status": "ok"}

@app.get("/api/dashboard")
def get_dashboard_data():
    data_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'dashboard_data.json')
    
    if not os.path.exists(data_path):
        return {"error": "Datos no generados aún. Ejecuta python turno_procesar.py"}
        
    with open(data_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    return data
