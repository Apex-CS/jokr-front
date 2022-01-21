import { TodosContext } from '@/components/contexts';
import { loadStripe } from '@stripe/stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import { Card, Typography, CardMedia, CardContent, CardActionArea,Container, Button, Grid, Tooltip, InputLabel, Box, MenuItem, SelectChangeEvent, Select} from '@mui/material';
import { CartItemType } from '@/pages/index';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import swal from 'sweetalert';
import Router from 'next/router';
type FieldTypes = {
  name: string | number;
  type: string | number;
  label: string;
  placeholder: string;
  value: string | number;
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

export type FieldCategory = {
  id: number;
  client_name: string;
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



import data from './address.json'

import axios from 'axios';
const stripePromise = loadStripe(
  'pk_test_51KCANHGz1RvjBCqBCgQwXY9h7TcmatIeXDbz67BmITIxQElhfoHHl1avDUGAgpGiRp7SPrwsap73ETmnx8gS3OGD00Xwbg2kjb'
);

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

function Checkout() {
  const a=1;
  const { Token } = useContext(TodosContext);
  const { open, isOpen } = useContext(TodosContext);
  const { callback, isCallback } = useContext(TodosContext);
  const { isSuccess } = useContext(TodosContext);
  const { isLoader } = useContext(TodosContext);

  const [data, setData] = useState([]);

  const [category, setCategory] = useState<string>('');
  const [subCategory, setSubCategory] = useState<string>('');
  const [listSub, setListSub] = useState([]);
  const [disableSub, SetdisableSub] = useState(false);

  const handleChangeCategory = async (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
    setSubCategory('');
  };

  const handleChangeSubCategory = async (event: SelectChangeEvent) => {
    setSubCategory(event.target.value as string);
  };

  /* const { data } = useSWR('/api/v1/categories', fetcher,); */

  /* 'Bearer '+localStorage.getItem('token') */
  /* headers: {Authorization:  'Bearer '+localStorage.getItem('token')?.toString()!} */
 
  useEffect(() => {
    isCallback(!callback);
    const AllCategoriesFunction = async () => {
      try {
        const res = await axios.get(`/api/v1/addresses/${1}`, {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        });
        if(res){  setData(res.data);}
        console.log(res.data);
       
      } catch (err) {
        swal({ icon: 'error', text: 'Session Expired', timer: 2000 }).then(function () {
          localStorage.removeItem('token');
          Router.push('/login');
        });
      }
    };
    AllCategoriesFunction();
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
        client_name: 'Many',
        colonia:'calma',
        country: 'Polonia',
        municipio: 'Wola',
        phone: '3312224415',
        postal_code: '45070',
        state: 'Varsovia',
        street1: 'oro',
        street2: 'diamante'



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
        
              
              <Field label={"Client Name"} component={TextField} name="client_name" type="client_name"  inputProps={
					{ readOnly: true, }
				}/>
              </div>
              <br />
              <div>
              {data?.map((field: FieldCategory) => {
                
                if(field.id==a){
                return(
                  
                  <Field 
                  label={"Colonia"}
                  key={field.id}
                  value={field.colonia}
                  component={TextField} type="colonia" name="colonia"inputProps={
                    { readOnly: true, }
                  } />
                )
                  }
                
                    })}
              </div>
              <br />
              <div>
              {data?.map((field: FieldCategory) => {
                
                if(field.id==a){
                return(
                  
                  <Field 
                  label={"Country"}
                  key={field.id}
                  value={field.country}
                  component={TextField} type="country" name="country"inputProps={
                    { readOnly: true, }
                  } />
                )
                  }
                
                    })}
              </div>
              <br />
              <div>
              {data?.map((field: FieldCategory) => {
                
                if(field.id==a){
                return(
                  
                  <Field 
                  label={"Municipio"}
                  key={field.id}
                  value={field.municipio}
                  component={TextField} type="municipio" name="municipio"inputProps={
                    { readOnly: true, }
                  } />
                )
                  }
                
                    })}
              </div>
              <br />
              <div>
              {data?.map((field: FieldCategory) => {
                
                if(field.id==a){
                return(
                  
                  <Field 
                  label={"Phone"}
                  key={field.id}
                  value={field.phone}
                  component={TextField} type="phone" name="phone"inputProps={
                    { readOnly: true, }
                  } />
                )
                  }
                
                    })}
              </div>
              <br />
              <div>
              {data?.map((field: FieldCategory) => {
                
                if(field.id==a){
                return(
                  
                  <Field 
                  label={"Postal Code"}
                  key={field.id}
                  value={field.postal_code}
                  component={TextField} type="postal_code" name="postal_code"inputProps={
                    { readOnly: true, }
                  } />
                )
                  }
                
                    })}
              </div>
        </Grid>
        <Grid item xs={4}>
        <div>
        {data?.map((field: FieldCategory) => {
                
                if(field.id==a){
                return(
                  
                  <Field 
                  label={"State"}
                  key={field.id}
                  value={field.state}
                  component={TextField} type="state" name="state"inputProps={
                    { readOnly: true, }
                  } />
                )
                  }
                
                    })}
              </div>
              <br />
              <div>
              {data?.map((field: FieldCategory) => {
                
                if(field.id==a){
                return(
                  
                  <Field 
                  label={"Street and Number"}
                  key={field.id}
                  value={field.street1}
                  component={TextField} type="street1" name="street1"inputProps={
                    { readOnly: true, }
                  } />
                )
                  }
                
                    })}
              </div>
              <br />
              <div>
              {data?.map((field: FieldCategory) => {
                
                if(field.id==a){
                return(
                  
                  <Field 
                  label={"Street 2"}
                  key={field.id}
                  value={field.street2}
                  component={TextField} type="street2" name="street2"inputProps={
                    { readOnly: true, }
                  } />
                )
                  }
                
                    })}
              </div>
              <br />


              


              <InputLabel>Select Shipping</InputLabel>
                  <Select
                  //component={TextField}
                    name="category"
                    sx={{ m: 1 }}
                    size="small"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Category"
                    value={category}
                    onChange={handleChangeCategory}
                    required
                  >
                    {data?.map((field: FieldCategory) => {
                      return (

                        <MenuItem
                          key={field.id}
                          value={field.street1}
                         // onClick={CategorySearch(field.id)}
                        >
                          {field.street1}{' '}
                        </MenuItem>
                      );
                      
                    })}
                  </Select>

                  
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
