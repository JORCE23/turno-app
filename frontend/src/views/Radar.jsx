import { KpiCard } from '../components/ui/KpiCard';
import { Target, Users, Map, Star } from 'lucide-react';

export const Radar = () => {
  const competitors = [
    { name: 'Barberia & Burguers "El Capi"', distance: '120m', rating: 4.6, reviews: 342, match: 'Alto', pricing: 'Similar', trend: 'Subiendo' },
    { name: 'Sushi Bar Nikkei', distance: '300m', rating: 4.8, reviews: 512, match: 'Medio', pricing: 'Más caro', trend: 'Estable' },
    { name: 'Pizzería La Mamma', distance: '150m', rating: 4.2, reviews: 890, match: 'Bajo', pricing: 'Más barato', trend: 'Bajando' },
    { name: 'Cervecería Artesanal Sur', distance: '50m', rating: 4.7, reviews: 1024, match: 'Muy Alto', pricing: 'Similar', trend: 'Subiendo rápido' },
  ];

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-text mb-2">Radar de Competencia</h1>
        <p className="text-muted">Inteligencia de mercado y análisis de locales cercanos (Fase 2 Beta).</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <KpiCard 
          title="Locales en tu radio" 
          value="24" 
          subtitle="A menos de 500m"
          icon={<Map size={24} />}
        />
        <KpiCard 
          title="Competidores Directos" 
          value="4" 
          subtitle="Mismo público objetivo"
          icon={<Target size={24} />}
        />
        <KpiCard 
          title="Tu Rating vs Promedio" 
          value="4.7 / 4.3" 
          subtitle="En Google Maps"
          icon={<Star size={24} />}
        />
        <KpiCard 
          title="Público Estimado" 
          value="Alta afluencia" 
          subtitle="Hoy en tu sector"
          icon={<Users size={24} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface border border-border rounded-xl p-6">
          <h2 className="text-xl font-heading font-bold mb-4">Análisis de Locales Cercanos</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border text-muted">
                  <th className="py-4 px-4 font-medium">Local</th>
                  <th className="py-4 px-4 font-medium">Rating</th>
                  <th className="py-4 px-4 font-medium">Precio vs Tú</th>
                  <th className="py-4 px-4 font-medium">Similitud</th>
                  <th className="py-4 px-4 font-medium">Tendencia Social</th>
                </tr>
              </thead>
              <tbody>
                {competitors.map((comp, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-card/50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-medium text-text">{comp.name}</div>
                      <div className="text-xs text-muted">{comp.distance}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <Star size={14} className="text-warning mr-1 fill-warning" />
                        <span className="font-mono">{comp.rating}</span>
                        <span className="text-muted text-xs ml-2">({comp.reviews})</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm">{comp.pricing}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        comp.match === 'Muy Alto' || comp.match === 'Alto' ? 'bg-danger/10 text-danger border border-danger/20' : 
                        comp.match === 'Medio' ? 'bg-warning/10 text-warning border border-warning/20' : 
                        'bg-success/10 text-success border border-success/20'
                      }`}>
                        {comp.match}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-text/80">{comp.trend}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6">
          <h2 className="text-xl font-heading font-bold mb-4">Insights del Entorno</h2>
          <div className="space-y-4">
            <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
              <h4 className="text-accent font-medium mb-1">Evento en la zona</h4>
              <p className="text-text/80 text-sm">Hoy hay un concierto en el teatro a 200m. Se espera un peak de flujo de público entre las 19:00 y 21:00 hrs. Prepárate con menú rápido.</p>
            </div>
            <div className="p-4 bg-surface border border-border rounded-lg">
              <h4 className="text-text font-medium mb-1">Estrategia de Pricing</h4>
              <p className="text-text/80 text-sm">Tus competidores directos han subido los precios de sus cervezas un 5% este mes. Tienes margen para un ajuste sin perder competitividad.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
