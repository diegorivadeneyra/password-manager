import { Link } from 'react-router-dom';

function About() {
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
            <Link
              to="/"
              style={{
                fontSize: '13px',
                color: '#8b949e',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              PASSWORD VAULT
            </Link>
            <span style={{ color: '#30363d' }}>›</span>
            <span style={{ fontSize: '13px', color: '#e6edf3', fontWeight: 500 }}>
              Sobre el proyecto
            </span>
          </div>

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
        </div>
      </nav>

      {/* Content */}
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '3rem 2rem' }}>
        <h1
          style={{
            fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
            fontWeight: 700,
            marginBottom: '1rem',
          }}
        >
          Sobre el proyecto
        </h1>

        <p style={{ fontSize: '15px', color: '#8b949e', lineHeight: 1.8, marginBottom: '2rem' }}>
          Password Vault es un gestor de contraseñas construido para demostrar
          la aplicación práctica de criptografía real en un caso de uso
          cotidiano: guardar y recuperar credenciales de forma segura.
        </p>

        <div
          style={{
            background: '#161b22',
            border: '1px solid #30363d',
            borderRadius: '10px',
            padding: '20px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              fontSize: '10px',
              color: '#8b949e',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '14px',
            }}
          >
            Stack criptográfico
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {[
              { label: 'Cifrado', value: 'AES-256-GCM' },
              { label: 'Derivación de llave', value: 'PBKDF2 · 300,000 iteraciones' },
              { label: 'Hash de contraseña', value: 'Argon2id' },
              { label: 'Segundo factor', value: 'TOTP · RFC 6238' },
              { label: 'Nonce', value: 'Aleatorio, único por credencial' },
              { label: 'Sesión', value: 'JWT firmado (HS256)' },
            ].map(({ label, value }) => (
              <div
                key={label}
                style={{
                  background: '#0d1117',
                  border: '1px solid #21262d',
                  borderRadius: '6px',
                  padding: '10px 12px',
                }}
              >
                <div style={{ fontSize: '10px', color: '#8b949e', marginBottom: '4px' }}>
                  {label}
                </div>
                <div style={{ fontSize: '13px', color: '#58a6ff', fontFamily: 'monospace', fontWeight: 600 }}>
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            background: '#161b22',
            border: '1px solid #30363d',
            borderRadius: '10px',
            padding: '20px',
          }}
        >
          <div
            style={{
              fontSize: '10px',
              color: '#8b949e',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '14px',
            }}
          >
            Cómo funciona
          </div>

          <p style={{ fontSize: '14px', color: '#8b949e', lineHeight: 1.8 }}>
            La llave de cifrado se deriva de tu contraseña maestra combinada
            con un secreto único generado al registrarte, que solo tú
            conservas. Ninguno de los dos se guarda de forma permanente en el
            servidor — sin ambos, ni siquiera con acceso total a la base de
            datos es posible recuperar tus contraseñas.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;