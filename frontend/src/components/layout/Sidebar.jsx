import { NavLink } from 'react-router-dom';
import { LayoutDashboard, TrendingUp, Package, Users, Tag, Radar, Bell, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar = () => {
  const { logout } = useAuth();

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
    <aside className="w-64 bg-surface border-r border-border h-screen flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-heading font-bold text-accent">Turno</h1>
        <p className="text-sm text-muted">Socio estratégico</p>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
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

      <div className="p-4 border-t border-border">
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
