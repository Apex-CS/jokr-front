import React from 'react';
import axios from 'axios';
import { Button, Grid } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';

interface ShippingData {
  id: string;
  email: string;
  name: string;
  is_active: string;
  lastName: string;
  password: string;
  role: string;
  created_at: string;
  delete_at: string;
  updated_at: string;
}

function ShippingFormUser() {
  return (
    <Formik
      initialValues={{
        email: '',
        name: '',
        is_active: '',
        lastName: '',
        password: '',
        role: '',
        created_at: '',
        delete_at: '',
        updated_at: '',
      }}
      validate={(values) => {
        const errors: Partial<ShippingData> = {};
        //
        !values.email && (errors.email = 'Required Field');
        !values.is_active && (errors.is_active = 'Required Field');
        !values.lastName && (errors.lastName = 'Required Field');
        !values.name && (errors.lastName = 'Required Field');
        !values.password && (errors.password = 'Required Field');
        !values.role && (errors.role = 'Required Field');
        !values.created_at && (errors.created_at = 'Required Field');
        !values.delete_at && (errors.created_at = 'Required Field');
        !values.updated_at && (errors.updated_at = 'Required Field');

        // Alphanumeric chars
        // if (!/^[\w\-\s]+$/.test(values.zipcode)) {
        //   errors.zipcode = 'Incorrect zip code';
        // }
        //Phone number of 10 chars
        if (!/^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/.test(values.name)) {
          errors.name = 'Incorrect price';
        }
        //  if (!/^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/.test(values.Active)) {
        //   errors.Active ="0/1";
        //   }
        //   if (!/^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/.test(values.stock)) {
        //     errors.stock ="Incorrect number";
        //     }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(async () => {
          setSubmitting(false);
          await axios.post('/api/v1/Users', { ...values });
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
              <Field component={TextField} name="email" type="email" label="Email" />
              <Field component={TextField} name="is_active" type="is_active" label="Is_active" />
              <Field component={TextField} type="lastname" name="lastName" label="LastName" />
              <Field component={TextField} name="name" type="name" label="Name" />
              <Field component={TextField} name="password" type="password" label="Password" />
              <Field component={TextField} name="role" type="role" label="Role" />
              <Field component={TextField} name="created_at" type="created_at" label="Created_at" />
              <Field component={TextField} name="delete_at" type="Delete_at" label="Delete_at" />
              <Field component={TextField} name="updated_at" type="updated_at" label="Updated_at" />
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
                color="secondary"
                disabled={isSubmitting}
                onClick={submitForm}
                style={{ marginTop: '10rem' }}
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

export default ShippingFormUser;
