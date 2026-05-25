import { KpiCard } from '../components/ui/KpiCard';
import { Package, AlertTriangle, ArrowRightLeft, TrendingDown } from 'lucide-react';

export const Stock = () => {
  const stockItems = [
    { id: 1, name: 'Cerveza IPA (Barril)', current: 1, min: 2, unit: 'unidades', status: 'critical', trend: 'Alta demanda hoy' },
    { id: 2, name: 'Carne de Vacuno (Lomo)', current: 15, min: 20, unit: 'kg', status: 'warning', trend: 'Consumo estable' },
    { id: 3, name: 'Papas Fritas Congeladas', current: 40, min: 30, unit: 'bolsas', status: 'ok', trend: 'Consumo bajo' },
    { id: 4, name: 'Limones', current: 2, min: 5, unit: 'mallas', status: 'critical', trend: 'Pisco sour en promoción' },
    { id: 5, name: 'Pan de Hamburguesa', current: 120, min: 100, unit: 'unidades', status: 'ok', trend: 'Consumo estable' },
  ];

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-text mb-2">Inventario y Stock</h1>
        <p className="text-muted">Control de insumos y alertas tempranas de quiebre de stock.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <KpiCard 
          title="Ítems Críticos" 
          value="2" 
          subtitle="Requieren pedido urgente"
          icon={<AlertTriangle size={24} className="text-danger" />}
        />
        <KpiCard 
          title="Valor Inventario" 
          value="$4.2M" 
          trend={-3.4} 
          icon={<Package size={24} />}
        />
        <KpiCard 
          title="Rotación" 
          value="Alta" 
          subtitle="Ciclo de 4 días"
          icon={<ArrowRightLeft size={24} />}
        />
        <KpiCard 
          title="Merma Est." 
          value="2.5%" 
          trend={0.5} 
          icon={<TrendingDown size={24} />}
        />
      </div>

      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-heading font-bold">Estado de Insumos Clave</h2>
          <button className="bg-accent hover:bg-accent2 text-bg font-bold py-2 px-4 rounded-lg transition-colors">
            Generar Orden de Compra
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-muted">
                <th className="py-4 px-4 font-medium">Insumo</th>
                <th className="py-4 px-4 font-medium">Stock Actual</th>
                <th className="py-4 px-4 font-medium">Stock Mínimo</th>
                <th className="py-4 px-4 font-medium">Estado</th>
                <th className="py-4 px-4 font-medium">Contexto IA</th>
                <th className="py-4 px-4 font-medium text-right">Acción</th>
              </tr>
            </thead>
            <tbody>
              {stockItems.map((item) => (
                <tr key={item.id} className="border-b border-border/50 hover:bg-card/50 transition-colors">
                  <td className="py-4 px-4 font-medium">{item.name}</td>
                  <td className="py-4 px-4">
                    <span className={`font-mono text-lg ${
                      item.status === 'critical' ? 'text-danger' : 
                      item.status === 'warning' ? 'text-warning' : 'text-text'
                    }`}>
                      {item.current}
                    </span> {item.unit}
                  </td>
                  <td className="py-4 px-4 text-muted">{item.min} {item.unit}</td>
                  <td className="py-4 px-4">
                    {item.status === 'critical' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-danger/10 text-danger border border-danger/20">
                        Crítico
                      </span>
                    )}
                    {item.status === 'warning' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning/10 text-warning border border-warning/20">
                        Por agotar
                      </span>
                    )}
                    {item.status === 'ok' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success border border-success/20">
                        Óptimo
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-sm text-text/80">{item.trend}</td>
                  <td className="py-4 px-4 text-right">
                    <button className="text-accent hover:text-accent2 text-sm font-medium transition-colors">
                      Pedir ahora
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
