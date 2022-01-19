import React from 'react';
import { CartItemType } from '@/pages/index';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import CartItem from '@/components/default/CartItem';
import Link from 'next/link';

type Props = {
  cartItems: CartItemType[];
};

function Cart({ cartItems }: Props) {
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  return (
    <>
      <Box sx={{ width: 300, marginTop: 9 }}>
        <Typography sx={{ fontSize: 25, marginLeft: 1 }} color="text.secondary">
          {cartItems.length === 0 ? <React.Fragment>Empty cart</React.Fragment> : null}
        </Typography>
        <div className="LineCart"></div>
        <div className="barCart">My Cart</div>
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
        <Typography
          sx={{ fontSize: 25, marginLeft: 1, marginTop: 5, marginBottom: 2 }}
          color="text.primary"
        >
          Total: ${calculateTotal(cartItems).toFixed(2)}
        </Typography>
        {cartItems.length === 0 ? null : (
          <Tooltip title="Complete purchase" placement="top">
            <div className="wrapper ">
              <div className="fancy-button bg-gradient1">
                <Link href="/User/checkout">
                  <button>
                    <i>Purchase</i>
                  </button>
                </Link>
              </div>
            </div>
          </Tooltip>
        )}
      </Box>
    </>
  );
}

export default Cart;
