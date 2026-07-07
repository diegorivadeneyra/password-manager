import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// Generador de contraseñas seguro: usa crypto.getRandomValues (CSPRNG del navegador),
// NO Math.random(), que no es apto para fines criptográficos.
function generatePassword(length = 16) {
  const charset =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+';
  const values = new Uint32Array(length);
  crypto.getRandomValues(values);
  return Array.from(values, (v) => charset[v % charset.length]).join('');
}

function Dashboard() {
  const [credentials, setCredentials] = useState([]);
  const [service, setService] = useState('');
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [totpCode, setTotpCode] = useState('');
  const [revealedPasswords, setRevealedPasswords] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [clientSecretInput, setClientSecretInput] = useState('');
  // Estado para edición inline
  const [editingId, setEditingId] = useState(null);
  const [editService, setEditService] = useState('');
  const [editAccount, setEditAccount] = useState('');
  const [editPassword, setEditPassword] = useState('');

  const navigate = useNavigate();
  const { masterPassword} = useContext(AuthContext);

  const loadCredentials = async () => {
    try {
      const response = await api.get('/credentials');
      setCredentials(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddCredential = async (e) => {
    e.preventDefault();

    if (!clientSecretInput) {
      setMessage('⚠️ Debes ingresar tu secreto de cliente antes de guardar');
      return;
    }

    try {
      await api.post('/credentials', {
        service,
        account,
        password,
        master_password: masterPassword,
        client_secret: clientSecretInput ,
      });

      setMessage('✅ Credencial guardada correctamente');
      setService('');
      setAccount('');
      setPassword('');
      loadCredentials();
    } catch (error) {
      setMessage(error.response?.data?.detail || 'Error');
    }
  };

  const handleGenerateForNew = () => {
    setPassword(generatePassword(16));
  };

  const handleReveal = async (credentialId) => {
    if (!clientSecretInput) {
      alert('Debes ingresar tu secreto de cliente antes de revelar');
      return;
    }
    try {
      const response = await api.post('/credentials/decrypt', {
        credential_id: credentialId,
        code: totpCode,
        master_password: masterPassword,
        client_secret: clientSecretInput ,
      });

      setRevealedPasswords((prev) => ({
        ...prev,
        [credentialId]: response.data.password,
      }));

      setTotpCode('');

      setTimeout(() => {
        setRevealedPasswords((prev) => {
          const copy = { ...prev };
          delete copy[credentialId];
          return copy;
        });
      }, 5000);
    } catch (error) {
      alert(error.response?.data?.detail || 'Error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  const handleDelete = async (credentialId) => {
    try {
      await api.delete(`/credentials/${credentialId}`);
      loadCredentials();
    } catch (error) {
      console.error(error);
    }
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditService(item.service);
    setEditAccount(item.account);
    setEditPassword(''); // vacío: si no se llena, no se cambia la contraseña
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditService('');
    setEditAccount('');
    setEditPassword('');
  };

  const handleGenerateForEdit = () => {
    setEditPassword(generatePassword(16));
  };

  const handleSaveEdit = async (credentialId) => {
    if (!clientSecretInput) {
      alert('Debes ingresar tu secreto de cliente antes de editar');
      return;
    }
    try {
      await api.put(`/credentials/${credentialId}`, {
        service: editService,
        account: editAccount,
        password: editPassword || null,
        master_password: masterPassword,
        client_secret: clientSecretInput ,
      });

      setMessage('✅ Credencial actualizada');
      cancelEdit();
      loadCredentials();
    } catch (error) {
      alert(error.response?.data?.detail || 'Error al actualizar');
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('access_token');

    if (!userId || !token) {
      navigate('/login');
      return;
    }
    loadCredentials();
  }, []);

  const filteredCredentials = credentials.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.service.toLowerCase().includes(term) ||
      item.account.toLowerCase().includes(term)
    );
  });

  return (
    <div className="min-h-screen bg-[#0f111a] text-slate-300 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-[#1a1d27] border border-slate-800 rounded-xl shadow-lg p-6 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">🔐 Password Vault</h1>
            <p className="text-slate-400">
              Usuario: {localStorage.getItem('username')}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-transparent border border-red-500/50 hover:bg-red-500/10 text-red-400 px-4 py-2 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#1a1d27] border border-slate-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">
              ➕ Nueva Credencial
            </h2>

            <form onSubmit={handleAddCredential} className="space-y-4">
              <input
                type="text"
                placeholder="Servicio"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full bg-[#0f111a] border border-slate-700 text-white rounded-lg p-3 focus:outline-none focus:border-cyan-400"
              />

              <input
                type="text"
                placeholder="Cuenta"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                className="w-full bg-[#0f111a] border border-slate-700 text-white rounded-lg p-3 focus:outline-none focus:border-cyan-400"
              />

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 bg-[#0f111a] border border-slate-700 text-white rounded-lg p-3 focus:outline-none focus:border-cyan-400"
                />
                <button
                  type="button"
                  onClick={handleGenerateForNew}
                  title="Generar contraseña segura"
                  className="bg-transparent border border-cyan-500/50 hover:bg-cyan-500/10 text-cyan-400 px-3 py-2 rounded-lg transition-colors"
                >
                  🎲
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-bold p-3 rounded-lg transition-colors"
              >
                Guardar
              </button>
            </form>

            {message && (
              <p className="mt-4 p-3 bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg">
                {message}
              </p>
            )}
          </div>

          <div className="bg-[#1a1d27] border border-slate-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">
              🔑 Verificación
            </h2>

            <input
              type="text"
              placeholder="Código TOTP (6 dígitos)"
              value={totpCode}
              onChange={(e) => setTotpCode(e.target.value)}
              className="w-full bg-[#0f111a] border border-slate-700 text-white rounded-lg p-3 focus:outline-none focus:border-cyan-400"
            />
            <input
              type="text"
              placeholder="Secreto de cliente"
              value={clientSecretInput}
              onChange={(e) => setClientSecretInput(e.target.value)}
              className="w-full mt-3 bg-[#0f111a] border border-slate-700 text-white rounded-lg p-3 focus:outline-none focus:border-cyan-400"
            />

          </div>
        </div>

        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-white">
              📁 Servicios Guardados
            </h2>

            <input
              type="text"
              placeholder="🔍 Buscar por servicio o cuenta..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-72 bg-[#1a1d27] border border-slate-700 text-white rounded-lg p-2 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {filteredCredentials.map((item) => (
              <div
                key={item.id}
                className="bg-[#1a1d27] border border-slate-800 rounded-xl shadow-lg p-5"
              >
                {editingId === item.id ? (
                  // --- Modo edición ---
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editService}
                      onChange={(e) => setEditService(e.target.value)}
                      placeholder="Servicio"
                      className="w-full bg-[#0f111a] border border-slate-700 text-white rounded-lg p-2 focus:outline-none focus:border-cyan-400"
                    />
                    <input
                      type="text"
                      value={editAccount}
                      onChange={(e) => setEditAccount(e.target.value)}
                      placeholder="Cuenta"
                      className="w-full bg-[#0f111a] border border-slate-700 text-white rounded-lg p-2 focus:outline-none focus:border-cyan-400"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editPassword}
                        onChange={(e) => setEditPassword(e.target.value)}
                        placeholder="Nueva contraseña (opcional)"
                        className="flex-1 bg-[#0f111a] border border-slate-700 text-white rounded-lg p-2 focus:outline-none focus:border-cyan-400"
                      />
                      <button
                        type="button"
                        onClick={handleGenerateForEdit}
                        title="Generar contraseña segura"
                        className="bg-transparent border border-cyan-500/50 hover:bg-cyan-500/10 text-cyan-400 px-3 py-2 rounded-lg transition-colors"
                      >
                        🎲
                      </button>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSaveEdit(item.id)}
                        className="bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-bold px-3 py-2 rounded-lg transition-colors"
                      >
                        Guardar cambios
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-transparent border border-slate-600 hover:bg-slate-700/30 text-slate-300 px-3 py-2 rounded-lg transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  // --- Modo vista ---
                  <>
                    <h3 className="font-bold text-lg text-white">{item.service}</h3>
                    <p className="text-slate-400 mb-4">{item.account}</p>

                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={() => handleReveal(item.id)}
                        className="bg-transparent border border-cyan-500/50 hover:bg-cyan-500/10 text-cyan-400 px-3 py-2 rounded-lg transition-colors"
                      >
                        Revelar
                      </button>

                      <button
                        onClick={() => startEdit(item)}
                        className="bg-transparent border border-yellow-500/50 hover:bg-yellow-500/10 text-yellow-400 px-3 py-2 rounded-lg transition-colors"
                      >
                        Editar
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm('¿Eliminar esta credencial?')) {
                            handleDelete(item.id);
                          }
                        }}
                        className="bg-transparent border border-red-500/50 hover:bg-red-500/10 text-red-400 px-3 py-2 rounded-lg transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>

                    {revealedPasswords[item.id] && (
                      <div className="mt-4 p-3 bg-[#0f111a] border border-slate-700 rounded-lg">
                        <p className="font-semibold text-slate-300">Contraseña:</p>

                        <p className="break-all mb-3 text-white">
                          {revealedPasswords[item.id]}
                        </p>

                        <button
                          onClick={() =>
                            navigator.clipboard.writeText(
                              revealedPasswords[item.id],
                            )
                          }
                          className="bg-transparent border border-green-500/50 hover:bg-green-500/10 text-green-400 px-3 py-2 rounded-lg transition-colors flex items-center gap-2 w-fit"
                        >
                          📋 Copiar
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}

            {filteredCredentials.length === 0 && (
              <p className="text-slate-500 col-span-2 text-center py-8">
                No se encontraron credenciales.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;