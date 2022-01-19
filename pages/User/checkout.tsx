import { TodosContext } from '@/components/contexts';
import { loadStripe } from '@stripe/stripe-js';
import React, { useContext } from 'react';
import { Card, Typography, CardMedia, CardContent, CardActionArea,Container, Button, TextField} from '@mui/material';
import { CartItemType } from '@/pages/index';



import data from './address.json'
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
    <div >
      <Container>

        <div className='grid1'>
      {cartItems?.map((item: CartItemType) => {
        return (
          <Card sx={{  maxWidth: 345, marginBottom: '1rem' }} key={item.id}>
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
        <Button className='Checkout' role="link" onClick={handleClick}>
          Checkout
        </Button>
      )}




      </div>
      
      <div className="grid2">


AUI VA EL FORMULARIO solo dale una buena vista



     
        
          <form className="login100-form " /* onSubmit={handleSubmit} */>


            <div className="container">
              <div className="top-header">
                <h3>Welcome back</h3>
                <p>Enter your credentials to access your account</p>
              </div>

        
              <TextField
               /*  error={state.isError} */
                fullWidth
                id="username"
                type="email"
                label="Username"
                placeholder="Username"
                margin="normal"
              /*   onChange={handleUsernameChange} */
                size="small"
                autoComplete="on"
              />

              <TextField
               /*  error={state.isError} */
                fullWidth
                id="password"
                type="EXAMPLE"
                label="EXAMPLE"
                placeholder="Ubicaicon"
                margin="normal"
/*                 helperText={state.helperText}
                onChange={handlePasswordChange} */
                size="small"
                autoComplete="on"
              />

     

              <div className="btn">
                {/* <button  >Sign in</button> */}
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
    /*               onClick={handleLogin}
                  disabled={state.isButtonDisabled} */
                >
                 Sign in
                </Button>
              </div>
            </div>
            <p className="last">
            EXA,MPLE
            </p>
          </form>

          <div className="login100-more" />
        </div>
    
 

  

</Container>


    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default Checkout;
