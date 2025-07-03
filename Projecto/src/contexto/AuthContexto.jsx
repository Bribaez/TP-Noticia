import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
    // Podés guardar en localStorage si querés persistencia:
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Si querés recuperar el usuario al recargar la página, usá useEffect:
  // import { useEffect } from "react";
  // useEffect(() => {
  //   const savedUser = localStorage.getItem("user");
  //   if (savedUser) setUser(JSON.parse(savedUser));
  // }, []);

  const IsLogged = !!user;

  return (
    <AuthContext.Provider value={{ user, IsLogged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
