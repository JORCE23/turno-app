import { KpiCard } from '../components/ui/KpiCard';
import { DollarSign, Percent, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const Pricing = () => {
  const horas = ['12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
  
  const elasticidadData = {
    labels: horas,
    datasets: [
      {
        label: 'Sensibilidad al Precio',
        data: [8, 9, 10, 5, 2, 4], // Lower is less sensitive (better for higher margins)
        borderColor: '#00C97A', // --success
        backgroundColor: 'rgba(0, 201, 122, 0.1)',
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
        },
        beginAtZero: true,
        max: 10,
        title: {
          display: true,
          text: 'Sensibilidad (1-10)',
          color: '#5A6878'
        }
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

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-text mb-2">Pricing Dinámico</h1>
        <p className="text-muted">Ajustes estratégicos de precios basados en la demanda, horario y el comportamiento del consumidor.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <KpiCard 
          title="Margen Promedio" 
          value="68%" 
          trend={2.1} 
          icon={<Percent size={24} />}
        />
        <KpiCard 
          title="Oportunidad de Margen" 
          value="+$125K" 
          subtitle="Potencial diario si aplicas recomendaciones"
          icon={<DollarSign size={24} />}
        />
        <KpiCard 
          title="Plato más elástico" 
          value="Papas Bravas" 
          subtitle="Sensible a descuentos"
          icon={<ArrowDownRight size={24} color="#F5A623" />} 
        />
        <KpiCard 
          title="Plato Inelástico" 
          value="Cerveza Artesanal" 
          subtitle="Soporta aumento de precio"
          icon={<ArrowUpRight size={24} color="#00C97A" />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface border border-border rounded-xl p-6">
          <h2 className="text-xl font-heading font-bold mb-4">Sensibilidad al Precio por Hora (Hoy)</h2>
          <p className="text-sm text-muted mb-4">Muestra qué tan dispuestos están los clientes a pagar precios completos según el horario. Menor sensibilidad = Mayor oportunidad de margen.</p>
          <div className="h-[300px]">
            <Line options={chartOptions} data={elasticidadData} />
          </div>
        </div>
        
        <div className="bg-surface border border-border rounded-xl p-6 flex flex-col">
          <h2 className="text-xl font-heading font-bold mb-4">Recomendaciones Activas</h2>
          <div className="space-y-4 flex-1">
            <div className="p-4 bg-card border border-border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-text">Hora Feliz (16:00 - 19:00)</h4>
                <span className="bg-accent/20 text-accent text-xs px-2 py-1 rounded">Sugerido</span>
              </div>
              <p className="text-sm text-muted mb-3">La sensibilidad al precio es máxima. Ofrece 2x1 en coctelería clásica para atraer volumen de personas que salen del trabajo.</p>
              <button className="text-sm font-medium text-accent hover:text-accent2 transition-colors">Activar promoción en POS →</button>
            </div>
            
            <div className="p-4 bg-card border border-border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-text">Premium Price (20:00 - 23:00)</h4>
                <span className="bg-success/20 text-success text-xs px-2 py-1 rounded">Oportunidad</span>
              </div>
              <p className="text-sm text-muted mb-3">Baja sensibilidad y alta demanda. Retira los combos de descuento del menú digital y destaca platos de alto margen (Cortes premium).</p>
              <button className="text-sm font-medium text-success hover:text-green-400 transition-colors">Ocultar combos en menú →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
