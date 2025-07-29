import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
// ✅ File: src/sections/product/product-cart-widget.tsx
import Badge from '@mui/material/Badge';

import { RouterLink } from 'src/routes/components';

import { useCart } from 'src/contexts/cart-context';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

// ✅ File: src/sections/product/product-cart-widget.tsx

export function CartIcon({ sx, ...other }: BoxProps) {
  const { totalItems } = useCart();

  return (
    <Box
      id="cart-icon"
      component={RouterLink}
      href="#"
      sx={[
        (theme) => ({
          right: 0,
          top: 112,
          zIndex: 999,
          display: 'flex',
          cursor: 'pointer',
          position: 'fixed',
          color: 'text.primary',
          borderTopLeftRadius: 16,
          borderBottomLeftRadius: 16,
          bgcolor: 'background.paper',
          padding: theme.spacing(1, 3, 1, 2),
          boxShadow: theme.vars.customShadows.dropdown,
          transition: theme.transitions.create(['opacity']),
          '&.bounce-cart': {
            animation: 'bounceCart 0.6s ease',
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Badge badgeContent={totalItems} color="error">
        <Iconify icon="solar:cart-3-bold" width={24} />
      </Badge>
    </Box>
  );
}
