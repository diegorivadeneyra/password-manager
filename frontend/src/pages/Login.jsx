import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setMasterPassword } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', { username, password });
      localStorage.setItem('user_id', response.data.user_id);
      localStorage.setItem('username', response.data.username);
      setMasterPassword(password);
      navigate('/dashboard');
      setMessage(response.data.message);
      console.log(response.data);
    } catch (error) {
      setMessage(error.response?.data?.detail || 'Error al iniciar sesión');
    }
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
              Iniciar Sesión
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
              to="/register"
              style={{
                marginLeft: '12px',
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
            {/* Panel header */}
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
                AUTENTICACIÓN
              </div>
              <div
                style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#e6edf3',
                  marginTop: '2px',
                }}
              >
                Acceso a bóveda segura
              </div>
            </div>

            {/* Form body */}
            <div
              style={{
                background: '#161b22',
                border: '1px solid #30363d',
                borderTop: 'none',
                borderRadius: '0 0 10px 10px',
                padding: '20px 16px',
              }}
            >
              {/* Badge de estado */}
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
                    background: '#3fb950',
                    display: 'inline-block',
                  }}
                ></span>
                <span
                  style={{
                    fontSize: '12px',
                    color: '#3fb950',
                    fontWeight: 600,
                  }}
                >
                  Conexión cifrada · TLS 1.3
                </span>
              </div>

              <form
                onSubmit={handleLogin}
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
                  <label style={labelStyle}>Contraseña maestra</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{ ...inputStyle, paddingRight: '42px' }}
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
                      }}
                    >
                      {showPassword ? 'ocultar' : 'ver'}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  style={{
                    background: '#238636',
                    color: '#fff',
                    border: '1px solid #2ea043',
                    borderRadius: '6px',
                    padding: '10px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    marginTop: '4px',
                    fontFamily: 'inherit',
                  }}
                >
                  Iniciar sesión
                </button>

                <div style={{ textAlign: 'center' }}>
                  <Link
                    to="/register"
                    style={{
                      fontSize: '13px',
                      color: '#58a6ff',
                      textDecoration: 'none',
                    }}
                  >
                    ¿No tienes cuenta? Regístrate
                  </Link>
                </div>
              </form>

              {message && (
                <div
                  style={{
                    marginTop: '14px',
                    padding: '10px 14px',
                    background: 'rgba(248,81,73,0.1)',
                    border: '1px solid rgba(248,81,73,0.4)',
                    borderRadius: '6px',
                    fontSize: '13px',
                    color: '#f85149',
                    fontFamily: 'monospace',
                  }}
                >
                  ⚠ {message}
                </div>
              )}
            </div>
          </div>

          {/* Right: Info panel */}
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            {/* Security specs panel */}
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
                EXPLICACIÓN
              </div>
              <div
                style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#e6edf3',
                  marginTop: '2px',
                }}
              >
                Inspector de seguridad
              </div>
            </div>

            <div
              style={{
                background: '#161b22',
                border: '1px solid #30363d',
                borderTop: 'none',
                padding: '16px',
              }}
            >
              <p
                style={{
                  fontSize: '13px',
                  color: '#8b949e',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                Tus contraseñas se almacenan{' '}
                <span style={{ color: '#58a6ff' }}>cifradas con AES-256</span> y
                requieren autenticación mediante{' '}
                <span style={{ color: '#58a6ff' }}>Google Authenticator</span>{' '}
                para ser reveladas.
              </p>
            </div>

            {/* Steps / Timeline */}
            <div
              style={{
                background: '#161b22',
                border: '1px solid #30363d',
                borderTop: 'none',
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
                TIMELINE · Flujo de acceso
              </div>
              {[
                {
                  num: '#01',
                  label: 'autenticar',
                  desc: 'verifica credenciales',
                  status: 'done',
                  color: '#3fb950',
                },
                {
                  num: '#02',
                  label: 'derivar clave',
                  desc: 'PBKDF2 · 600k iter.',
                  status: 'active',
                  color: '#58a6ff',
                },
                {
                  num: '#03',
                  label: 'descifrar',
                  desc: 'AES-256-GCM',
                  status: 'next',
                  color: '#8b949e',
                },
                {
                  num: '#04',
                  label: 'abrir bóveda',
                  desc: 'acceso garantizado',
                  status: 'next',
                  color: '#8b949e',
                },
              ].map(({ num, label, desc, status, color }) => (
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
                    }}
                  >
                    {status}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom: crypto params */}
            <div
              style={{
                background: '#161b22',
                border: '1px solid #30363d',
                borderTop: 'none',
                borderRadius: '0 0 10px 10px',
                padding: '12px 16px',
                display: 'flex',
                gap: '12px',
              }}
            >
              {[
                { label: 'CIFRADO', value: 'AES-256-GCM' },
                { label: 'KDF', value: 'PBKDF2' },
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
      </div>
    </div>
  );
}

export default Login;
