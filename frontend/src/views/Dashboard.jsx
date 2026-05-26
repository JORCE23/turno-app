import { KpiCard } from '../components/ui/KpiCard';
import { DollarSign, TrendingUp, Users, Clock } from 'lucide-react';
import { useDashboardData } from '../hooks/useDashboardData';

export const Dashboard = () => {
  const { data, loading, error } = useDashboardData();

  if (loading) return <div className="p-8 text-text">Cargando datos del dashboard...</div>;
  if (!data) return <div className="p-8 text-danger">Error cargando datos: {error}</div>;

  // Función para formatear a pesos chilenos
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);
  };

  // Obtener el producto más vendido
  const topProductoNombre = data.top_productos ? Object.keys(data.top_productos)[0] : "N/A";
  const topProductoCantidad = data.top_productos ? Object.values(data.top_productos)[0] : 0;

  return (
    <div className="p-8">
      <header className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-text mb-2">Dashboard General</h1>
          <p className="text-muted">Resumen operativo y recomendaciones estratégicas.</p>
        </div>
        <div className="flex items-center gap-2 bg-surface px-4 py-2 rounded-lg border border-border">
          <Clock size={16} className="text-muted" />
          <span className="text-sm text-text">
            Última actualización: <strong className="text-accent">{data.ultima_actualizacion}</strong>
          </span>
        </div>
      </header>
      
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
