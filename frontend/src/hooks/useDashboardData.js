import { useState, useEffect } from 'react';

export const useDashboardData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    // Configuramos un tiempo máximo de espera de 10 segundos
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const fetchData = async () => {
      try {
        setLoading(true);
        // Intentar conectar con el backend. Usa VITE_API_URL en producción o localhost en desarrollo.
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        
        // Limpiamos la URL por si tiene un slash (/) final accidental en Vercel
        const cleanUrl = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
        const response = await fetch(`${cleanUrl}/api/dashboard`, { signal: controller.signal });
        
        clearTimeout(timeoutId); // Si responde rápido, cancelamos el cronómetro

        if (!response.ok) {
          throw new Error('Error al cargar los datos del servidor');
        }
        
        const jsonData = await response.json();
        
        if (jsonData.error) {
           throw new Error(jsonData.error);
        }
        
        setData(jsonData);
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
        
        // Fallback: datos mockeados si el backend no está corriendo (Mago de Oz offline)
        setData({
          ultima_actualizacion: new Date().toLocaleString(),
          kpis: {
            ventas_totales_30d: 34500000,
            ticket_promedio: 17200,
            total_tickets: 2005
          },
          top_productos: {
            "Producto de Prueba (Offline)": 150
          },
          recomendaciones: [
            {
              tipo: "info",
              mensaje: "Mostrando datos de prueba porque el backend FastAPI no está respondiendo."
            }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
