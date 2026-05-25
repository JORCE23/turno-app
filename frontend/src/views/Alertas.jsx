import { Bell, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export const Alertas = () => {
  const alertas = [
    {
      id: 1,
      tipo: 'danger',
      titulo: 'Stock Crítico: Cerveza IPA',
      mensaje: 'Inventario proyectado para agotarse hoy a las 21:00. Pide al proveedor antes de las 14:00.',
      tiempo: 'Hace 2 horas',
      estado: 'Pendiente',
      icon: <AlertTriangle size={20} className="text-danger" />
    },
    {
      id: 2,
      tipo: 'warning',
      titulo: 'Déficit de Staff Proyectado',
      mensaje: 'Falta 1 garzón para el turno de esta noche (20:00 - 23:00) para mantener la calidad de servicio.',
      tiempo: 'Hace 3 horas',
      estado: 'Pendiente',
      icon: <Bell size={20} className="text-warning" />
    },
    {
      id: 3,
      tipo: 'success',
      titulo: 'Oportunidad de Venta',
      mensaje: 'Alta probabilidad de mesas llenas esta noche. Considera activar Happy Hour a las 18:00.',
      tiempo: 'Hace 5 horas',
      estado: 'Pendiente',
      icon: <CheckCircle size={20} className="text-success" />
    },
    {
      id: 4,
      tipo: 'info',
      titulo: 'Reporte Diario Generado',
      mensaje: 'El reporte de ayer ya está disponible. Ventas superaron la proyección en 12%.',
      tiempo: 'Ayer, 23:30',
      estado: 'Leído',
      icon: <Clock size={20} className="text-muted" />
    }
  ];

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-text mb-2">Alertas y Notificaciones</h1>
        <p className="text-muted">Centro de control de todas las recomendaciones automáticas y avisos críticos.</p>
      </header>

      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-heading font-bold">Últimas Alertas</h2>
          <button className="text-sm font-medium text-accent hover:text-accent2 transition-colors">
            Marcar todas como leídas
          </button>
        </div>
        
        <div className="space-y-4">
          {alertas.map((alerta) => (
            <div 
              key={alerta.id} 
              className={`p-5 rounded-xl border flex gap-4 items-start ${
                alerta.estado === 'Pendiente' 
                  ? 'bg-card border-border' 
                  : 'bg-surface border-transparent opacity-70'
              }`}
            >
              <div className={`p-2 rounded-full ${
                alerta.tipo === 'danger' ? 'bg-danger/10' :
                alerta.tipo === 'warning' ? 'bg-warning/10' :
                alerta.tipo === 'success' ? 'bg-success/10' : 'bg-muted/10'
              }`}>
                {alerta.icon}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className={`font-medium ${
                    alerta.tipo === 'danger' ? 'text-danger' :
                    alerta.tipo === 'warning' ? 'text-warning' :
                    alerta.tipo === 'success' ? 'text-success' : 'text-text'
                  }`}>
                    {alerta.titulo}
                  </h4>
                  <span className="text-xs text-muted flex items-center gap-1">
                    <Clock size={12} />
                    {alerta.tiempo}
                  </span>
                </div>
                <p className="text-sm text-text/80 mb-3">{alerta.mensaje}</p>
                
                {alerta.estado === 'Pendiente' && (
                  <div className="flex gap-3">
                    <button className="text-xs px-3 py-1.5 bg-surface border border-border rounded text-text hover:bg-border transition-colors">
                      Marcar como resuelto
                    </button>
                    {alerta.tipo === 'danger' && (
                      <button className="text-xs px-3 py-1.5 bg-accent text-white rounded hover:bg-accent2 transition-colors">
                        Actuar ahora
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
