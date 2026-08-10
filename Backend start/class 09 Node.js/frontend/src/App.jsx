import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';

function App() {
  const { user, loading } = useAuth();
  const [showLogin, setShowLogin] = useState(true);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        color: '#c7d2fe',
        fontFamily: 'Segoe UI, sans-serif',
        fontSize: '1.2rem',
      }}>
        Loading...
      </div>
    );
  }

  if (user) {
    return <Dashboard />;
  }

  if (showLogin) {
    return <Login switchToSignup={() => setShowLogin(false)} />;
  }

  return <Signup switchToLogin={() => setShowLogin(true)} />;
}

export default App;
