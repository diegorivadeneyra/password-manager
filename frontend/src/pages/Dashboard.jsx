import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Dashboard() {

  const [credentials, setCredentials] = useState([]);
  const [service, setService] = useState("");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [message, setMessage] = useState("");
  const [revealSecret, setRevealSecret] = useState("");
  const [revealedPasswords, setRevealedPasswords] = useState({});
  const navigate = useNavigate();

  const userId = localStorage.getItem(
    "user_id"
  );

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
        secret

      });

      setMessage(
        "Credencial guardada"
      );

      setService("");
      setAccount("");
      setPassword("");
      setSecret("");

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
        `/credentials/${credentialId}/decrypt`,
        {
          secret: revealSecret
        }
      );

      setRevealedPasswords((prev) => ({
        ...prev,
        [credentialId]: response.data.password
      }));

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

    return (
    <div>

      <h1>
        Password Vault
      </h1>

      <h3>
        Usuario:
        {" "}
        {localStorage.getItem(
          "username"
        )}
        <button onClick={handleLogout}>
          Logout
        </button>
      </h3>

      
        
      <h2>
        Nueva Credencial
      </h2>

      <form onSubmit={handleAddCredential}>

        <div>

          <input
            type="text"
            placeholder="Servicio"
            value={service}
            onChange={(e) =>
              setService(e.target.value)
            }
          />

        </div>

        <br />

        <div>

          <input
            type="text"
            placeholder="Cuenta"
            value={account}
            onChange={(e) =>
              setAccount(e.target.value)
            }
          />

        </div>

        <br />

        <div>

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

        </div>

        <br />

        <div>

          <input
            type="password"
            placeholder="Secreto Seguro"
            value={secret}
            onChange={(e) =>
              setSecret(e.target.value)
            }
          />

        </div>

        <br />

        <button type="submit">
          Guardar
        </button>

      </form>

      <p>{message}</p>

      <hr />
      <h2>
        Revelar Contraseñas
      </h2>

      <input
        type="password"
        placeholder="Secreto Seguro"
        value={revealSecret}
        onChange={(e) =>
          setRevealSecret(e.target.value)
        }
      />

      <br />
      <br />

      <hr />
      <h2>
        Servicios guardados
      </h2>

      <ul>

        {credentials.map((item) => (

          <li key={item.id}>

            <strong>
              {item.service}
            </strong>

            {" - "}

            {item.account}

            <br />

            <button
              onClick={() =>
                handleReveal(item.id)
              }
            >
              Revelar
            </button>
            <button
              onClick={() =>
                handleDelete(item.id)
              }
            >
              Eliminar
            </button>
              
            {revealedPasswords[item.id] && (

              <p>

                Contraseña:

                {" "}

                {
                  revealedPasswords[
                    item.id
                  ]
                }

              </p>

            )}

          </li>

        ))}

      </ul>

    </div>
  );

}

export default Dashboard;