import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

function Signup({ switchToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setMessage({ text: 'Sab fields fill karein', type: 'error' });
      return;
    }

    if (formData.password.length < 6) {
      setMessage({ text: 'Password kam se kam 6 characters ka hona chahiye', type: 'error' });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage({ text: 'Password aur confirm password match nahi kar rahe', type: 'error' });
      return;
    }

    setLoading(true);
    setMessage(null);

    const result = await register(formData.name, formData.email, formData.password);

    setLoading(false);

    if (!result.success) {
      setMessage({ text: result.message, type: 'error' });
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">✨ Signup</h1>
        <p className="auth-subtitle">Naya account banayein, free hai!</p>

        {message && (
          <div className={`auth-alert auth-alert-${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Apna naam likhein"
              autoComplete="name"
            />
          </div>

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
            <label>Password (min 6 characters):</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="******"
              autoComplete="new-password"
            />
          </div>

          <div className="auth-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="******"
              autoComplete="new-password"
            />
          </div>

          <button type="submit" className="auth-btn-primary" disabled={loading}>
            {loading ? 'Loading...' : 'Signup Karein'}
          </button>
        </form>

        <p className="auth-switch">
          Pehle se account hai?{' '}
          <button onClick={switchToLogin} className="auth-link-btn">
            Login Karein
          </button>
        </p>
      </div>
    </div>
  );
}

export default Signup;
