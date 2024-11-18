import { dbAPI } from '@services/axios';
import { useLayoutEffect } from 'react';

function useAuthInterceptor(token, setToken) {
  useLayoutEffect(() => {
    const interceptor = dbAPI.interceptors.request.use(
      config => {
        config.headers.Authorization = !config._retry && token
          ? `Bearer ${token}`
          : config.headers.Authorization
        ;
        return config;
      },
      error => Promise.reject(error)
    );

    return () => {
      dbAPI.interceptors.request.eject(interceptor);
    };
  }, [token]);

  useLayoutEffect(() => {
    const interceptor = dbAPI.interceptors.response.use(
      response => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response?.status === 403 &&
          error.response?.data.message === 'Access token inválido' &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;

          try {
            const response = await dbAPI.post('/auth/refresh-token');
            const newToken = response.data.token;
            
            setToken(newToken);
            originalRequest.headers.Authorization = `Bearer ${newToken}`;

            return dbAPI(originalRequest);
          } catch {
            setToken(null);
          }
        }
        
        return Promise.reject(error);
      }
    );

    return () => {
      dbAPI.interceptors.request.eject(interceptor);
    };
  }, []);
}

export default useAuthInterceptor;