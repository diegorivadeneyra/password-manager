import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import { Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const {setMasterPassword} = useContext(AuthContext); 

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/login", {
        username,
        password,
      });
      
      localStorage.setItem(
        "user_id",
        response.data.user_id
      );

      localStorage.setItem(
        "username",
        response.data.username
      );

      setMasterPassword(password);
      navigate("/dashboard");
      setMessage(response.data.message);
      
      console.log(response.data);
    } catch (error) {
      setMessage(
        error.response?.data?.detail ||
          "Error al iniciar sesión"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-4xl">

        <div className="grid md:grid-cols-2 gap-8 items-center">

          <div>

            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              🔐 Password Vault
            </h1>

            <p className="text-gray-500 mb-6">
              Inicia sesión para acceder a tu bóveda segura
            </p>

            <form
              onSubmit={handleLogin}
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
                Iniciar sesión
              </button>
              <div className="mt-4 text-center">

                <Link
                  to="/register"
                  className="text-blue-600 hover:underline"
                >
                  ¿No tienes cuenta? Regístrate
                </Link>

              </div>
            </form>

            {message && (

              <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-lg">
                {message}
              </div>

            )}

          </div>

          <div className="text-center">

            <div className="text-8xl mb-4">
              🛡️
            </div>

            <h2 className="text-2xl font-semibold mb-3">
              Seguridad de Nivel 
            </h2>

            <p className="text-gray-600">
              Tus contraseñas se almacenan cifradas 
              y requieren autenticación mediante Google Authenticator
              para ser reveladas.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}
export default Login;