export const KpiCard = ({ title, value, trend, subtitle, icon }) => {
  const isPositive = trend >= 0;
  
  return (
    <div className="bg-surface border border-border rounded-xl p-6 flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div className="p-3 bg-card rounded-lg text-accent">
          {icon}
        </div>
        {trend !== undefined && (
          <div className={`px-2 py-1 rounded text-sm font-medium ${isPositive ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
            {isPositive ? '+' : ''}{trend}%
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-muted text-sm font-medium mb-1">{title}</h3>
        <p className="text-3xl font-heading font-bold text-text">{value}</p>
        {subtitle && <p className="text-muted text-xs mt-2">{subtitle}</p>}
      </div>
    </div>
  );
};
