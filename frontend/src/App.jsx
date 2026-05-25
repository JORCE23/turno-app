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

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-bg">
        {children}
      </main>
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
