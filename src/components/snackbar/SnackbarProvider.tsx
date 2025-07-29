// ✅ File: src/components/snackbar/SnackbarProvider.tsx

import type { ReactNode } from 'react';
import type { AlertColor } from '@mui/material/Alert';

import { useState, useContext, createContext, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Slide from '@mui/material/Slide';
import InfoIcon from '@mui/icons-material/Info';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const DEFAULT_DURATION = 3000;
const MAX_SNACKS = 3;

interface SnackbarItem {
  key: number;
  message: string;
  severity: AlertColor;
}

interface SnackbarContextType {
  showSnackbar: (message: string, type?: AlertColor) => void;
}

const SnackbarContext = createContext<SnackbarContextType | null>(null);

export function useGlobalSnackbar() {
  const context = useContext(SnackbarContext);
  if (!context) throw new Error('useGlobalSnackbar must be used within SnackbarProvider');
  return context;
}

function SlideTransition(props: any) {
  return <Slide {...props} direction="up" />;
}

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const [snacks, setSnacks] = useState<SnackbarItem[]>([]);
  const [animateCart, setAnimateCart] = useState(false);

  const showSnackbar = (message: string, severity: AlertColor = 'success') => {
    const newSnack: SnackbarItem = {
      key: new Date().getTime() + Math.random(),
      message,
      severity,
    };

    setSnacks((prev) => {
      const next = [...prev, newSnack];
      return next.length > MAX_SNACKS ? next.slice(1) : next;
    });

    // Trigger cart animation when snackbar is shown
    if (severity === 'success') {
      setAnimateCart(true);
    }
  };

  useEffect(() => {
    if (animateCart) {
      const timer = setTimeout(() => setAnimateCart(false), 600);
      return () => clearTimeout(timer);
    }
  }, [animateCart]);

  useEffect(() => {
    const cartIcon = document.getElementById('cart-icon');
    if (cartIcon && animateCart) {
      cartIcon.classList.add('bounce-cart');

      const handleAnimationEnd = () => {
        cartIcon.classList.remove('bounce-cart');
        cartIcon.removeEventListener('animationend', handleAnimationEnd);
      };
      cartIcon.addEventListener('animationend', handleAnimationEnd);
    }
  }, [animateCart]);

  const handleClose = (key: number) => {
    setSnacks((prev) => prev.filter((snack) => snack.key !== key));
  };

  const gradientColors: Record<AlertColor, string> = {
    success: 'linear-gradient(90deg, #A1FFCE, #FAFFD1)',
    error: 'linear-gradient(90deg, #f44336, #ef5350)',
    warning: 'linear-gradient(90deg, #ff9800, #ffc107)',
    info: 'linear-gradient(90deg, #89F7FE, #66A6FF)',
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Stack
        spacing={1.2}
        sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1400 }}
      >
        {snacks.map((snack) => (
          <Snackbar
            key={snack.key}
            open
            TransitionComponent={SlideTransition}
            autoHideDuration={DEFAULT_DURATION}
            onClose={() => handleClose(snack.key)}
          >
            <Alert
              onClose={() => handleClose(snack.key)}
              severity={snack.severity}
              variant="standard"
              iconMapping={{
                success: <CheckCircleIcon fontSize="small" sx={{ color: '#fff' }} />,
                error: <ErrorIcon fontSize="small" sx={{ color: '#fff' }} />,
                warning: <WarningAmberIcon fontSize="small" sx={{ color: '#fff' }} />,
                info: <InfoIcon fontSize="small" sx={{ color: '#fff' }} />,
              }}
              sx={{
                minWidth: 360,
                maxWidth: '90vw',
                boxShadow: 6,
                borderRadius: '999px',
                color: '#fff',
                backgroundImage: gradientColors[snack.severity],
                backdropFilter: 'blur(6px) brightness(1.1)',
                fontWeight: 700,
                letterSpacing: 0.3,
                px: 3,
                py: 1.5,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                textShadow: '0 1px 2px rgba(0,0,0,0.25)',
              }}
            >
              {snack.message}
            </Alert>
          </Snackbar>
        ))}
      </Stack>
    </SnackbarContext.Provider>
  );
}
