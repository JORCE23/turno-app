import { KpiCard } from '../components/ui/KpiCard';
import { DollarSign, TrendingUp, Users } from 'lucide-react';

export const Dashboard = () => {
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-text mb-2">Dashboard General</h1>
        <p className="text-muted">Resumen operativo y recomendaciones estratégicas.</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <KpiCard 
          title="Ventas del Día" 
          value="$1.240.500" 
          trend={12.5} 
          subtitle="Vs. mismo día semana pasada"
          icon={<DollarSign size={24} />}
        />
        <KpiCard 
          title="Ticket Promedio" 
          value="$18.500" 
          trend={-2.1} 
          subtitle="Basado en 67 transacciones"
          icon={<TrendingUp size={24} />}
        />
        <KpiCard 
          title="Staff Ideal" 
          value="4 garzones" 
          subtitle="Para el turno pm de hoy"
          icon={<Users size={24} />}
        />
      </div>

      <div className="bg-surface border border-border rounded-xl p-6">
        <h2 className="text-xl font-heading font-bold mb-4">Recomendaciones Automáticas</h2>
        <div className="space-y-4">
          <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
            <h4 className="text-warning font-medium mb-1">Alerta de Stock (Cerveza IPA)</h4>
            <p className="text-text/80 text-sm">Tu inventario actual solo cubre la demanda proyectada de hoy. Sugerimos hacer pedido urgente para el fin de semana.</p>
          </div>
          <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
            <h4 className="text-success font-medium mb-1">Oportunidad de Venta (19:00 - 21:00)</h4>
            <p className="text-text/80 text-sm">Hay una alta probabilidad de mesas llenas esta noche. Considera activar una promoción de "Happy Hour" solo para destilados para aumentar el ticket promedio.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
