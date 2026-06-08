import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {

  const [credentials, setCredentials] = useState([]);
  const [service, setService] = useState("");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [totpCode, setTotpCode] = useState("");
  const [revealedPasswords, setRevealedPasswords] = useState({});
  const navigate = useNavigate();
  const {masterPassword} = useContext(AuthContext);
  const userId = localStorage.getItem("user_id");

  const loadCredentials = async () => {

    try {

      const response =
        await api.get(
          `/credentials/${userId}`
        );

      setCredentials(
        response.data
      );

    } catch (error) {

      console.error(error);

    }
  };
  
  const handleAddCredential = async (e) => {

    e.preventDefault();

    try {

      await api.post("/credentials", {
        user_id: Number(userId),
        service,
        account,
        password,
        master_password:masterPassword
      });

      setMessage(
        "✅ Credencial guardada correctamente"
      );

      setService("");
      setAccount("");
      setPassword("");

      loadCredentials();

    } catch (error) {

      setMessage(
        error.response?.data?.detail ||
        "Error"
      );

    }
  };

  const handleReveal = async (credentialId) => {

    try {

      const response = await api.post(
        "/credentials/decrypt",
        {
          user_id: Number(userId),
          credential_id: credentialId,
          code: totpCode,
          master_password: masterPassword
        }
      );

      setRevealedPasswords((prev) => ({
        ...prev,
        [credentialId]: response.data.password
      }));

      setTotpCode("");

      setTimeout(() => {

        setRevealedPasswords(
          (prev) => {

            const copy = {
              ...prev
            };

            delete copy[
              credentialId
            ];

            return copy;
          }
        );

      }, 5000);

    } catch (error) {

      alert(
        error.response?.data?.detail ||
        "Error"
      );

    }
  };

  const handleLogout = () => {

    localStorage.removeItem(
      "user_id"
    );

    localStorage.removeItem(
      "username"
    );

    navigate("/login");
  };

  const handleDelete = async (
    credentialId
  ) => {

    try {

      await api.delete(
        `/credentials/${credentialId}`
      );

      loadCredentials();

    } catch (error) {

      console.error(error);

    }
  };

  useEffect(() => {

    const userId =
      localStorage.getItem(
        "user_id"
      );

    if (!userId) {

      navigate("/login");

      return;

    }
    loadCredentials();

  }, []);
  console.log(
    "MASTER:",
    masterPassword,
    "LONGITUD:",
    masterPassword?.length
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      
      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-xl shadow-md p-6 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              🔐 Password Vault
            </h1>
            <p className="text-gray-500">
              Usuario: {localStorage.getItem("username")}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white rounded-xl shadow-md p-6">

            <h2 className="text-xl font-semibold mb-4">
              ➕ Nueva Credencial
            </h2>

            <form
              onSubmit={handleAddCredential}
              className="space-y-4"
            >

              <input
                type="text"
                placeholder="Servicio"
                value={service}
                onChange={(e) =>
                  setService(e.target.value)
                }
                className="w-full border rounded-lg p-3"
              />

              <input
                type="text"
                placeholder="Cuenta"
                value={account}
                onChange={(e) =>
                  setAccount(e.target.value)
                }
                className="w-full border rounded-lg p-3"
              />

              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full border rounded-lg p-3"
              />

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg"
              >
                Guardar
              </button>

            </form>

            {message && (
              <p className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg">
                {message}
              </p>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">

            <h2 className="text-xl font-semibold mb-4">
              🔑 Google Authenticator
            </h2>

            <input
              type="text"
              placeholder="Código de 6 dígitos"
              value={totpCode}
              onChange={(e) =>
                setTotpCode(e.target.value)
              }
              className="w-full border rounded-lg p-3"
            />

            <p className="mt-3 text-sm text-gray-500">
              Ingresa el código actual de Google
              Authenticator para revelar
              contraseñas.
            </p>

          </div>

        </div>

        <div className="mt-8">

          <h2 className="text-2xl font-semibold mb-4">
            📁 Servicios Guardados
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            {credentials.map((item) => (

              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md p-5"
              >

                <h3 className="font-bold text-lg">
                  {item.service}
                </h3>

                <p className="text-gray-500 mb-4">
                  {item.account}
                </p>

                <div className="flex gap-2">

                  <button
                    onClick={() =>
                      handleReveal(item.id)
                    }
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg"
                  >
                    Revelar
                  </button>

                  <button
                    onClick={() => {

                      if (
                        window.confirm(
                          "¿Eliminar esta credencial?"
                        )
                      ) {

                        handleDelete(item.id);

                      }

                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg"
                  >
                    Eliminar
                  </button>

                </div>

                {revealedPasswords[item.id] && (

                  <div className="mt-4 p-3 bg-green-100 rounded-lg">

                    <p className="font-semibold">
                      Contraseña:
                    </p>

                    <p className="break-all mb-3">
                      {
                        revealedPasswords[
                          item.id
                        ]
                      }
                    </p>

                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(
                          revealedPasswords[item.id]
                        )
                      }
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg"
                    >
                      📋 Copiar
                    </button>

                  </div>

                )}

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;