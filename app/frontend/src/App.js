import { useState, useEffect } from 'react';
import './App.css';

const TechIcon = ({ type }) => {
  const icons = {
    api: <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" />,
    infra: <path d="M4 14.5c0-2.5 2-4.5 4.5-4.5h.5V9.5C9 6.5 11.5 4 14.5 4S20 6.5 20 9.5v.5h.5c2.5 0 4.5 2 4.5 4.5s-2 4.5-4.5 4.5H8.5c-2.5 0-4.5-2-4.5-4.5z" stroke="currentColor" strokeWidth="2" fill="none" />,
    stack: <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2" fill="none" />
  };
  return <svg viewBox="0 0 24 24" className="cyber-icon">{icons[type]}</svg>;
};

function App() {
  const [data, setData] = useState({ message: 'BOOTING...', status: 'loading' });

  useEffect(() => {
    const timer = setTimeout(() => {
      fetch('/api/hello/')
        .then(res => res.json())
        .then(resData => setData({ message: resData.message, status: 'online' }))
        .catch(() => setData({ message: 'SYSTEM FAILURE', status: 'offline' }));
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="cyber-hud">
      {/* 🔮 3D PERSPECTIVE GRID */}
      <div className="cyber-grid"></div>
      
      <div className="corner-decor top-left"></div>
      <div className="corner-decor top-right"></div>
      <div className="corner-decor bottom-left"></div>
      <div className="corner-decor bottom-right"></div>

      <main className="hud-interface">
        <header className="title-container">
          <div className="glitch-wrapper">
            <h1 className="glitch" data-text="QUANTUM OVERDRIVE">QUANTUM OVERDRIVE</h1>
          </div>
          <div className="sub-glitch">AWS DEPLOYMENT :: TERMINAL v2.0</div>
        </header>

        <section className="hud-grid">
          {/* Card 1: Live API Feed */}
          <div className={`cyber-card ${data.status}`}>
            <div className="card-glitch"></div>
            <div className="card-inner">
              <div className="card-header">
                <TechIcon type="api" />
                <h2>LIVE FEED</h2>
              </div>
              <div className="status-bar">
                <div className="status-label">{data.status.toUpperCase()}</div>
                <div className="status-progress">
                  <div className="progress-fill"></div>
                </div>
              </div>
              <p className="status-msg">{data.message}</p>
              <div className="card-footer">0x00A1 :: DEPLOY_READY</div>
            </div>
          </div>

          {/* Card 2: Infrastructure Core */}
          <div className="cyber-card">
            <div className="card-glitch"></div>
            <div className="card-inner">
              <div className="card-header">
                <TechIcon type="infra" />
                <h2>INFRA CORE</h2>
              </div>
              <div className="infra-data">
                <div className="data-row"><span>REGION</span> <span>AS-MUM-1</span></div>
                <div className="data-row"><span>NODE</span> <span>T2-MICRO</span></div>
                <div className="data-row"><span>KERNEL</span> <span>UBUNTU-LTS</span></div>
              </div>
              <div className="scanning-line"></div>
            </div>
          </div>

          {/* Card 3: System Stack */}
          <div className="cyber-card">
            <div className="card-glitch"></div>
            <div className="card-inner">
              <div className="card-header">
                <TechIcon type="stack" />
                <h2>PROTOCOLS</h2>
              </div>
              <div className="protocol-pills">
                {['TERRAFORM', 'ANSIBLE', 'DOCKER', 'DJANGO', 'REACT'].map(tech => (
                  <div key={tech} className="cyber-pill">{tech}</div>
                ))}
              </div>
              <div className="hologram-flicker"></div>
            </div>
          </div>
        </section>

        <footer className="hud-footer">
          <div className="scrolling-text">
            SYSTEM STATUS :: NOMINAL // DATABASE :: CONNECTED // AWS CORE :: STABLE // SECURITY :: V2.4-ACTIVE // 
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
