import React, { useState } from 'react';
import axios from 'axios';
import { Button, Grid } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';

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

function ShippingForm(props: { obj: Product; id: number; open: boolean; handleClose: any }) {
  const { obj } = props;
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

  const [productData] = useState(initProduct);
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
        photo_file_name: '',
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
          errors.price = 'Incorrect price';
        }
        if (!/^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/.test(values.Active)) {
          errors.Active = '0/1';
        }
        if (!/^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/.test(values.stock)) {
          errors.stock = 'Incorrect number';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(async () => {
          setSubmitting(false);
          await axios.post('/api/addProducts', { ...values });
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
            item
            style={{ display: 'flex', flexDirection: 'column', maxWidth: 400, minWidth: 300 }}
          >
            <Form>
              <Field
                component={TextField}
                name="sku"
                type="sku"
                label="SKU"
                value={productData.sku}
              />
              <Field component={TextField} name="name" type="name" label="Name" />
              <Field
                component={TextField}
                name="description"
                type="description"
                label="Description"
              />
              <Field component={TextField} type="number" name="price" label="Price" />
              <Field component={TextField} name="Active" type="number" label="Active" />
              <Field component={TextField} name="created_at" type="date" label="" />
              <Field component={TextField} name="updated_at" type="date" label="" />
              <Field component={TextField} name="stock" type="number" label="Stock" />
              <Field
                component={TextField}
                name="photo_file_name"
                type="photo_file_name"
                label="Photo_file_name"
              />

              <Button
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}
              >
                Submit
              </Button>
            </Form>
          </Grid>
        </Grid>
      )}
    </Formik>
  );
}

export default ShippingForm;
