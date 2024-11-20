import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CartProvider } from '@shopping-cart/contexts/CartContext';
import { ShippingProvider } from '@contexts/ShippingContext';
import { AuthProvider } from '@authentication/contexts/AuthContext';
import ErrorPage from '@error-handling/pages/ErrorPage';

import routes from './routes';
import useTheme from '@hooks/useTheme';
import Loader from '@components/ui/Loader';
import ErrorBoundary from '@error-handling/components/ErrorBoundary';

const router = createBrowserRouter(routes);

function App() {
  const { isLoading } = useTheme();

  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      {isLoading
        ? <div className="fullscreen-centered"><Loader /></div>
        : (
          <AuthProvider>
          <CartProvider>
          <ShippingProvider>
            <RouterProvider router={router} />
          </ShippingProvider>
          </CartProvider>
          </AuthProvider>
        )
      }
    </ErrorBoundary>
  );
}

export default App;