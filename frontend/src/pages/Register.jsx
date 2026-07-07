import { useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [qrUrl, setQrUrl] = useState('');
  const [registered, setRegistered] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);
  const [downloadableSecret, setDownloadableSecret] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/register', {
        username,
        email,
        password,
      });
      const clientSecret = response.data.client_secret;
      //localStorage.setItem('client_secret', clientSecret);
      setDownloadableSecret(clientSecret);
      setMessage(response.data.message);
      setIsError(false);
      setUsername('');
      setPassword('');
      setEmail('');
      setQrUrl(`http://127.0.0.1:8000/totp/${response.data.user_id}/qr`);
      setRegistered(true);
    } catch (error) {
      setIsError(true);
      setMessage(error.response?.data?.detail || 'Error al registrar usuario');
    }
  };

  const handleDownloadSecret = () => {
    const blob = new Blob([downloadableSecret], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'client_secret.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const inputStyle = {
    width: '100%',
    background: '#0d1117',
    border: '1px solid #30363d',
    borderRadius: '6px',
    padding: '10px 14px',
    color: '#e6edf3',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '11px',
    color: '#8b949e',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginBottom: '6px',
    fontWeight: 500,
  };

  const timelineSteps = registered
    ? [
        {
          num: '#01',
          label: 'cuenta creada',
          desc: 'usuario registrado correctamente',
          status: 'done',
          color: '#3fb950',
        },
        {
          num: '#02',
          label: 'escanear QR',
          desc: 'vincula Google Authenticator',
          status: 'active',
          color: '#58a6ff',
        },
        {
          num: '#03',
          label: 'iniciar sesión',
          desc: 'ingresa el código TOTP',
          status: 'next',
          color: '#8b949e',
        },
      ]
    : [
        {
          num: '#01',
          label: 'crear cuenta',
          desc: 'usuario + email + contraseña',
          status: 'active',
          color: '#58a6ff',
        },
        {
          num: '#02',
          label: 'vincular MFA',
          desc: 'escanear QR con Authenticator',
          status: 'next',
          color: '#8b949e',
        },
        {
          num: '#03',
          label: 'derivar clave',
          desc: 'PBKDF2 · 600k iteraciones',
          status: 'next',
          color: '#8b949e',
        },
        {
          num: '#04',
          label: 'abrir bóveda',
          desc: 'acceso AES-256-GCM',
          status: 'next',
          color: '#8b949e',
        },
      ];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0d1117',
        color: '#e6edf3',
        fontFamily: "'Inter', sans-serif",
        display: 'flex',
        flexDirection: 'column',
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
            <span
              style={{ fontSize: '13px', color: '#e6edf3', fontWeight: 500 }}
            >
              Crear Cuenta
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {['AES-256-GCM', 'MFA', 'PBKDF2'].map((tag) => (
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
                marginLeft: '12px',
                fontSize: '13px',
                color: '#e6edf3',
                textDecoration: 'none',
                padding: '6px 14px',
                borderRadius: '6px',
                border: '1px solid #30363d',
              }}
            >
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '3rem 2rem',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '900px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            alignItems: 'start',
          }}
        >
          {/* Left: Form panel */}
          <div>
            <div
              style={{
                background: '#161b22',
                border: '1px solid #30363d',
                borderRadius: '10px 10px 0 0',
                padding: '12px 16px',
                borderBottom: '1px solid #21262d',
              }}
            >
              <div
                style={{
                  fontSize: '10px',
                  color: '#8b949e',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                REGISTRO
              </div>
              <div
                style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#e6edf3',
                  marginTop: '2px',
                }}
              >
                Nueva cuenta en bóveda
              </div>
            </div>

            <div
              style={{
                background: '#161b22',
                border: '1px solid #30363d',
                borderTop: 'none',
                borderRadius: '0 0 10px 10px',
                padding: '20px 16px',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#0d1117',
                  border: '1px solid #30363d',
                  borderRadius: '6px',
                  padding: '4px 12px',
                  marginBottom: '20px',
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: registered ? '#3fb950' : '#58a6ff',
                    display: 'inline-block',
                  }}
                ></span>
                <span
                  style={{
                    fontSize: '12px',
                    color: registered ? '#3fb950' : '#58a6ff',
                    fontWeight: 600,
                  }}
                >
                  {registered
                    ? 'Cuenta creada · Vincula MFA'
                    : 'Registro seguro · TLS 1.3'}
                </span>
              </div>

              <form
                onSubmit={handleRegister}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                }}
              >
                <div>
                  <label style={labelStyle}>Usuario</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={inputStyle}
                    placeholder="tu_usuario"
                    onFocus={(e) => (e.target.style.borderColor = '#58a6ff')}
                    onBlur={(e) => (e.target.style.borderColor = '#30363d')}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Correo electrónico</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                    placeholder="correo@ejemplo.com"
                    onFocus={(e) => (e.target.style.borderColor = '#58a6ff')}
                    onBlur={(e) => (e.target.style.borderColor = '#30363d')}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Contraseña maestra</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{ ...inputStyle, paddingRight: '52px' }}
                      placeholder="••••••••••••"
                      onFocus={(e) => (e.target.style.borderColor = '#58a6ff')}
                      onBlur={(e) => (e.target.style.borderColor = '#30363d')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#8b949e',
                        fontSize: '12px',
                        padding: 0,
                        fontFamily: 'inherit',
                      }}
                    >
                      {showPassword ? 'ocultar' : 'ver'}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={registered}
                  style={{
                    background: registered ? '#1a3a24' : '#238636',
                    color: registered ? '#3fb950' : '#fff',
                    border: '1px solid #2ea043',
                    borderRadius: '6px',
                    padding: '10px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: registered ? 'default' : 'pointer',
                    marginTop: '4px',
                    fontFamily: 'inherit',
                  }}
                >
                  {registered ? '✓ Cuenta creada' : 'Registrarse'}
                </button>

                <div style={{ textAlign: 'center' }}>
                  <Link
                    to="/login"
                    style={{
                      fontSize: '13px',
                      color: '#58a6ff',
                      textDecoration: 'none',
                    }}
                  >
                    ¿Ya tienes cuenta? Inicia sesión
                  </Link>
                </div>
              </form>

              {message && (
                <div
                  style={{
                    marginTop: '14px',
                    padding: '10px 14px',
                    background: isError
                      ? 'rgba(248,81,73,0.1)'
                      : 'rgba(63,185,80,0.1)',
                    border: `1px solid ${isError ? 'rgba(248,81,73,0.4)' : 'rgba(63,185,80,0.4)'}`,
                    borderRadius: '6px',
                    fontSize: '13px',
                    color: isError ? '#f85149' : '#3fb950',
                    fontFamily: 'monospace',
                  }}
                >
                  {isError ? '⚠' : '✓'} {message}
                </div>
              )}
            </div>
          </div>

          {/* Right: QR / Info panel */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Panel header */}
            <div
              style={{
                background: '#161b22',
                border: '1px solid #30363d',
                borderRadius: '10px 10px 0 0',
                padding: '12px 16px',
                borderBottom: '1px solid #21262d',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
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
                  {registered ? 'MFA · Google Authenticator' : 'EXPLICACIÓN'}
                </div>
                <div
                  style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#e6edf3',
                    marginTop: '2px',
                  }}
                >
                  {registered
                    ? 'Escanea el código QR'
                    : 'Inspector de seguridad'}
                </div>
              </div>
              {registered && (
                <span
                  style={{
                    fontSize: '11px',
                    padding: '3px 10px',
                    borderRadius: '20px',
                    border: '1px solid rgba(63,185,80,0.4)',
                    color: '#3fb950',
                    background: 'rgba(63,185,80,0.1)',
                    fontWeight: 600,
                  }}
                >
                  Activo
                </span>
              )}
            </div>

            {/* QR — solo si registered */}
            {registered && (
              <div
                style={{
                  background: '#161b22',
                  border: '1px solid #30363d',
                  borderTop: 'none',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <p
                  style={{
                    fontSize: '13px',
                    color: '#8b949e',
                    textAlign: 'center',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  Escanea este QR con{' '}
                  <span style={{ color: '#58a6ff' }}>Google Authenticator</span>{' '}
                  antes de iniciar sesión.
                </p>
                <div
                  style={{
                    background: '#ffffff',
                    borderRadius: '8px',
                    padding: '12px',
                    border: '1px solid #30363d',
                  }}
                >
                  <img
                    src={qrUrl}
                    alt="Authenticator QR"
                    style={{
                      display: 'block',
                      width: '180px',
                      height: '180px',
                    }}
                  />
                </div>
              </div>
            )}
            {downloadableSecret && (
              <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <p className="text-yellow-400 font-semibold mb-2">
                  ⚠️ Guarda este secreto — sin él no hay recuperación
                </p>
                <p className="break-all text-white bg-[#0f111a] p-2 rounded mb-3 text-sm">
                  {downloadableSecret}
                </p>
                <button
                  onClick={handleDownloadSecret}
                  className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold px-3 py-2 rounded-lg"
                >
                  ⬇️ Descargar como archivo
                </button>
              </div>
            )}

            {/* Info text — solo si NO registered */}
            {!registered && (
              <div
                style={{
                  background: '#161b22',
                  border: '1px solid #30363d',
                  borderTop: 'none',
                  padding: '16px',
                }}
              >
                <p style={{ fontSize: '13px', color: '#8b949e', lineHeight: 1.7, margin: 0 }}>
                  Requiere <span style={{ color: '#58a6ff' }}>Google Authenticator</span> y un{' '}
                  <span style={{ color: '#58a6ff' }}>secreto de cliente</span>.
                </p>
              </div>
            )}

            {/* Timeline */}
            <div
              style={{
                background: '#161b22',
                border: '1px solid #30363d',
                borderTop: 'none',
                borderRadius: '0 0 10px 10px',
                padding: '0 16px 4px',
              }}
            >
              <div
                style={{
                  fontSize: '10px',
                  color: '#8b949e',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '12px 0 8px',
                }}
              >
                TIMELINE ·{' '}
                {registered ? 'Pasos siguientes' : 'Flujo de registro'}
              </div>
              {timelineSteps.map(({ num, label, desc, status, color }) => (
                <div
                  key={num}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: '#0d1117',
                    border: '1px solid #21262d',
                    borderRadius: '6px',
                    padding: '10px 12px',
                    marginBottom: '8px',
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: '10px',
                        color: '#8b949e',
                        letterSpacing: '0.06em',
                        marginBottom: '2px',
                      }}
                    >
                      {num}
                    </div>
                    <div
                      style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#e6edf3',
                      }}
                    >
                      {label}
                    </div>
                    <div
                      style={{
                        fontSize: '11px',
                        color: '#8b949e',
                        fontFamily: 'monospace',
                      }}
                    >
                      {desc}
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
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
