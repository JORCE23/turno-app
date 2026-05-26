import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Sidebar } from './components/layout/Sidebar';
import { Login } from './pages/Login';
import { Dashboard } from './views/Dashboard';
import { Ventas } from './views/Ventas';
import { Predicciones } from './views/Predicciones';
import { Staffing } from './views/Staffing';
import { Stock } from './views/Stock';
import { Pricing } from './views/Pricing';
import { Radar } from './views/Radar';
import { Alertas } from './views/Alertas';
import { Menu, Flame } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!user) return <Navigate to="/login" />;
  
  return (
    <div className="flex h-screen overflow-hidden bg-bg">
      {/* Fondo oscuro al abrir el menú en móviles */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Contenedor del Sidebar (Oculto en móvil por defecto, fijo a la izquierda) */}
      <div className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Contenedor Principal */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header móvil (solo visible en pantallas pequeñas) */}
        <header className="md:hidden flex items-center justify-between p-4 bg-surface border-b border-border">
          <div className="flex items-center gap-2">
            <Flame size={20} className="text-accent fill-accent/20" />
            <h1 className="text-xl font-heading font-bold text-text">Turno<span className="text-accent">.</span></h1>
          </div>
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-text hover:bg-border rounded-lg transition-colors">
            <Menu size={24} />
          </button>
        </header>
        
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/ventas" element={<ProtectedRoute><Ventas /></ProtectedRoute>} />
        <Route path="/predicciones" element={<ProtectedRoute><Predicciones /></ProtectedRoute>} />
        <Route path="/staffing" element={<ProtectedRoute><Staffing /></ProtectedRoute>} />
        <Route path="/stock" element={<ProtectedRoute><Stock /></ProtectedRoute>} />
        <Route path="/pricing" element={<ProtectedRoute><Pricing /></ProtectedRoute>} />
        <Route path="/radar" element={<ProtectedRoute><Radar /></ProtectedRoute>} />
        <Route path="/alertas" element={<ProtectedRoute><Alertas /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
