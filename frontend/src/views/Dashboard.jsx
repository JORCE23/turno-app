import { useState } from 'react';
import { KpiCard } from '../components/ui/KpiCard';
import { DollarSign, TrendingUp, Users, Clock } from 'lucide-react';
import { useDashboardData } from '../hooks/useDashboardData';
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler);

export const Dashboard = () => {
  const { data, loading, error } = useDashboardData();
  const [showAlert, setShowAlert] = useState(true);

  if (loading) return <div className="p-8 text-text">Cargando datos del dashboard...</div>;
  if (!data) return <div className="p-8 text-danger">Error cargando datos: {error}</div>;

  // Función para formatear a pesos chilenos
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);
  };

  // Obtener el producto más vendido
  const topProductoNombre = data.top_productos ? Object.keys(data.top_productos)[0] : "N/A";
  const topProductoCantidad = data.top_productos ? Object.values(data.top_productos)[0] : 0;

  const handleCopiarWhatsApp = () => {
    const mensaje = `☀️ *¡Hola! Tu resumen estratégico de Turno* 🚀\n\n📊 *Cierre y Acumulado (30d):*\n💰 Ventas totales: ${formatCurrency(data.kpis.ventas_totales_30d)}\n💳 Ticket promedio: ${formatCurrency(data.kpis.ticket_promedio)}\n🏆 Tu estrella: ${topProductoNombre} (${topProductoCantidad} uds)\n\n🧠 *Recomendaciones para HOY:*\n${data.recomendaciones.map(r => `• ${r.mensaje}`).join('\n')}\n\n🔗 *Más detalles aquí:*\nhttps://[TU-DOMINIO].vercel.app\n\n*Que sea un excelente turno.* 📈🔥`;
    navigator.clipboard.writeText(mensaje);
    alert('✅ ¡Resumen copiado!\n\nPuedes pegarlo directamente en el WhatsApp del dueño del local.');
  };

  // Datos simulados para las gráficas del MVP
  const salesData = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [
      {
        label: 'Real',
        data: [820, 950, 710, 1050, 1240, 1580, 1320],
        borderColor: '#5A6878',
        borderDash: [5, 4],
        pointRadius: 0,
        tension: 0.4,
      },
      {
        label: 'Predicción Turno',
        data: [800, 920, 740, 1080, 1200, 1550, 1300],
        borderColor: '#f97316',
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        fill: true,
        pointBackgroundColor: '#f97316',
        tension: 0.4,
      }
    ]
  };

  const horasLabels = ['12','13','14','15','16','17','18','19','20','21','22','23'];
  const hourlyData = {
    labels: horasLabels,
    datasets: [{
      label: 'Ventas (K)',
      data: [85, 120, 145, 110, 80, 95, 160, 210, 290, 340, 280, 190],
      backgroundColor: horasLabels.map((_, i) => i >= 8 && i <= 10 ? 'rgba(249, 115, 22, 0.8)' : 'rgba(249, 115, 22, 0.25)'),
      borderRadius: 4,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { x: { grid: { display: false } }, y: { grid: { color: '#1C2530' } } }
  };

  return (
    <div className="p-8">
      <header className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-text mb-2">Dashboard General</h1>
          <p className="text-muted">Resumen operativo y recomendaciones estratégicas.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-surface px-4 py-2 rounded-lg border border-border">
            <Clock size={16} className="text-muted" />
            <span className="text-sm text-text">
              Última actualización: <strong className="text-accent">{data.ultima_actualizacion}</strong>
            </span>
          </div>
          <button 
            onClick={handleCopiarWhatsApp}
            className="flex items-center gap-2 bg-success/10 border border-success/20 text-success px-4 py-2 rounded-lg hover:bg-success/20 transition-colors text-sm font-medium"
          >
            <span>📲</span> WhatsApp Hoy
          </button>
        </div>
      </header>

      {showAlert && (
        <div className="bg-accent/10 border border-accent/25 rounded-xl p-4 flex items-center gap-4 mb-8 animate-fade-in">
          <div className="text-xl">⚡</div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-accent">Radar: Competencia activa en tu zona</div>
            <div className="text-xs text-muted mt-0.5">El Boliche (Plaza Perú) lanzó happy hour 2x1 en cócteles · Hace 47 min</div>
          </div>
          <button 
            onClick={() => alert('Sugerencia: Activar promo 3x2 en cervezas por las próximas 2 horas para retener público.')}
            className="text-[10px] uppercase tracking-wider text-accent bg-accent/10 border border-accent/30 rounded-md px-3 py-1.5 hover:bg-accent/20 transition-colors whitespace-nowrap"
          >
            Ver contraataque →
          </button>
          <button onClick={() => setShowAlert(false)} className="text-accent opacity-60 hover:opacity-100 hover:scale-110 transition-all">
            ✕
          </button>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <KpiCard 
          title="Ventas Totales (30d)" 
          value={formatCurrency(data.kpis.ventas_totales_30d)} 
          trend={12.5}
          subtitle="Vs. mes anterior"
          icon={<DollarSign size={24} />}
        />
        <KpiCard 
          title="Ticket Promedio" 
          value={formatCurrency(data.kpis.ticket_promedio)} 
          trend={-2.1}
          subtitle={`Basado en ${data.kpis.total_tickets} transacciones`}
          icon={<TrendingUp size={24} />}
        />
        <KpiCard 
          title="Producto Estrella" 
          value={topProductoNombre} 
          subtitle={`${topProductoCantidad} unidades vendidas`}
          icon={<Users size={24} />}
        />
      </div>
      
      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-heading font-bold">Ventas vs Predicción</h2>
              <p className="text-sm text-muted">Últimos 7 días · CLP</p>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-accent bg-accent/10 border border-accent/20 px-2 py-1 rounded">IA Predictivo</span>
          </div>
          <div className="h-[240px]"><Line options={chartOptions} data={salesData} /></div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-heading font-bold">Ventas por Hora</h2>
              <p className="text-sm text-muted">Hoy · Pico nocturno</p>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-warning bg-warning/10 border border-warning/20 px-2 py-1 rounded">Live</span>
          </div>
          <div className="h-[240px]"><Bar options={chartOptions} data={hourlyData} /></div>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6">
        <h2 className="text-xl font-heading font-bold mb-4">Recomendaciones Automáticas</h2>
        <div className="space-y-4">
          {data.recomendaciones.map((rec, index) => (
            <div key={index} className={`p-4 border rounded-lg ${
              rec.tipo === 'stock' ? 'bg-warning/10 border-warning/20' : 
              rec.tipo === 'info' ? 'bg-accent/10 border-accent/20' :
              'bg-success/10 border-success/20'
            }`}>
              <h4 className={`font-medium mb-1 ${
                rec.tipo === 'stock' ? 'text-warning' : 
                rec.tipo === 'info' ? 'text-accent' :
                'text-success'
              }`}>
                {rec.tipo === 'stock' ? 'Alerta de Stock' : 
                 rec.tipo === 'info' ? 'Aviso del Sistema' : 'Sugerencia Operativa'}
              </h4>
              <p className="text-text/80 text-sm">{rec.mensaje}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
