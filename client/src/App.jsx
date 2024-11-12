import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CartProvider } from '@shopping-cart/contexts/CartContext';
import { ShippingProvider } from '@contexts/ShippingContext';
import { AuthProvider } from '@authentication/contexts/AuthContext';
import routes from './routes';

const router = createBrowserRouter(routes);

function App() {
  return(
    <AuthProvider>
    <CartProvider>
    <ShippingProvider>
      <RouterProvider router={router} />
    </ShippingProvider>
    </CartProvider>
    </AuthProvider>
  );
}

export default App;