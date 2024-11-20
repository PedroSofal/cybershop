import Home from '@pages/Home';
import ProductPage from '@showcase/pages/ProductPage';
import Shopping from '@showcase/pages/Shopping';
import ShoppingCart from '@components/ui/ShoppingCart';
import Register from '@authentication/pages/Register';
import Login from '@authentication/pages/Login';
import Layout from '@layouts/Layout';
import Checkout from '@checkout/pages/Checkout';
import End from '@pages/End';
import ProfilePage from '@user-profile/pages/ProfilePage';
import RequireAuth from '@authentication/components/RequireAuth';
import MyOrders from '@user-profile/pages/MyOrders';
import Settings from '@user-profile/pages/Settings';
import MyAddresses from '@user-profile/pages/MyAddresses';
import MyCards from '@user-profile/pages/MyCards';
import MyPersonalInfos from '@user-profile/pages/MyPersonalInfos';
import OrderDetails from '@user-profile/pages/OrderDetails';
import SearchResults from '@search/pages/SearchResults';
import Error404 from '@error-handling/pages/Error404';
import Error403 from '@error-handling/pages/Error403';

import { CheckoutProvider } from '@checkout/contexts/CheckoutContext';

const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error404 />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/categorias/:category',
        element: <Shopping />
      },
      {
        path: '/busca/:searchTerm',
        element: <SearchResults />
      },
      {
        path: '/produto/:id',
        element: <ProductPage />
      },
      {
        path: '/meu-carrinho',
        element: <ShoppingCart />
      }
    ]
  },
  {
    element: <RequireAuth />,
    children: [
      {
        element: <Layout min />,
        children: [
          {
            path: '/checkout',
            element: <CheckoutProvider><Checkout /></CheckoutProvider>
          },
          {
            path: '/obrigado',
            element: <End />
          },
          {
            path: '/perfil/pedidos/:id',
            element: <OrderDetails />
          },
        ]
      },
      {
        element: <Layout />,
        children: [
          {
            path: '/perfil',
            element: <ProfilePage />,
            children: [
              {
                path: '/perfil/informacoes-pessoais',
                element: <MyPersonalInfos />
              },
              {
                path: '/perfil/enderecos',
                element: <MyAddresses />
              },
              {
                path: '/perfil/cartoes',
                element: <MyCards />
              },
              {
                path: '/perfil/pedidos',
                element: <MyOrders />
              },
              {
                path: '/perfil/configuracoes',
                element: <Settings />
              },
            ]
          }
        ]
      },
    ]
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/404',
    element: <Error404 />
  },
  {
    path: '/403',
    element: <Error403 />
  }
];

export default routes;