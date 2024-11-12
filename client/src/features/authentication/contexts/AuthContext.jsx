import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({
  auth: null,
  isAuthLoading: false,
  logIn: () => {},
  logOut: () => {},
});

export function AuthProvider({ children }) {
  const [ auth, setAuth ] = useState(null);
  const [ isAuthLoading, setIsAuthLoading ] = useState(true);
  
  function logIn(username, id) {
    const userData = { username, id };
    setAuth(userData);
    localStorage.setItem('auth', JSON.stringify(userData));
  }

  function logOut() {
    setAuth(null);
    sessionStorage.removeItem('cartItems');
    localStorage.removeItem('auth');
  }

  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
    }
    setIsAuthLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ auth, isAuthLoading, setIsAuthLoading, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;