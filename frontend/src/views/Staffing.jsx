import { KpiCard } from '../components/ui/KpiCard';
import { Users, UserPlus, UserMinus, Clock } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const Staffing = () => {
  const horas = ['12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '00:00'];
  
  const staffingData = {
    labels: horas,
    datasets: [
      {
        label: 'Staff Requerido (IA)',
        data: [3, 4, 2, 4, 6, 6, 3],
        backgroundColor: '#f97316', // --accent
        borderRadius: 4,
      },
      {
        label: 'Staff Programado',
        data: [3, 3, 3, 5, 5, 5, 2],
        backgroundColor: '#5A6878', // --muted
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#E8EDF2' // --text
        }
      },
    },
    scales: {
      y: {
        grid: {
          color: '#1C2530', // --border
        },
        ticks: {
          color: '#5A6878', // --muted
          stepSize: 1,
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

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-text mb-2">Staffing Inteligente</h1>
        <p className="text-muted">Optimiza tu personal por turno basado en la demanda proyectada y evita sobrecostos o mala atención.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <KpiCard 
          title="Staff Sugerido Hoy" 
          value="6 personas" 
          subtitle="Para el turno PM"
          icon={<Users size={24} />}
        />
        <KpiCard 
          title="Déficit Proyectado" 
          value="-1 garzón" 
          subtitle="A las 20:00 (Hora punta)"
          icon={<UserMinus size={24} color="#FF4560" />} 
        />
        <KpiCard 
          title="Sobrestaffing" 
          value="+1 cocina" 
          subtitle="A las 16:00 (Hora valle)"
          icon={<UserPlus size={24} color="#F5A623" />} 
        />
        <KpiCard 
          title="Costo Optimizable" 
          value="$45.000" 
          subtitle="Ahorro potencial hoy"
          icon={<Clock size={24} color="#00C97A" />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface border border-border rounded-xl p-6">
          <h2 className="text-xl font-heading font-bold mb-4">Brechas de Personal (Hoy)</h2>
          <div className="h-[350px]">
            <Bar options={chartOptions} data={staffingData} />
          </div>
        </div>
        
        <div className="bg-surface border border-border rounded-xl p-6">
          <h2 className="text-xl font-heading font-bold mb-4">Acciones Recomendadas</h2>
          <div className="space-y-4">
            <div className="p-4 bg-danger/10 border border-danger/20 rounded-lg">
              <h4 className="text-danger font-medium mb-1">Déficit Crítico (20:00 - 22:00)</h4>
              <p className="text-text/80 text-sm mb-3">Falta 1 garzón para cubrir la demanda proyectada sin afectar la calidad del servicio.</p>
              <button className="w-full py-2 bg-danger/20 text-danger rounded-lg hover:bg-danger/30 transition-colors text-sm font-medium">
                Notificar al equipo extra
              </button>
            </div>
            
            <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
              <h4 className="text-warning font-medium mb-1">Sobrestaffing (16:00 - 18:00)</h4>
              <p className="text-text/80 text-sm mb-3">Tienes 1 persona de más en cocina. Sugerimos adelantar labores de prep o dar salida anticipada.</p>
              <button className="w-full py-2 bg-warning/20 text-warning rounded-lg hover:bg-warning/30 transition-colors text-sm font-medium">
                Reasignar tareas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
