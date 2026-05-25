import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate('/');
    } else {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg p-4">
      <div className="w-full max-w-md bg-surface border border-border rounded-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-heading font-bold text-accent mb-2">Turno</h1>
          <p className="text-muted">Inicia sesión en tu dashboard</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-danger/10 border border-danger/20 text-danger rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text mb-1">Usuario</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-card border border-border rounded-lg text-text focus:outline-none focus:border-accent transition-colors"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="cliente o admin"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1">Contraseña</label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-card border border-border rounded-lg text-text focus:outline-none focus:border-accent transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="cliente123"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-accent hover:bg-accent2 text-white font-medium rounded-lg transition-colors mt-6"
          >
            Ingresar
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-muted">
          <p>Credenciales Demo:</p>
          <p>admin / admin123</p>
          <p>cliente / cliente123</p>
        </div>
      </div>
    </div>
  );
};
