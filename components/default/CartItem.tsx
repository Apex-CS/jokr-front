import { CartItemType } from '@/pages/index';
import { Button, Box, Card, CardContent, Typography, CardMedia, IconButton } from '@mui/material';
import React, { useContext, useState } from 'react';
import Image from 'next/image';

import { TodosContext } from '@/components/contexts/GlobalProvider';
type Props = {
  item: CartItemType;
  /*     addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void; */
};

/* setCartItems((prev) =>
prev.reduce((ack, item) => {
  if (item.id === id) {
    if (item.amount === 1) return ack;
    return [...ack, { ...item, amount: item.amount - 1 }];
  } else {
    return [...ack, item];
  }
}, [] as CartItemType[])
); */
  
function CartItem({ item }: Props) {
   /*  const [cartItems, setCartItems] = useState([] as CartItemType[]); */
    const { cartItems, addCart } = useContext(TodosContext);

    const handleRemoveFromCart = (id: number) => {
        console.log(id)
      console.log(cartItems)
      /* addCart(id,'ds','sds','hhg',0,0,'ghg','hj',0,'hjh',0) */
      };
      
  return (
    <>
      <Card sx={{ display: 'flex', marginTop: '1rem' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
            <Button
              size="small"
              disableElevation
              variant="contained"
              onClick={() => handleRemoveFromCart(item.id)} 
            >
              -
            </Button>
            <IconButton>{item.amount}</IconButton>
            <Button
              size="small"
              disableElevation
              variant="contained"
              /*  onClick={() => addToCart(item)} */
            >
              +
            </Button>
          </Box>
        </Box>
        &nbsp;&nbsp;
        <CardMedia
          component="img"
          sx={{ width: 150 }}
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB_SJ_yCbswI_pLjJUZvvfKUL0lRl_L1x64pacYw5WVx1JFE0Tle5zVya7mJ-PSlLgCSI&usqp=CAU"
          alt="Live from space album cover"
        />
      </Card>


    </>
  );
}

export default CartItem;


