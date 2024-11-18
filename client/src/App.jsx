import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CartProvider } from '@shopping-cart/contexts/CartContext';
import { ShippingProvider } from '@contexts/ShippingContext';
import { AuthProvider } from '@authentication/contexts/AuthContext';

import routes from './routes';
import useTheme from '@hooks/useTheme';
import Loader from '@components/ui/Loader';

const router = createBrowserRouter(routes);

function App() {
  const { isLoading } = useTheme();

  return (
    isLoading
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
  );
}

export default App;