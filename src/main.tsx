// ✅ File: src/main.tsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router';

import App from './app';
import { routesSection } from './routes/sections';
import { ErrorBoundary } from './routes/components';
import { CartProvider } from './contexts/cart-context';
import { SnackbarProvider } from './components/snackbar/SnackbarProvider';

// ✅ Setup router với đúng layout
const router = createBrowserRouter([
  {
    Component: () => (
      <SnackbarProvider>
        <CartProvider>
          <App>
            <Outlet />
          </App>
        </CartProvider>
      </SnackbarProvider>
    ),
    errorElement: <ErrorBoundary />,
    children: routesSection,
  },
]);

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
