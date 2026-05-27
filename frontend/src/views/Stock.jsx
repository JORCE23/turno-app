import { useState } from 'react';
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

  const [toast, setToast] = useState(null);

  const showToast = (msg, icon = '✅') => {
    setToast({ msg, icon });
    setTimeout(() => setToast(null), 3500);
  };

  const handleGenerarOrden = () => {
    const itemsToOrder = stockItems.filter(item => item.status !== 'ok');
    const fecha = new Date().toLocaleDateString('es-CL');
    const numeroOrden = Math.floor(Math.random() * 10000).toString().padStart(5, '0');

    const tableRows = itemsToOrder.map(item => {
      const sugerido = item.min * 2; // Lógica simple de reposición
      return `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">${item.name}</td>
          <td style="padding: 12px; border-bottom: 1px solid #ddd; color: #FF4560;">${item.current} ${item.unit}</td>
          <td style="padding: 12px; border-bottom: 1px solid #ddd; font-weight: bold; color: #f97316;">${sugerido} ${item.unit}</td>
        </tr>
      `;
    }).join('');

    const html = `
      <html>
        <head>
          <title>Orden_de_Compra_Turno_${numeroOrden}</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #333; max-width: 800px; margin: 0 auto; }
            .header { display: flex; justify-content: space-between; border-bottom: 2px solid #f97316; padding-bottom: 20px; margin-bottom: 30px; }
            .logo { font-size: 28px; font-weight: bold; color: #111820; }
            .logo span { color: #f97316; }
            .info { text-align: right; color: #5a6878; line-height: 1.5; }
            h1 { color: #111820; margin-bottom: 10px; font-size: 20px; }
            table { border-collapse: collapse; margin-top: 20px; width: 100%; text-align: left; }
            th { padding: 12px; background-color: #f8f9fa; color: #5a6878; border-bottom: 2px solid #ddd; }
            .footer { margin-top: 50px; font-size: 12px; color: #5a6878; text-align: center; border-top: 1px solid #ddd; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">Turno<span>.</span></div>
            <div class="info"><strong>Fecha:</strong> ${fecha}<br><strong>Orden #:</strong> ${numeroOrden}<br><strong>Local:</strong> Pizza Los Álamos</div>
          </div>
          <h1>Orden de Reposición Automática</h1>
          <p style="color: #5a6878; font-size: 14px;">La Inteligencia Artificial de Turno ha detectado niveles críticos de stock y sugiere la siguiente reposición para evitar quiebres.</p>
          <table><thead><tr><th>Insumo</th><th>Stock Actual</th><th>Cantidad a Pedir</th></tr></thead><tbody>${tableRows}</tbody></table>
          <div class="footer">Documento generado por el Motor Prescriptivo de Turno Business Intelligence.<br>app.turno.cl</div>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(html);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 250);
    
    showToast("PDF de Orden de Compra generado", "📄");
  };

  const handlePedirAhora = (name) => {
    showToast(`Solicitud preparada para: ${name}`, "📦");
  };

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
          <button 
            onClick={handleGenerarOrden}
            className="bg-accent hover:bg-accent2 text-bg font-bold py-2 px-4 rounded-lg transition-colors"
          >
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
                    <button 
                      onClick={() => handlePedirAhora(item.name)}
                      className="text-accent hover:text-accent2 text-sm font-medium transition-colors"
                    >
                      Pedir ahora
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
