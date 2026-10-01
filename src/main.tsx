import './styles/index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { StoreProvider } from './state/store';
import { Layout } from './site/Layout';
import { HomeScreen } from './screens/HomeScreen';
import { ShopScreen } from './screens/ShopScreen';
import { FieldScreen } from './screens/FieldScreen';
import { PickScreen } from './screens/PickScreen';
import { FarmShopScreen } from './screens/FarmShopScreen';
import { CartScreen } from './screens/CartScreen';
import { CheckoutScreen } from './screens/CheckoutScreen';
import { ConfirmScreen } from './screens/ConfirmScreen';
import { NotFoundScreen } from './screens/NotFoundScreen';

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        { path: '/', element: <HomeScreen /> },
        { path: '/shop', element: <ShopScreen /> },
        { path: '/field', element: <FieldScreen /> },
        { path: '/pick', element: <PickScreen /> },
        { path: '/farm-shop', element: <FarmShopScreen /> },
        { path: '/basket', element: <CartScreen /> },
        { path: '/checkout', element: <CheckoutScreen /> },
        { path: '/order/:id', element: <ConfirmScreen /> },
        { path: '*', element: <NotFoundScreen /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL.replace(/\/$/, '') || '/' },
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  </StrictMode>,
);
