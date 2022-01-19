import { TodosContext } from '@/components/contexts';
import { loadStripe } from '@stripe/stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import { Card, Typography, CardMedia, CardContent, CardActionArea,Container, Button, Grid, Tooltip, InputLabel, Box} from '@mui/material';
import { CartItemType } from '@/pages/index';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
type FieldTypes = {
  label: string;
  name: string;
  
};

function refreshPage() {
  window.location.reload();
}


interface ShippingData {
    id: string;
    client_name: string;
    colonia: string;
    country: string;
    municipio: string;
    phone: string;
    postal_code: string;
    state: string;
    street1: string;
    street2: string;
}



import data from './address.json'

import axios from 'axios';
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


<Formik
      initialValues={{
        client_name: '',
        colonia:'',
        country: '',
        municipio: '',
        phone: '',
        postal_code: '',
        state: '',
        street1: '',
        street2: ''



      }}
      validate={(values) => {
        const errors: Partial<ShippingData> = {};
        
        !values.client_name && (errors.client_name = 'Required Field');
        !values.colonia && (errors.colonia = 'Required Field');
        !values.country && (errors.country = 'Required Field');
        !values.municipio && (errors.municipio = 'Required Field');
        !values.phone && (errors.phone = 'Required Field');
        !values.postal_code && (errors.postal_code = 'Required Field');
        !values.state && (errors.state = 'Required Field');
        !values.street1 && (errors.street1 = 'Required Field');
        !values.street2 && (errors.street2 = 'Required Field');
        

        
      
        
       // Alphanumeric chars

    //    if (/[1234567890|<>]/g.test(values.client_name)) {
    //     errors.client_name = 'No numbers ';
    // }

    

    if(!/^[a-zA-Z\s]*$/g.test(values.client_name)){
      errors.client_name='Only letters';
    }

    if (values.client_name.length>20) {
             errors.client_name = 'Field is too long ';
         }

         ////////////////////////////////////////////////////////////
    if(!/^[A-Za-z]+$/g.test(values.colonia)){
          errors.colonia='Only letters';
        }
    
    if (values.colonia.length>20) {
                 errors.colonia = 'Field is too long ';
             }
/////////////////////////////////////////////////////////////////////////////////
             if(!/^[A-Za-z]+$/g.test(values.municipio)){
              errors.municipio='Only letters';
            }
        
            if (values.municipio.length>20) {
                     errors.client_name = 'Field is too long ';
                 }

  //////////////////////////////////////////////////////////////////////////////    
  
  
  if (!/[1234567890|<>]/g.test(values.phone)) {
        errors.phone = 'Only numbers ';
    }

                 
            
                if (values.phone.length>15) {
                         errors.phone = 'Field is too long ';
                     }

/////////////////////////////////////////////////////////////
if (!/[1234567890|<>]/g.test(values.postal_code)) {
  errors.postal_code = 'Only numbers ';
}

           
      
          if (values.postal_code.length>15) {
                   errors.postal_code = 'Field is too long ';
               }

//////////////////////////////////////////////////////////////////////

if (values.street1.length>20) {
         errors.street1 = 'Field is too long ';
     }

  ////////////////////////////////////////////////////////////

  if(!/^[A-Za-z]+$/g.test(values.street2)){
    errors.street2='Only letters';
  }

  if (values.street2.length>20) {
           errors.street2 = 'Field is too long ';
       }
//     if (values.name.length>10) {
//       errors.name = 'Field is too long ';
//   }

//   if (/[1234567890|<>]/g.test(values.lastName)) {
//     errors.lastName = 'No numbers ';
// }

// if (values.lastName.length>10) {
//   errors.lastName = 'Field is too long ';
// }


       
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(async () => {
          console.log(values);
          setSubmitting(false);
          await axios.post('/api/v1/users', { ...values });
          window.location.reload();
        }, 500);
      }}
    >
      {({ submitForm, isSubmitting }) => (

        
        
        <Grid
        
        /*           container
          item
          xs={12}
          sm={6}
          alignItems="center"
          direction="column"
          justify="space-between"
          style={{ padding: 10 }} */
        >
          <Grid
            
            style={{  }}
          >
 
            <Form style={{}}>
            <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
        <div>
              <InputLabel id="demo-simple-select-label"> Client Name</InputLabel>
              <Field component={TextField} name="client_name" type="client_name"  />
              </div>
              <br />
              <div>
              <InputLabel id="demo-simple-select-label"> Colonia</InputLabel>
              <Field component={TextField} name="colonia" type="colonia" />
              </div>
              <br />
              <div>
              <InputLabel id="demo-simple-select-label"> Country</InputLabel>
              <Field component={TextField} type="country" name="country"  />
              </div>
              <br />
              <div>
              <InputLabel id="demo-simple-select-label"> Municipio</InputLabel>
              <Field component={TextField} type="municipio" name="municipio"  />
              </div>
              <br />
              <div>
              <InputLabel id="demo-simple-select-label"> Phone</InputLabel>
              <Field component={TextField} type="number" name="phone"  />
              </div>
              <br />
              <div>
              <InputLabel id="demo-simple-select-label"> Postal Code</InputLabel>
              <Field component={TextField} type="number" name="postal_code"  />
              </div>
        </Grid>
        <Grid item xs={4}>
        <div>
              <InputLabel id="demo-simple-select-label"> State</InputLabel>
              <Field component={TextField} type="state" name="state"  />
              </div>
              <br />
              <div>
              <InputLabel id="demo-simple-select-label"> Street and Number</InputLabel>
              <Field component={TextField} type="street1" name="street1"  />
              </div>
              <br />
              <div>
              <InputLabel id="demo-simple-select-label"> Street 2</InputLabel>
              <Field component={TextField} type="street2" name="street2"  />
              </div>
              <br />
        </Grid>
       
      </Grid>
    </Box>
              
              
              
              
            
              
            </Form>
          </Grid>
        </Grid>
        
      )}
    </Formik>

     
        
          

          <div className="login100-more" />
        </div>
    
 

  

</Container>


    </div>
  );
}

export default Checkout;
