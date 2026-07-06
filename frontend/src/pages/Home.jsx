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
            <span style={{ color: '#30363d' }}>›</span>
            <span
              style={{ fontSize: '13px', color: '#e6edf3', fontWeight: 500 }}
            >
              Secure Dashboard
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {['AES-256', 'MFA', 'Zero-Knowledge'].map((tag) => (
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
              to="/login"
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
      <section
        style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 2rem' }}
      >
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
                gap: '8px',
                background: '#161b22',
                border: '1px solid #30363d',
                borderRadius: '6px',
                padding: '4px 12px',
                marginBottom: '1.5rem',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#3fb950',
                  display: 'inline-block',
                }}
              ></span>
              <span
                style={{
                  fontSize: '12px',
                  color: '#8b949e',
                  letterSpacing: '0.06em',
                }}
              >
                ESTADO ACTUAL
              </span>
              <span
                style={{ fontSize: '12px', color: '#3fb950', fontWeight: 600 }}
              >
                Protegido · 0 vulnerabilidades
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
              Guarda, administra y protege tus credenciales con cifrado avanzado
              y autenticación multifactor.
            </p>

            {/* Stats row */}
            <div
              style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}
            >
              {[
                { label: 'ENTRADAS', value: '0' },
                { label: 'CIFRADO', value: 'AES-256' },
                { label: 'MFA', value: 'Activo' },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    background: '#161b22',
                    border: '1px solid #30363d',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    minWidth: '80px',
                  }}
                >
                  <div
                    style={{
                      fontSize: '11px',
                      color: '#8b949e',
                      letterSpacing: '0.08em',
                      marginBottom: '4px',
                    }}
                  >
                    {label}
                  </div>
                  <div
                    style={{
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#58a6ff',
                    }}
                  >
                    {value}
                  </div>
                </div>
              ))}
            </div>

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
            </div>
          </div>

          {/* Right: Dashboard panel */}
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            {/* Panel header */}
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
                <div
                  style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#e6edf3',
                    marginTop: '2px',
                  }}
                >
                  Mapa principal de credenciales
                </div>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                {['AES', 'MFA', 'TLS'].map((tag, i) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '11px',
                      padding: '3px 10px',
                      borderRadius: '20px',
                      border: `1px solid ${i === 2 ? '#58a6ff' : '#30363d'}`,
                      color: i === 2 ? '#58a6ff' : '#8b949e',
                      background:
                        i === 2 ? 'rgba(88,166,255,0.1)' : 'transparent',
                      fontWeight: i === 2 ? 600 : 400,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Credential entries */}
            {[
              {
                name: 'GitHub',
                user: 'usuario@github.com',
                label: 'Inicio',
                status: 'Verificado',
                color: '#3fb950',
              },
              {
                name: 'Gmail',
                user: 'usuario@gmail.com',
                label: 'Reducción',
                status: 'MFA activo',
                color: '#d29922',
              },
              {
                name: 'Steam',
                user: 'usuario@steam.com',
                label: 'Shift',
                status: 'Seguro',
                color: '#58a6ff',
              },
            ].map(({ name, user, label, status, color }) => (
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
                  <div
                    style={{
                      fontSize: '11px',
                      color: '#8b949e',
                      letterSpacing: '0.08em',
                      marginBottom: '4px',
                    }}
                  >
                    ESTADO
                  </div>
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#e6edf3',
                    }}
                  >
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
                    }}
                  >
                    {user}
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '6px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '11px',
                      padding: '3px 10px',
                      borderRadius: '20px',
                      border: `1px solid ${color}40`,
                      color: color,
                      background: `${color}15`,
                      fontWeight: 600,
                    }}
                  >
                    {label}
                  </span>
                  <span style={{ fontSize: '11px', color: '#8b949e' }}>
                    {status}
                  </span>
                </div>
              </div>
            ))}

            {/* Bottom: FIRST/FOLLOW mini panel */}
            <div
              style={{
                background: '#161b22',
                border: '1px solid #30363d',
                borderRadius: '0 0 10px 10px',
                padding: '12px 16px',
                display: 'flex',
                gap: '12px',
              }}
            >
              {[
                { label: 'CIFRADO', value: 'AES-256-GCM' },
                { label: 'ITERACIONES PBKDF2', value: '600,000' },
                { label: 'SALT', value: '256 bits' },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    flex: 1,
                    background: '#0d1117',
                    border: '1px solid #21262d',
                    borderRadius: '6px',
                    padding: '8px 10px',
                  }}
                >
                  <div
                    style={{
                      fontSize: '10px',
                      color: '#8b949e',
                      letterSpacing: '0.08em',
                      marginBottom: '4px',
                    }}
                  >
                    {label}
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: '#58a6ff',
                      fontFamily: 'monospace',
                      fontWeight: 600,
                    }}
                  >
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
