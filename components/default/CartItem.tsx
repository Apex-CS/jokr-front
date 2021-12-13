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

  
function CartItem({ item }: Props) {
   /*  const [cartItems, setCartItems] = useState([] as CartItemType[]); */
    const { cartItems, addCart } = useContext(TodosContext);
    const { DeletedCart } = useContext(TodosContext);

    const handleAddFromCart = (item: CartItemType) => {
      addCart(
        item.id, 
        item.sku, 
        item.name, 
        item.description, 
        item.price, 
        item.is_active, 
        item.created_at, 
        item.updated_at, 
        item.stock,
        item.subcategory,
        item.photo_file_name, 
        item.amount,
      )
    }

    
    const handleRemoveFromCart = (id: number) => {
        /* setisDeleted(true,id); */
        

  DeletedCart(
    id, 
    item.sku, 
    item.name, 
    item.description, 
    item.price, 
    item.is_active, 
    item.created_at, 
    item.updated_at, 
    item.stock,
    item.subcategory,
    item.photo_file_name, 
    item.amount,
  )
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
                onClick={() => handleAddFromCart(item)} 

            >
              +
            </Button>
          </Box>
        </Box>
        &nbsp;&nbsp;
        <CardMedia
          component="img"
          sx={{ width: 150 }}
          image="https://mui.com/static/images/cards/paella.jpg"
          alt="Live from space album cover"
        />
      </Card>


    </>
  );
}

export default CartItem;


