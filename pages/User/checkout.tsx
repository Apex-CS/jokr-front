import { TodosContext } from '@/components/contexts';
import { loadStripe } from '@stripe/stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import {
  Card,
  Typography,
  CardMedia,
  CardContent,
  CardActionArea,
  Container,
  Button,
  TextField,
  Grid,
} from '@mui/material';
import { CartItemType } from '@/pages/index';
import data from './address.json';
import axios from 'axios';
import swal from 'sweetalert';
import Router from 'next/router';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

function refreshPage() {
  window.location.reload();
}

interface ShippingData {
  id: string;
  recipient_name: string;
  colonia: string;
  country: string;
  municipio: string;
  phone: string;
  postal_code: string;
  state: string;
  street1: string;
  street2: string;
}

export type FieldCategory = {
  id: number;
  recipient_name: string;
  colonia: string;
  country: string;
  municipio: string;
  phone: string;
  postal_code: string;
  state: string;
  street1: string;
  street2: string;
  categories: {
    id: number;
    name: string;
  };
};

const stripePromise = loadStripe(
  'pk_test_51KCANHGz1RvjBCqBCgQwXY9h7TcmatIeXDbz67BmITIxQElhfoHHl1avDUGAgpGiRp7SPrwsap73ETmnx8gS3OGD00Xwbg2kjb'
);

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

function Checkout() {
  const { callback, isCallback } = useContext(TodosContext);
  const [data, setData] = useState([]);
  const { IdUser } = useContext(TodosContext);
  const [adress, setAddress] = React.useState('');
  const [adressName, setAddressName] = React.useState('Recipient Name');
  const [adressPhone, setAddressPrhone] = React.useState('Phone Number');
  const [adressStreetA, setAddressStreetA] = React.useState('Street name 1');
  const [adressStreetB, setAddressStreetB] = React.useState('Street name 2');
  const [adressPostal, setAddressPostal] = React.useState('Postal/Zip Code');
  const [adressCity, setAddressCity] = React.useState('City');
  const [adressState, setAddressState] = React.useState('Province/State');
  const [adressCountry, setAddressCountry] = React.useState('Country');
  const handleChange = (event: SelectChangeEvent) => {
    setAddress(event.target.value as string);


    setAddressName(event.target.value as string);
  };

  useEffect(() => {
    isCallback(!callback);
    const AllAddressesFunction = async () => {
      try {
        const res = await axios.get(`/api/v1/addresses/${IdUser}`, {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        });
        if (res) {
          setData(res.data);
        }
        console.log(res.data);
      } catch (err) {
        swal({ icon: 'error', text: 'Session Expired', timer: 20000 }).then(function () {
          localStorage.removeItem('token');
          Router.push('/login');
        });
      }
    };
    AllAddressesFunction();
  }, []);

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
        <Typography variant="h3" gutterBottom align="center">
          Checkout Page
        </Typography>
        <div className="grid1">
          <Typography variant="h5" gutterBottom>
            Products
          </Typography>
          {cartItems?.map((item: CartItemType) => {
            return (
              <Card sx={{ maxWidth: 345, marginBottom: '1rem' }} key={item.id}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.photoUrl}
                    alt="green iguana"
                  />
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
          <Typography variant="h6" gutterBottom>
            Total: ${calculateTotal(cartItems).toFixed(2)}
          </Typography>

          {cartItems.length == 0 ? null : (
            <Button className="Checkout" role="link" variant="contained" onClick={handleClick}>
              Checkout
            </Button>
          )}
        </div>

        <div className="grid2">
          <Typography variant="h5" gutterBottom>
            Shipping Address
          </Typography>

          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Address</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={adress}
                label="Address"
                onChange={handleChange}
              >
                {data?.map((field: FieldCategory) => {
                  return (
                    <MenuItem key={field.id} value={field.id} >
                      {field.street1 + ' Col. ' + field.colonia}{' '}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>

          <form noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField label= {adressName} variant="outlined" disabled={true} fullWidth  />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label={adressPhone} variant="outlined" disabled={true} fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField label={adressStreetA} variant="outlined" disabled={true} fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField label={adressStreetB} variant="outlined" disabled={true} fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label={adressPostal} variant="outlined" disabled={true} fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label={adressCity} variant="outlined" disabled={true} fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label={adressState} variant="outlined" disabled={true}fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label={adressCountry} variant="outlined" disabled={true} fullWidth />
              </Grid>
            </Grid>
          </form>
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
