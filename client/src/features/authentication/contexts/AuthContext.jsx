import { createContext, useContext, useEffect, useState } from 'react';
import useAuthInterceptor from '@hooks/useAuthInterceptor';
import CartContext from '@shopping-cart/contexts/CartContext';
import { dbAPI } from '@services/axios';
import useFetchData from '@hooks/useFetchData';

const AuthContext = createContext({
  token: null,
  isAuthLoading: false,
  logIn: () => {},
  logOut: () => {},
  deleteAccount: () => {},
});

export function AuthProvider({ children }) {
  const { clearCart } = useContext(CartContext);
  const [ token, setToken ] = useState();
  const [ username, setUsername ] = useState();
  const [ isAuthLoading, setIsAuthLoading ] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await dbAPI.post('/auth/refresh-token');
        setToken(response.data.token);
      } catch {
        setToken(null);
      } finally {
        setIsAuthLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await dbAPI.get('/username');
        setUsername(response.data.username);
      } catch {
        setUsername(null);
      }
    })();
  }, [token]);

  useAuthInterceptor(token, setToken);

  async function logIn(username, password) {
    try {
      const response = await dbAPI.post('/auth/login', { username, password });
      setToken(response.data.token);
    } catch (error) {
      console.error('Erro ao fazer login', error);
    }
  }

  async function logOut() {
    try {
      await dbAPI.post('/auth/logout');
      setToken(null);
      clearCart();
    } catch (error) {
      console.error('Erro ao fazer logout', error);
    }
  }

  async function deleteAccount() {
    try {
      await dbAPI.delete('/auth/delete-account');
      setToken(null);
      clearCart();
      // navigate('/login');
    } catch (err) {
      console.error('Erro ao excluir conta', err);
      setError(true);
    }
  }

  return (
    <AuthContext.Provider value={{
      token,
      isAuthLoading,
      setIsAuthLoading,
      logIn,
      logOut,
      deleteAccount,
      username
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;