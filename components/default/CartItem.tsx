import { CartItemType } from '@/pages/index';
import { Button, Box, Card, CardContent, Typography, CardMedia, IconButton } from '@mui/material';
import React, { useContext } from 'react';
import Link from 'next/link';
import { TodosContext } from '@/components/contexts/GlobalProvider';
type Props = {
  item: CartItemType;
};

function CartItem({ item }: Props) {
  const { addCart } = useContext(TodosContext);
  const { DeletedCart } = useContext(TodosContext);

  const handleAddFromCart = (item: CartItemType) => {
    addCart(
      item.id,
      item.sku,
      item.name,
      item.description,
      item.price,
      item.stock,
      item.subcategory,
      item.photoUrl,
      item.amount
    );
  };

  const handleRemoveFromCart = (id: number) => {
    DeletedCart(
      id,
      item.sku,
      item.name,
      item.description,
      item.price,
      item.stock,
      item.subcategory,
      item.photoUrl,
      item.amount
    );
  };

  return (
    <>
      <Card sx={{ display: 'flex', marginTop: '1rem' }}>
        <Box>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h6">
              {item.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              Price: ${item.price}
            </Typography>
            <Typography>Total: ${(item.amount * item.price).toFixed(2)}</Typography>
          </CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            <div className="fancy-button bg-gradient2">
              <Link href="#">
                <button onClick={() => handleRemoveFromCart(item.id)}>
                  <div className="PM">-</div>
                </button>
              </Link>
            </div>

            <IconButton>{item.amount}</IconButton>
            <div className="fancy-button bg-gradient2">
              <Link href="#">
                <button onClick={() => handleAddFromCart(item)}>
                  <div className="PM">+</div>
                </button>
              </Link>
            </div>
          </Box>
        </Box>
        &nbsp;&nbsp;
        <CardMedia
          component="img"
          sx={{ width: 150 }}
          image={item.photoUrl}
          alt="Live from space album cover"
        />
      </Card>
    </>
  );
}

export default CartItem;
