import { Link } from "react-router-dom";

function Home() {

  return (

    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}

      <nav className="bg-white shadow-sm">

        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <h1 className="text-2xl font-bold text-gray-800">
            🔐 Password Vault
          </h1>

          <div className="space-x-4">

            <Link
              to="/login"
              className="text-gray-600 hover:text-gray-900"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Sign Up
            </Link>

          </div>

        </div>

      </nav>

      {/* Hero */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Texto */}

          <div>

            <h1 className="text-5xl font-bold text-gray-900 mb-6">

              Mantén tus contraseñas
              seguras y accesibles

            </h1>

            <p className="text-xl text-gray-600 mb-8">

              Guarda, administra y protege tus credenciales
              con cifrado avanzado y autenticación multifactor.

            </p>

            <div className="flex gap-4">

              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
              >
                Crear Cuenta
              </Link>

              <Link
                to="/login"
                className="border border-gray-300 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium"
              >
                Iniciar Sesión
              </Link>

            </div>

          </div>

          {/* Mockup */}

          <div>

            <div className="bg-white rounded-2xl shadow-xl p-6">

              <div className="flex justify-between items-center mb-6">

                <h3 className="font-semibold text-lg">
                  Vault Dashboard
                </h3>

                <span className="text-green-600 font-medium">
                  Protegido
                </span>

              </div>

              <div className="space-y-4">

                <div className="border rounded-lg p-4">

                  <div className="font-medium">
                    GitHub
                  </div>

                  <div className="text-gray-500">
                    usuario@github.com
                  </div>

                </div>

                <div className="border rounded-lg p-4">

                  <div className="font-medium">
                    Gmail
                  </div>

                  <div className="text-gray-500">
                    usuario@gmail.com
                  </div>

                </div>

                <div className="border rounded-lg p-4">

                  <div className="font-medium">
                    Steam
                  </div>

                  <div className="text-gray-500">
                    usuario@steam.com
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>

  );

}

export default Home;