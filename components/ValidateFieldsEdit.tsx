import React, { useState } from 'react';
import { Box, FormGroup, InputLabel, MenuItem, Select } from '@mui/material';
import { DialogTitle } from '@mui/material';
import axios from 'axios';
import { Button, LinearProgress,Grid } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { fieldToAutocomplete, TextField } from 'formik-mui';
import { PhoneAndroid } from '@material-ui/icons';

type Product = {
  id: number;
  sku: string;
  name: string;
  description: string;
  price: number;
  is_active: number;
  created_at: string;
  updated_at: string;
  stock: number;
  photo_file_name: string;
};

type FieldTypes = {
  label: string;
  name: string;
  value: string | number;
  
};

function refreshPage() {
  window.location.reload();
}


interface ShippingData {
  sku: string;
  name: string;
  description: string;
  price: string;
  Active: string;
  created_at: string;
  updated_at: string;
  stock: string;
  photo_file_name: string;
}


function ShippingForm(props: { obj: Product; id:number; open: boolean; handleClose: any }) {

  const { obj, id, open, handleClose } = props;
  const initProduct = {
    id: obj.id,
    sku: obj.sku,
    name: obj.name,
    description: obj.description,
    price: obj.price,
    is_active: obj.is_active,
    created_at: obj.created_at,
    updated_at: obj.updated_at,
    stock: obj.stock,
    photo_file_name: obj.photo_file_name,
  };

  const [productData, setEditNewProduct] = useState(initProduct);

  const editFormFieldsData: FieldTypes[] = [
    { label: 'Sku', name: 'sku', value: productData.sku },
    { label: 'Name', name: 'name', value: productData.name },
    { label: 'Description', name: 'description', value: productData.description },
    { label: 'Price', name: 'price', value: productData.price },
    { label: 'is_active', name: 'Active', value: productData.is_active },
    { label: 'Created At', name: 'created_at', value: productData.created_at },
    { label: 'Updated At', name: 'updated_at', value: productData.updated_at },
    { label: 'Stock', name: 'stock', value: productData.stock },
    { label: 'Image', name: 'photo_file_name', value: productData.photo_file_name },
  ];

  const onInputChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditNewProduct({ ...productData, [name]: value });
  };

  const onFormSubmit =  (e: React.FormEvent<HTMLFormElement>) => {
    // Here will go the axios.post() to edit the selected product
    e.preventDefault();
    // axios.put('http://localhost:8080/products/${id}', { ...productData});
    axios.put(`http://localhost:8080/products/${productData.id}`, { ...productData});
    setEditNewProduct(initProduct);
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
        photo_file_name: ''
      }}
      validate={(values) => {
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
          await axios.post('/api/addProducts', { ...values });
          //axios.put(`http://localhost:8080/products/${productData.id}`, { ...productData});
          window.location.reload();
        }, 500);
       
      }
    }
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
            item
            style={{ display: 'flex', flexDirection: 'column', maxWidth: 400, minWidth: 300 }}
          >
           
            
            
            <Form onSubmit={onFormSubmit}>

              <Field component={TextField} name="sku" type="sku" label="SKU" value={productData.sku}/>
              <Field component={TextField} name="name" type="name" label="Name" />
              <Field component={TextField} name="description" type="description" label="Description" />
              <Field component={TextField} type="number" name="price" label="Price" />
              <Field component={TextField} name="Active" type="number" label="Active" />
              <Field component={TextField} name="created_at" type="date" label="" />
              <Field component={TextField} name="updated_at" type="date" label="" />
              <Field component={TextField} name="stock" type="number" label="Stock" />
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