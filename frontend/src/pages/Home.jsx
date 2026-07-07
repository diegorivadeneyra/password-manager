import { Link } from 'react-router-dom';

function Home() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0d1117',
        color: '#e6edf3',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          background: '#161b22',
          borderBottom: '1px solid #30363d',
          padding: '0 2rem',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '56px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '13px',
                color: '#8b949e',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontWeight: 500,
              }}
            >
              PASSWORD VAULT
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {['AES-256-GCM', 'MFA'].map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: '11px',
                  padding: '3px 10px',
                  borderRadius: '20px',
                  border: '1px solid #30363d',
                  color: '#8b949e',
                  background: '#0d1117',
                }}
              >
                {tag}
              </span>
            ))}
            <Link
              to="/about"
              style={{
                marginLeft: '12px',
                fontSize: '13px',
                color: '#8b949e',
                textDecoration: 'none',
                padding: '6px 14px',
                borderRadius: '6px',
                border: '1px solid #30363d',
              }}
            >
              Acerca de
            </Link>
            <Link
              to="/login"
              style={{
                fontSize: '13px',
                color: '#8b949e',
                textDecoration: 'none',
                padding: '6px 14px',
                borderRadius: '6px',
                border: '1px solid #30363d',
              }}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={{
                fontSize: '13px',
                color: '#0d1117',
                textDecoration: 'none',
                padding: '6px 14px',
                borderRadius: '6px',
                background: '#58a6ff',
                fontWeight: 500,
              }}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 2rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'center',
          }}
        >
          {/* Left: Text */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: '#161b22',
                border: '1px solid #30363d',
                borderRadius: '6px',
                padding: '4px 12px',
                marginBottom: '1.5rem',
              }}
            >
              {/* Icono de candado (SVG inline) */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3fb950" strokeWidth="2.2">
                <rect x="4" y="11" width="16" height="9" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span style={{ fontSize: '12px', color: '#8b949e', letterSpacing: '0.06em' }}>
                Proyecto de criptografía aplicada
              </span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 700,
                lineHeight: 1.2,
                margin: '0 0 1rem',
                color: '#e6edf3',
              }}
            >
              Mantén tus contraseñas
              <br />
              <span style={{ color: '#58a6ff' }}>seguras y accesibles</span>
            </h1>

            <p
              style={{
                fontSize: '15px',
                color: '#8b949e',
                lineHeight: 1.7,
                marginBottom: '2rem',
                maxWidth: '480px',
              }}
            >
              Guarda y administra tus credenciales cifradas de extremo a
              extremo, protegidas con autenticación multifactor.
            </p>

            <div style={{ display: 'flex', gap: '12px' }}>
              <Link
                to="/register"
                style={{
                  background: '#238636',
                  color: '#fff',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  fontWeight: 600,
                  fontSize: '14px',
                  textDecoration: 'none',
                  border: '1px solid #2ea043',
                }}
              >
                Crear Cuenta
              </Link>
              <Link
                to="/login"
                style={{
                  background: 'transparent',
                  color: '#e6edf3',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  fontWeight: 500,
                  fontSize: '14px',
                  textDecoration: 'none',
                  border: '1px solid #30363d',
                }}
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/about"
                style={{
                  background: 'transparent',
                  color: '#8b949e',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  fontWeight: 500,
                  fontSize: '14px',
                  textDecoration: 'none',
                }}
              >
                Ver stack técnico →
              </Link>
            </div>
          </div>

          {/* Right: Dashboard preview (mock) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div
              style={{
                background: '#161b22',
                border: '1px solid #30363d',
                borderRadius: '10px 10px 0 0',
                padding: '12px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #21262d',
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: '10px',
                    color: '#8b949e',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  VAULT DASHBOARD
                </div>
                <div style={{ fontSize: '15px', fontWeight: 600, color: '#e6edf3', marginTop: '2px' }}>
                  Vista previa
                </div>
              </div>
              <span
                style={{
                  fontSize: '11px',
                  padding: '3px 10px',
                  borderRadius: '20px',
                  border: '1px solid #30363d',
                  color: '#8b949e',
                }}
              >
                Demo
              </span>
            </div>

            {[
              { name: 'GitHub', user: 'usuario@github.com', status: 'Actualizado hace 2 días', color: '#3fb950' },
              { name: 'Gmail', user: 'usuario@gmail.com', status: 'MFA activo', color: '#d29922' },
              { name: 'Steam', user: 'usuario@steam.com', status: 'Sin cambios', color: '#58a6ff' },
            ].map(({ name, user, status, color }) => (
              <div
                key={name}
                style={{
                  background: '#161b22',
                  border: '1px solid #30363d',
                  borderRadius: '8px',
                  padding: '14px 16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#e6edf3' }}>
                    {name}
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: '#8b949e',
                      fontFamily: 'monospace',
                      background: '#0d1117',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      marginTop: '6px',
                      border: '1px solid #21262d',
                      display: 'inline-block',
                    }}
                  >
                    {user}
                  </div>
                </div>
                <span
                  style={{
                    fontSize: '11px',
                    padding: '3px 10px',
                    borderRadius: '20px',
                    border: `1px solid ${color}40`,
                    color,
                    background: `${color}15`,
                    fontWeight: 600,
                  }}
                >
                  {status}
                </span>
              </div>
            ))}

            <div
              style={{
                background: '#161b22',
                border: '1px solid #30363d',
                borderRadius: '0 0 10px 10px',
                padding: '12px 16px',
                textAlign: 'center',
              }}
            >
              <Link
                to="/about"
                style={{ fontSize: '12px', color: '#58a6ff', textDecoration: 'none' }}
              >
                Ver detalles del cifrado →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;