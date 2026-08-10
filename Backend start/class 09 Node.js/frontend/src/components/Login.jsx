import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

function Login({ switchToSignup }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setMessage({ text: 'Sab fields fill karein', type: 'error' });
      return;
    }

    setLoading(true);
    setMessage(null);

    const result = await login(formData.email, formData.password);

    setLoading(false);

    if (!result.success) {
      setMessage({ text: result.message, type: 'error' });
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">🔐 Login</h1>
        <p className="auth-subtitle">MERN CRUD Application me welcome!</p>

        {message && (
          <div className={`auth-alert auth-alert-${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="apna@example.com"
              autoComplete="email"
            />
          </div>

          <div className="auth-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="******"
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="auth-btn-primary" disabled={loading}>
            {loading ? 'Loading...' : 'Login Karein'}
          </button>
        </form>

        <p className="auth-switch">
          Naya user hain?{' '}
          <button onClick={switchToSignup} className="auth-link-btn">
            Signup Karein
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
