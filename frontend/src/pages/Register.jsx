import { useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const [registered, setRegistered] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/register", {
        username,
        email,
        password,
      });

      setMessage(response.data.message);

      setUsername("");
      setPassword("");
      setEmail("");
      setQrUrl(
        `http://127.0.0.1:8000/totp/${response.data.user_id}/qr`
      );
      setRegistered(true);
    } catch (error) {
      setMessage(
        error.response?.data?.detail ||
          "Error al registrar usuario"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-5xl">

        <div className="text-center mb-6">

          <h1 className="text-3xl font-bold text-gray-800">
            🔐 Password Vault
          </h1>

          <p className="text-gray-500 mt-2">
            Crear una nueva cuenta
          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-8">

        <div>

          <form
            onSubmit={handleRegister}
            className="space-y-4"
          >

            <div>

              <label className="block mb-1 font-medium">
                Usuario
              </label>

              <input
                type="text"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                className="w-full border rounded-lg p-3"
              />

            </div>

            <div>

              <label className="block mb-1 font-medium">
                Correo
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full border rounded-lg p-3"
              />

            </div>

            <div>

              <label className="block mb-1 font-medium">
                Contraseña
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full border rounded-lg p-3"
              />

            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg"
            >
              Registrarse
            </button>
            <div className="mt-4 text-center">

              <Link
                to="/login"
                className="text-blue-600 hover:underline"
              >
                ¿Ya tienes cuenta? Inicia sesión
              </Link>

            </div>

          </form>

        </div>

        <div className="flex items-center justify-center">

          {registered ? (

            <div className="text-center">

              <h3 className="font-semibold text-lg mb-3">
                📱 Google Authenticator
              </h3>

              <img
                src={qrUrl}
                alt="Authenticator QR"
                className="mx-auto border rounded-lg"
              />

              <p className="mt-3 text-gray-600 text-sm">
                Escanea este QR antes de iniciar sesión.
              </p>

            </div>

          ) : (

            <div className="text-center text-gray-400">

              <div className="text-7xl mb-3">
                🔐
              </div>

              <p>
                El código QR aparecerá aquí
                después del registro.
              </p>

            </div>

          )}

        </div>

      </div>

        {message && (

          <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg">
            {message}
          </div>

        )}

      </div>

    </div>
  );
}

export default Register;