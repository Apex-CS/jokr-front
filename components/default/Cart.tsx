import React from 'react';
import { CartItemType } from '@/pages/index';
import { Box, Card, LinearProgress, Typography } from '@mui/material';
import CartItem from '@/components/default/CartItem';

type Props = {
  cartItems: CartItemType[];
};

function Cart({ cartItems }: Props) {
  const calculateTotal = (items: CartItemType[]) =>
  items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  return (
    <>
    <Box sx={{ width: 300 ,marginTop:10}}>
    <Typography sx={{ fontSize: 25, marginLeft:1 }} color="text.secondary" >
    {cartItems.length === 0 ? <React.Fragment>
      No items in cart
    </React.Fragment> : null}
        </Typography>
        <div className="LineCart"></div>
        My Cart: 
     
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          /*     addToCart={addToCart}
          removeFromCart={removeFromCart} */
        />
      ))}
      <Typography sx={{ fontSize: 25, marginLeft:1 ,marginTop:5}} color="text.primary" >
      Total: ${calculateTotal(cartItems).toFixed(2)}
      </Typography>
    </Box>
    </>
  );
}

export default Cart;
