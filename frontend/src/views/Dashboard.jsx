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
    const recomendacionesIA = data.recomendaciones_ia 
      ? data.recomendaciones_ia.map(r => `• ${r.mensaje}`).join('\n')
      : data.recomendaciones.map(r => `• ${r.mensaje}`).join('\n');
    const mensaje = `☀️ *¡Hola! Tu resumen estratégico de Turno* 🚀\n\n📊 *Cierre y Acumulado (30d):*\n💰 Ventas totales: ${formatCurrency(data.kpis.ventas_totales_30d)}\n💳 Ticket promedio: ${formatCurrency(data.kpis.ticket_promedio)}\n🏆 Tu estrella: ${topProductoNombre} (${topProductoCantidad} uds)\n\n🧠 *Recomendaciones para HOY:*\n${recomendacionesIA}\n\n🔗 *Más detalles aquí:*\nhttps://[TU-DOMINIO].vercel.app\n\n*Que sea un excelente turno.* 📈🔥`;
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
          <h1 className="text-3xl font-heading font-bold text-text mb-1">Dashboard</h1>
          <p className="text-sm text-muted">Concepción, Chile · Barrio Brasil</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-3 bg-card px-4 py-2 rounded-lg border border-border">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse shadow-[0_0_0_3px_rgba(0,201,122,0.2)]"></div>
            <span className="text-xs font-mono text-muted">
              {data.ultima_actualizacion}
            </span>
          </div>
          <button 
            onClick={handleCopiarWhatsApp}
            className="flex items-center gap-2 bg-success/10 border border-success/20 text-success px-4 py-2 rounded-lg hover:bg-success/20 transition-colors text-xs font-medium"
          >
            <span>📲</span> WhatsApp Hoy
          </button>
        </div>
      </header>

      {showAlert && (
        <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 flex flex-col md:flex-row md:items-center gap-4 mb-8 animate-fade-in">
          <div className="text-xl">⚡</div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-accent">Radar: Competencia activa en tu zona</div>
            <div className="text-xs text-muted mt-1">El Boliche (Plaza Perú) lanzó happy hour 2x1 en cócteles · Hace 47 min</div>
          </div>
          <button 
            onClick={() => alert('Sugerencia: Activar promo 3x2 en cervezas por las próximas 2 horas para retener público.')}
            className="text-[10px] font-mono uppercase tracking-wider text-accent bg-accent/10 border border-accent/30 rounded-md px-4 py-2 hover:bg-accent/20 transition-colors whitespace-nowrap mt-2 md:mt-0"
          >
            Ver contraataque →
          </button>
          <button onClick={() => setShowAlert(false)} className="text-accent opacity-60 hover:opacity-100 transition-opacity hidden md:block">
            ✕
          </button>
        </div>
      )}

      {/* WEATHER STRIP */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-fade-in">
        <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 hover:border-white/10 transition-colors">
          <div className="text-3xl">{data.clima?.lluvia ? '🌧️' : '☀️'}</div>
          <div className="flex-1">
            <div className="text-xl font-bold font-heading">{data.clima?.temperatura ? Math.round(data.clima.temperatura) : '--'}°C</div>
            <div className="text-[11px] text-muted mt-0.5 capitalize">{data.clima?.condicion || 'Cargando clima vivo...'}</div>
          </div>
          <div className="text-right">
            <div className="text-[9px] font-mono text-muted uppercase tracking-widest">Impacto</div>
            <div className={`text-sm font-bold ${data.clima?.lluvia ? 'text-danger' : 'text-success'}`}>
              {data.clima?.lluvia ? '−15%' : '+12%'}
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 hover:border-white/10 transition-colors md:col-span-2">
          <div className="text-3xl">🧠</div>
          <div className="flex-1">
            <div className="text-sm font-bold font-heading text-accent">Motor Prescriptivo IA</div>
            <div className="text-xs text-muted mt-1 leading-relaxed">
              {data.recomendaciones_ia ? data.recomendaciones_ia[0]?.mensaje : 'Analizando variables...'} <br/>
              {data.recomendaciones_ia && data.recomendaciones_ia[1] ? data.recomendaciones_ia[1].mensaje : ''}
            </div>
          </div>
        </div>
      </div>
      
      {/* KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <KpiCard 
          title="Ventas Hoy" 
          value={formatCurrency(data.kpis.ventas_totales_30d)} 
          trend={12.5}
          subtitle="Vs. ayer"
          icon={<DollarSign size={24} />}
        />
        <KpiCard 
          title="Ticket Promedio" 
          value={formatCurrency(data.kpis.ticket_promedio)} 
          trend={5.2}
          subtitle="Vs. semana pasada"
          icon={<TrendingUp size={24} />}
        />
        <KpiCard 
          title="Ocupación 20:00" 
          value="87%" 
          subtitle="Pico esperado"
          icon={<Users size={24} />}
        />
        <KpiCard 
          title="Merma evitada" 
          value="$43.000" 
          trend={2.4}
          subtitle="Esta semana"
          icon={<DollarSign size={24} />}
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

      {/* BOTTOM GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* STAFFING */}
        <div className="bg-surface border border-border rounded-xl p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-[15px] font-heading font-bold text-text">Staffing Hoy</h2>
              <p className="text-[11px] text-muted mt-1">Predicción de carga</p>
            </div>
            <span className="text-[9px] uppercase tracking-wider text-warning bg-warning/10 border border-warning/20 px-2 py-1 rounded">Ajuste sugerido</span>
          </div>
          <table className="w-full text-left border-collapse mt-2">
            <thead>
              <tr className="border-b border-border/50 text-[9px] font-mono uppercase tracking-wider text-muted">
                <th className="pb-3 font-normal">Rol</th>
                <th className="pb-3 font-normal">Turno</th>
                <th className="pb-3 font-normal w-1/3">Carga</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              <tr className="border-b border-border/30">
                <td className="py-3 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-danger"></span>Garzones</td>
                <td className="py-3 text-muted font-mono text-[10px]">18–00</td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden"><div className="h-full bg-danger w-[92%]"></div></div>
                    <span className="text-[10px] font-mono text-danger">92%</span>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-border/30">
                <td className="py-3 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-warning"></span>Bartenders</td>
                <td className="py-3 text-muted font-mono text-[10px]">19–01</td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden"><div className="h-full bg-warning w-[75%]"></div></div>
                    <span className="text-[10px] font-mono text-warning">75%</span>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-border/30">
                <td className="py-3 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-success"></span>Cocina</td>
                <td className="py-3 text-muted font-mono text-[10px]">17–23</td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden"><div className="h-full bg-success w-[60%]"></div></div>
                    <span className="text-[10px] font-mono text-success">60%</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="py-3 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-muted"></span>Caja</td>
                <td className="py-3 text-muted font-mono text-[10px]">18–00</td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden"><div className="h-full bg-accent3 w-[45%]"></div></div>
                    <span className="text-[10px] font-mono text-accent3">45%</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="mt-auto pt-4">
            <div className="flex justify-between items-center bg-danger/10 border border-danger/20 rounded-lg p-3">
              <span className="text-[11px] text-danger flex-1 pr-4 leading-tight">⚠ Turno recomienda llamar 1 garzón extra para 20:00–22:00</span>
              <button className="text-[10px] font-medium text-text bg-surface border border-danger/50 px-3 py-1.5 rounded hover:bg-danger/20 transition-colors whitespace-nowrap" onClick={(e) => { e.target.innerText = '✓ Listo'; e.target.classList.add('text-success', 'border-success/50', 'bg-success/10'); e.target.classList.remove('text-text', 'border-danger/50', 'bg-surface'); }}>Notificar</button>
            </div>
          </div>
        </div>

        {/* STOCK & MERMA */}
        <div className="bg-surface border border-border rounded-xl p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-[15px] font-heading font-bold text-text">Stock & Merma</h2>
              <p className="text-[11px] text-muted mt-1">Oportunidades detectadas</p>
            </div>
            <span className="text-[9px] uppercase tracking-wider text-success bg-success/10 border border-success/20 px-2 py-1 rounded">3 acciones</span>
          </div>
          <div className="flex flex-col gap-3">
            <div className="bg-card border border-border rounded-lg p-3 flex items-center gap-3">
              <div className="text-xl">🍋</div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-text truncate">Limones (2.3 kg)</div>
                <div className="text-[10px] text-muted mt-0.5 truncate">Vence en 2 días · Promo Pisco Sour</div>
              </div>
              <button className="text-[10px] font-medium text-text bg-surface border border-accent/50 px-2.5 py-1.5 rounded hover:bg-accent/20 transition-colors" onClick={(e) => { e.target.innerText = '✓ Listo'; e.target.classList.add('text-success', 'border-success/50', 'bg-success/10'); e.target.classList.remove('text-text', 'border-accent/50', 'bg-surface'); }}>Aplicar</button>
            </div>
            <div className="bg-card border border-border rounded-lg p-3 flex items-center gap-3">
              <div className="text-xl">🥑</div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-text truncate">Palta (4 kg)</div>
                <div className="text-[10px] text-muted mt-0.5 truncate">Vence en 4 días · Sugerir: tostadas</div>
              </div>
              <button className="text-[10px] font-medium text-text bg-surface border border-accent/50 px-2.5 py-1.5 rounded hover:bg-accent/20 transition-colors" onClick={(e) => { e.target.innerText = '✓ Listo'; e.target.classList.add('text-success', 'border-success/50', 'bg-success/10'); e.target.classList.remove('text-text', 'border-accent/50', 'bg-surface'); }}>Sugerir</button>
            </div>
            <div className="bg-card border border-border rounded-lg p-3 flex items-center gap-3">
              <div className="text-xl">🍺</div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-text truncate">Cerveza artesanal</div>
                <div className="text-[10px] text-muted mt-0.5 truncate">Pedir: 3 cajas</div>
              </div>
              <button className="text-[10px] font-medium text-text bg-surface border border-accent/50 px-2.5 py-1.5 rounded hover:bg-accent/20 transition-colors" onClick={(e) => { e.target.innerText = '✓ Listo'; e.target.classList.add('text-success', 'border-success/50', 'bg-success/10'); e.target.classList.remove('text-text', 'border-accent/50', 'bg-surface'); }}>Pedir</button>
            </div>
            <div className="bg-card border border-border rounded-lg p-3 flex items-center gap-3">
              <div className="text-xl">🥩</div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-text truncate">Lomo (1.8 kg)</div>
                <div className="text-[10px] text-muted mt-0.5 truncate">Stock óptimo · Margen alto</div>
              </div>
              <span className="text-[10px] text-success font-mono font-bold bg-success/10 px-2 py-1 rounded">OK</span>
            </div>
          </div>
        </div>

        {/* RADAR COMPETENCIA */}
        <div className="bg-surface border border-border rounded-xl p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-[15px] font-heading font-bold text-text">Radar Competencia</h2>
              <p className="text-[11px] text-muted mt-1">Zona Barrio Brasil · Hoy</p>
            </div>
            <span className="text-[9px] uppercase tracking-wider text-warning bg-warning/10 border border-warning/20 px-2 py-1 rounded">2 alertas</span>
          </div>
          <div className="flex flex-col gap-3">
            <div className="bg-card border border-border rounded-lg p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium text-text">🍻 El Boliche</span>
                <span className="text-[9px] font-mono text-muted">hace 47 min</span>
              </div>
              <p className="text-[11px] text-muted leading-tight mb-2">Happy hour 2x1 cócteles · Instagram post con 340 likes</p>
              <button className="text-[10px] text-accent bg-accent/10 hover:bg-accent/20 transition-colors px-2 py-1 rounded w-full text-left truncate">→ Sugerencia: Promo flash "3x2 cervezas"</button>
            </div>
            <div className="bg-card border border-border rounded-lg p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium text-text">🌮 La Cantina</span>
                <span className="text-[9px] font-mono text-muted">hace 2 hrs</span>
              </div>
              <p className="text-[11px] text-muted leading-tight mb-2">Lanzó menú especial fútbol · Transmisión Copa en pantalla</p>
              <button className="text-[10px] text-accent bg-accent/10 hover:bg-accent/20 transition-colors px-2 py-1 rounded w-full text-left truncate" onClick={(e) => { e.target.innerText = '✓ Listo'; e.target.classList.add('text-success', 'bg-success/10'); e.target.classList.remove('text-accent', 'bg-accent/10'); }}>→ Sugerencia: Activar pantallas + promo picoteo</button>
            </div>
            <div className="bg-success/5 border border-success/10 rounded-lg p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium text-muted">🔍 Monitoreo activo</span>
                <span className="text-[9px] font-mono text-muted">3 locales</span>
              </div>
              <p className="text-[10px] text-muted/70 leading-tight">Sin actividad reciente detectada en competidores restantes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
