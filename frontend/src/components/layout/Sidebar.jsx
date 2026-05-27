import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, TrendingUp, Package, Users, Tag, Radar, Bell, LogOut, X, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar = ({ onClose }) => {
  const { logout } = useAuth();
  const [isLightMode, setIsLightMode] = useState(false);

  // Efecto para aplicar la clase 'light' al documento cuando cambia el estado
  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [isLightMode]);

  const links = [
    { to: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/ventas', icon: <TrendingUp size={20} />, label: 'Ventas' },
    { to: '/stock', icon: <Package size={20} />, label: 'Stock' },
    { to: '/staffing', icon: <Users size={20} />, label: 'Staffing' },
    { to: '/pricing', icon: <Tag size={20} />, label: 'Pricing' },
    { to: '/radar', icon: <Radar size={20} />, label: 'Radar' },
    { to: '/alertas', icon: <Bell size={20} />, label: 'Alertas' },
  ];

  return (
    <aside className="w-64 bg-surface border-r border-border h-full flex flex-col shadow-2xl md:shadow-none print:hidden">
      <div className="p-6 flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-fire-flame-curved text-accent text-2xl"></i>
            <h1 className="text-2xl font-heading font-bold text-text">Turno<span className="text-accent">.</span></h1>
          </div>
          <p className="text-[10px] text-muted font-mono tracking-widest uppercase mt-1 ml-8">Business Intelligence</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="md:hidden p-1 text-muted hover:text-text rounded-md hover:bg-border transition-colors">
            <X size={20} />
          </button>
        )}
      </div>
      
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? 'bg-accent/10 text-accent' : 'text-text hover:bg-card'
              }`
            }
          >
            {link.icon}
            <span className="font-medium">{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-border mt-auto">
        <div className="flex items-center gap-3 px-4 py-3 mb-2 bg-card rounded-lg border border-border">
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-accent2 to-accent flex items-center justify-center text-bg font-bold font-heading text-sm shrink-0">
            PA
          </div>
          <div className="overflow-hidden">
            <div className="text-sm font-medium text-text truncate">Pizza Los Álamos</div>
            <div className="text-[10px] text-accent font-mono tracking-wider">PLAN PILOTO</div>
          </div>
        </div>

        {/* BOTÓN MODO CLARO / OSCURO */}
        <button
          onClick={() => setIsLightMode(!isLightMode)}
          className="flex items-center gap-3 px-4 py-3 mb-2 w-full text-left text-muted hover:text-text hover:bg-card rounded-lg transition-colors"
        >
          {isLightMode ? <Moon size={20} /> : <Sun size={20} />}
          <span className="font-medium">{isLightMode ? 'Modo Oscuro' : 'Modo Claro'}</span>
        </button>

        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full text-left text-danger hover:bg-danger/10 rounded-lg transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
};
