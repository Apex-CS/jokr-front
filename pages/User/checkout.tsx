import { TodosContext } from '@/components/contexts';
import { loadStripe } from '@stripe/stripe-js';
import React, { useContext } from 'react';
import { Card, Typography, CardMedia, CardContent, CardActionArea,Container, } from '@mui/material';
import { CartItemType } from '@/pages/index';

const stripePromise = loadStripe(
  'pk_test_51KCANHGz1RvjBCqBCgQwXY9h7TcmatIeXDbz67BmITIxQElhfoHHl1avDUGAgpGiRp7SPrwsap73ETmnx8gS3OGD00Xwbg2kjb'
);

function Checkout() {
  const { cartItems } = useContext(TodosContext);
  const handleClick = async (event: any) => {
    const { sessionId } = await fetch('/api/checkout/session', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ cartItems: cartItems }),
    }).then((res) => res.json());

    const stripe = await stripePromise;
    /* const { error } = */ await stripe?.redirectToCheckout({
      sessionId,
    });
  };

  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);


  return (
    <div>
      <Container>
      {cartItems?.map((item: CartItemType) => {
        return (
          <Card sx={{ marginLeft: '25rem', maxWidth: 345, marginBottom: '1rem' }} key={item.id}>
            <CardActionArea>
              <CardMedia component="img" height="140" image={item.photoUrl} alt="green iguana" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Title: {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Description: {item.description} <br />
                  Amount: {item.amount} <br />
                  Price: {item.price} <br />
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        );
      })}
      Total: ${calculateTotal(cartItems).toFixed(2)}
      <h1> Checkout</h1>
      {cartItems.length == 0 ? null : (
        <button className='Checkout' role="link" onClick={handleClick}>
          Checkout
        </button>
      )}

</Container>
    </div>
  );
}

export default Checkout;
