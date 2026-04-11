import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    fetch('/api/hello/')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(() => setMessage('API connection failed'));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Fullstack AWS Deploy</h1>
      <p>Django says: {message}</p>
    </div>
  );
}

export default App;
