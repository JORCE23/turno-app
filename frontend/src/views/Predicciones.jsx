import { useState, useEffect } from 'react';
import { KpiCard } from '../components/ui/KpiCard';
import { TrendingUp, Calendar, AlertCircle } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const Predicciones = () => {
  const [datosSemana, setDatosSemana] = useState({
    dias: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    valores: [0, 0, 0, 0, 0, 0, 0]
  });
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = (msg, icon = 'ℹ️') => {
    setToast({ msg, icon });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    const fetchPredicciones = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        const cleanUrl = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
        const response = await fetch(`${cleanUrl}/api/prediccion_semana`);
        
        if (response.ok) {
          const data = await response.json();
          if (!data.error) {
            setDatosSemana({
              dias: data.dias,
              valores: data.predicciones
            });
          }
        }
      } catch (error) {
        console.error("Error al cargar predicciones:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPredicciones();
  }, []);
  
  const demandaData = {
    labels: datosSemana.dias,
    datasets: [
      {
        fill: true,
        label: 'Ventas Proyectadas (CLP)',
        data: datosSemana.valores,
        borderColor: '#f97316', // --accent
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const horasData = {
    labels: ['12:00', '13:00', '14:00', '15:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
    datasets: [
      {
        fill: true,
        label: 'Afluencia Esperada Hoy',
        data: [20, 80, 60, 30, 40, 70, 95, 85, 40],
        borderColor: '#f59e0b', // --accent2
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        grid: {
          color: '#1C2530', // --border
        },
        ticks: {
          color: '#5A6878', // --muted
          callback: function(value) {
            return '$' + value.toLocaleString('es-CL');
          }
        },
        beginAtZero: true,
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#5A6878', // --muted
        }
      }
    }
  };

  const handleVerTacticas = () => {
    showToast("Sugerencia: Activar promo 'Menú Lluvia' en UberEats con envío gratis.", "☔");
  };

  const handleRevisarStock = () => {
    showToast("Orden de +40% en barriles de Cerveza generada al proveedor.", "📦");
  };

  const handleRecalcular = () => {
    showToast("Recalculando modelos predictivos con IA...", "🔄");
  };

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-text mb-2">Predicciones</h1>
        <p className="text-muted">Proyecciones de demanda basadas en datos históricos y factores externos (clima, eventos).</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <KpiCard 
          title="Demanda Esperada Hoy" 
          value="Alta (85%)" 
          trend={15} 
          subtitle="Mejor clima que la semana pasada"
          icon={<TrendingUp size={24} />}
        />
        <KpiCard 
          title="Día Pico de la Semana" 
          value="Sábado" 
          subtitle="Proyección de llenado total a las 21:00"
          icon={<Calendar size={24} />}
        />
        <KpiCard 
          title="Factor Externo Crítico" 
          value="Lluvia el Jueves" 
          subtitle="Se espera baja de 20% en mesas de terraza"
          icon={<AlertCircle size={24} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-heading font-bold">Proyección Semanal</h2>
              <p className="text-sm text-muted">Demanda estimada para los próximos 7 días.</p>
            </div>
            <button onClick={handleRecalcular} className="bg-surface border border-accent/50 text-text text-xs px-3 py-1.5 rounded-md hover:bg-accent/10 transition-colors flex items-center gap-2 whitespace-nowrap">
              <span>🔄</span> Recalcular
            </button>
          </div>
          <div className="h-[300px]">
            <Line options={chartOptions} data={demandaData} />
          </div>
        </div>
        
        <div className="bg-surface border border-border rounded-xl p-6">
          <h2 className="text-xl font-heading font-bold mb-4">Afluencia por Hora (Hoy)</h2>
          <p className="text-sm text-muted mb-4">Comportamiento esperado del flujo de clientes a lo largo del día de hoy.</p>
          <div className="h-[300px]">
            <Line options={chartOptions} data={horasData} />
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-surface border border-border rounded-xl p-6">
        <h2 className="text-xl font-heading font-bold mb-4">Insights Predictivos</h2>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-border rounded-lg bg-card">
            <div>
              <h4 className="font-medium text-text">El clima afectará el fin de semana</h4>
              <p className="text-sm text-muted">Pronóstico de lluvia para el Jueves y Viernes. Prepara opciones de delivery fuertes.</p>
            </div>
            <button 
              onClick={handleVerTacticas}
              className="mt-4 md:mt-0 px-4 py-2 bg-surface border border-border rounded-lg text-text hover:bg-border transition-colors text-sm font-medium"
            >
              Ver Tácticas de Delivery
            </button>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-border rounded-lg bg-card">
            <div>
              <h4 className="font-medium text-text">Partido de la Selección (Sábado)</h4>
              <p className="text-sm text-muted">Aumento proyectado del 40% en consumo de cervezas. Asegura stock.</p>
            </div>
            <button 
              onClick={handleRevisarStock}
              className="mt-4 md:mt-0 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent2 transition-colors text-sm font-medium"
            >
              Revisar Stock
            </button>
          </div>
        </div>
      </div>

      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-card border border-border border-l-4 border-l-accent p-4 rounded-lg shadow-xl flex items-center gap-3 z-50 animate-fade-in">
          <span className="text-xl">{toast.icon}</span>
          <span className="text-sm font-medium text-text">{toast.msg}</span>
        </div>
      )}
    </div>
  );
};
