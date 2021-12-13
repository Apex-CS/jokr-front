import React, { useState } from 'react';
import { Box, FormGroup, InputLabel, MenuItem, Select } from '@mui/material';
import { DialogTitle } from '@mui/material';
import axios from 'axios';
import { Button, LinearProgress , Grid } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import { PhoneAndroid } from '@material-ui/icons';

type FieldTypes = {
  label: string;
  name: string;
  
};

function refreshPage() {
  window.location.reload();
}


const initProduct = {
  id: 3,
  sku: '',
  name: '',
  description: '',
  price: 0,
  is_active: 0,
  created_at: '',
  updated_at: '',
  stock: 0,
  photo_file_name: '',
};

const editFormFieldsData: FieldTypes[] = [
  { label: 'Sku', name: 'sku' },
  { label: 'Name', name: 'name' },
  { label: 'Description', name: 'description' },
  { label: 'Price', name: 'price' },
  { label: 'is_active', name: 'Active' },
  { label: 'Created At', name: 'created_at' },
  { label: 'Updated At', name: 'updated_at' },
  { label: 'Stock', name: 'stock' },
  { label: 'Sicategory', name: 'subcategory' },
  { label: 'Image', name: 'photo_file_name' },
];

interface ShippingData {
  sku: string;
  name: string;
  description: string;
  price: string;
  Active: string;
  created_at: string;
  updated_at: string;
  stock: string;
  subcategory: string;
  photo_file_name: string;
  
}

function ShippingForm() {

  const [newProduct, setNewProduct] = useState(initProduct);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);


  /* Add new Product */
  const onInputChnage = (e: { preventDefault: () => void; target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };
  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
/*     const fetcher = (url: string) => axios.post(url,newProduct);
    const { data, error } = useSWR('/api/addProducts', fetcher);
    if (error) return 'An error has occurred.' + error;
    if (!data) return 'Loading...'; */

     
     setOpen(false);
    setNewProduct(initProduct); 
  };


  return (

    <Formik
      initialValues={{
        sku: '',
        name: '',
        description: '',
        price: '',
        Active: '',
        created_at: '',
        updated_at: '',
        stock: '',
        subcategory: '',
        photo_file_name: ''
      }}
      validate={(values) => {

        console.log(values)
        const errors: Partial<ShippingData> = {};
        //
        !values.sku && (errors.sku = 'Required Field');
        !values.name && (errors.name = 'Required Field');
        !values.description && (errors.description = 'Required Field');
        !values.price && (errors.price = 'Required Field');
        !values.Active && (errors.Active = 'Required Field');
        !values.created_at && (errors.created_at = 'Required Field');
        !values.updated_at && (errors.updated_at = 'Required Field');
        !values.stock && (errors.stock = 'Required Field');
        !values.photo_file_name && (errors.photo_file_name = 'Required Field');
        !values.subcategory && (errors.subcategory = 'Required Field');
        
        // Alphanumeric chars
        // if (!/^[\w\-\s]+$/.test(values.zipcode)) {
        //   errors.zipcode = 'Incorrect zip code';
        // }
        //Phone number of 10 chars
         if (!/^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/.test(values.price)) {
         errors.price ="Incorrect price";
         }
         if (!/^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/.test(values.Active)) {
          errors.Active ="0/1";
          }
          if (!/^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/.test(values.stock)) {
            errors.stock ="Incorrect number";
            }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(async() => {
          setSubmitting(false);
          
          await axios.post('/api/v1/products', { ...values });
          window.location.reload();
        }, 500);
       
      }
    }
    >
      {({ submitForm, isSubmitting }) => (
        <Grid
       /*    container
          item
          xs={12}
          sm={6}
          alignItems="center"
          direction="column"
          justify="space-between"
          style={{ padding: 10 }} */
        >
          <Grid
            item
            style={{ display: 'flex', flexDirection: 'column', maxWidth: 400, minWidth: 300 }}
          >
           
            
            
            <Form onSubmit={onFormSubmit}>

              <Field component={TextField} name="sku" type="sku" label="SKU" />
              <Field component={TextField} name="name" type="name" label="Name" />
              <Field component={TextField} name="description" type="description" label="Description" />
              <Field component={TextField} type="number" name="price" label="Price" />
              <Field component={TextField} name="Active" type="number" label="Active" />
              <Field component={TextField} name="created_at" type="date" label="" />
              <Field component={TextField} name="updated_at" type="date" label="" />
              <Field component={TextField} name="stock" type="number" label="Stock" />
              <Field component={TextField} name="subcategory" type="subcategory" label="Subcategory"/>
              <Field component={TextField} name="photo_file_name" type="photo_file_name" label="Photo_file_name" />
              {/* <Field
                component={TextField}
                name="phone"
                type="phone"
                label="Phone"
                margin="normal"
                style={{ textTransform: 'none' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneAndroid />
                    </InputAdornment>
                  ),
                }}
              /> */}
              
              <Button
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}
                
              >
                Submit
              </Button>

            </Form>
            
        
        
        
            {/* Update:
            <form onSubmit={onFormSubmit}>
              {editFormFieldsData?.map((field: FieldTypes) => {
                return (
                  <Form key={field.label}>
                    <Field
                      component={TextField}
                      size="small"
                      margin="normal"
                      variant="outlined"
                      label={field.label}
                      name={field.name}
                      id="outlined-basic"
                    />
                  </Form>
                );
              })}

              
            </form>
          </DialogTitle>
          <Button onClick={refreshPage}type="submit" color="primary" variant="contained">
          {' '}
          Agregar
        </Button>

        <Button onClick={handleClose} type="submit" color="primary" variant="contained">
          {' '}
          Close
          
        </Button> */}
        
      



          </Grid>
        </Grid>
      )}
    </Formik>
  );
}

export default ShippingForm;