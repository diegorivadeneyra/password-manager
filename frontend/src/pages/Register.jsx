import { useState } from "react";
import api from "../services/api";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/register", {
        username,
        password,
        secret,
      });

      setMessage(response.data.message);

      setUsername("");
      setPassword("");
    } catch (error) {
      setMessage(
        error.response?.data?.detail ||
          "Error al registrar usuario"
      );
    }
  };

  return (
    <div>
      <h1>Registro</h1>

      <form onSubmit={handleRegister}>
        <div>
          <label>Usuario</label>
          <br />
          <input
            type="text"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />
        </div>

        <br />

        <div>
          <label>Contraseña</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />
        </div>
        <div>
          <label>Secreto Seguro</label>
          <br />
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
          />
        </div>

        <br />

        <button type="submit">
          Registrar
        </button>
      </form>

      <p>{message}</p>
    </div>
  );
}

export default Register;