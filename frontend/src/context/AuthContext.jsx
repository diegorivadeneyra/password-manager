import { createContext, useState } from "react";

export const AuthContext =
  createContext();

export function AuthProvider({
  children
}) {

  const [
    masterPassword,
    setMasterPassword
  ] = useState("");

  return (

    <AuthContext.Provider
      value={{
        masterPassword,
        setMasterPassword
      }}
    >

      {children}

    </AuthContext.Provider>

  );
}