
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Fade from '@mui/material/Fade';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { fCurrency } from 'src/utils/format-number';

import { useCart } from 'src/contexts/cart-context';

import { Label } from 'src/components/label';
import { ColorPreview } from 'src/components/color-utils';
import { useGlobalSnackbar } from 'src/components/snackbar/SnackbarProvider';



// ----------------------------------------------------------------------

export type ProductItemProps = {
  id: string;
  name: string;
  price: number;
  status: string;
  coverUrl: string;
  colors: string[];
  priceSale: number | null;
};

export function ProductItem({ product }: { product: ProductItemProps }) {
  const { addToCart } = useCart();

  const { showSnackbar } = useGlobalSnackbar();
  const handleAddToCart = () => {
    addToCart(product);
    showSnackbar(`Đã thêm "${product.name}" vào giỏ hàng!`, 'success');
  };



  const renderStatus = (
    <Label
      variant="filled"
      color={
        (product.status === 'sale' && 'error') ||
        (product.status === 'new' && 'success') ||
        'info'
      }
      sx={{
        zIndex: 9,
        top: 16,
        left: 16,
        position: 'absolute',
        textTransform: 'uppercase',
      }}
    >
      {product.status}
    </Label>
  );

  const renderImg = (
    <Box
      component="img"
      alt={product.name}
      src={product.coverUrl}
      loading="lazy"
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
        transition: 'transform 0.3s ease',
      }}
    />
  );

  const renderPrice = (
    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
      {product.priceSale && (
        <Typography
          component="span"
          variant="body2"
          sx={{
            color: 'text.disabled',
            textDecoration: 'line-through',
            mr: 1,
          }}
        >
          {fCurrency(product.priceSale)}
        </Typography>
      )}
      <Box component="span" sx={{ color: product.priceSale ? 'success.main' : 'text.primary' }}>
        {fCurrency(product.price)}
      </Box>
    </Typography>
  );

  return (
    <Card
      sx={{
        transition: '0.3s',
        boxShadow: 3,
        '&:hover': {
          boxShadow: 6,
        },
      }}
    >
      <Box
        sx={{
          pt: '100%',
          position: 'relative',
          overflow: 'hidden',
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          '&:hover img': {
            transform: 'scale(1.05)',
          },
        }}
      >
        {product.status && renderStatus}
        {renderImg}
      </Box>

      <Stack spacing={1.5} sx={{ p: 2 }}>
        <Tooltip title={product.name}>
          <Link
            color="inherit"
            underline="hover"
            variant="subtitle2"
            noWrap
            sx={{ fontWeight: 600 }}
          >
            {product.name}
          </Link>
        </Tooltip>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <ColorPreview colors={product.colors} />
          {renderPrice}
        </Box>

        <Fade in timeout={400}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="Add to Cart">
              <IconButton
                color="primary"
                size="small"
                sx={{ border: '1px solid #ccc' }}
                onClick={handleAddToCart}
              >
                <ShoppingCartIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Button
              variant="contained"
              size="small"
              color="primary"
              fullWidth
              sx={{ fontWeight: 600, textTransform: 'none' }}
            >
              Buy Now
            </Button>
          </Box>
        </Fade>
      </Stack>
    </Card>
  );
}
