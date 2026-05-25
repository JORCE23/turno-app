import { KpiCard } from '../components/ui/KpiCard';
import { DollarSign, TrendingUp, Calendar, CreditCard } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const Ventas = () => {
  // Mock data for 30 days
  const labels = Array.from({ length: 30 }, (_, i) => `Día ${i + 1}`);
  
  const ventasData = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Ventas (CLP)',
        data: labels.map(() => Math.floor(Math.random() * (1500000 - 800000 + 1) + 800000)),
        borderColor: '#f97316', // --accent
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const mediosPagoData = {
    labels: ['Débito', 'Crédito', 'Efectivo', 'Transferencia'],
    datasets: [
      {
        label: 'Proporción',
        data: [55, 30, 10, 5],
        backgroundColor: [
          '#f97316', // --accent
          '#f59e0b', // --accent2
          '#ea580c', // --accent3
          '#5A6878', // --muted
        ],
        borderWidth: 0,
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
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#5A6878', // --muted
          maxTicksLimit: 10,
        }
      }
    }
  };

  const barOptions = {
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
        <h1 className="text-3xl font-heading font-bold text-text mb-2">Ventas</h1>
        <p className="text-muted">Análisis detallado de tus ingresos de los últimos 30 días.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <KpiCard 
          title="Ingresos Totales (30d)" 
          value="$34.5M" 
          trend={5.2} 
          icon={<DollarSign size={24} />}
        />
        <KpiCard 
          title="Ticket Promedio" 
          value="$17.200" 
          trend={-1.5} 
          icon={<TrendingUp size={24} />}
        />
        <KpiCard 
          title="Día más fuerte" 
          value="Sábado" 
          subtitle="42% de ventas semanales"
          icon={<Calendar size={24} />}
        />
        <KpiCard 
          title="Medio Principal" 
          value="Tarj. Débito" 
          subtitle="55% de transacciones"
          icon={<CreditCard size={24} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface border border-border rounded-xl p-6">
          <h2 className="text-xl font-heading font-bold mb-4">Evolución de Ingresos</h2>
          <div className="h-[300px]">
            <Line options={chartOptions} data={ventasData} />
          </div>
        </div>
        
        <div className="bg-surface border border-border rounded-xl p-6">
          <h2 className="text-xl font-heading font-bold mb-4">Medios de Pago</h2>
          <div className="h-[300px]">
            <Bar options={barOptions} data={mediosPagoData} />
          </div>
        </div>
      </div>
    </div>
  );
};
