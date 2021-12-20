import React from 'react';
import axios from 'axios';
import { Button, Grid } from '@mui/material';
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
  email: '',
  lastName: '',
  name: '',
  role: ''
};

const regex = /[A-Za-z]/;

const editFormFieldsData: FieldTypes[] = [
  { label: 'Email', name: 'email' },
  { label: 'Lastname', name: 'lastName' },
  { label: 'Name', name: 'name' },
  { label: 'Role', name: 'role' }
];

interface ShippingData {
    id: string;
    email: string;
    name: string;
    lastName: string;
    role: string;
  
}

function ShippingFormUser() {
  return (
    <Formik
      initialValues={{
        email: '',
        name: '',
        lastName: '',
        role: ''

      }}
      validate={(values) => {
        const errors: Partial<ShippingData> = {};
        
        !values.email && (errors.email = 'Required Field');
        !values.name && (errors.lastName = 'Required Field');
        !values.lastName && (errors.lastName = 'Required Field');
        !values.role && (errors.role = 'Required Field');
      
        
       // Alphanumeric chars

       if (!/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i.test(values.email)) {
        errors.email = 'email is incorrect ';
    }
         if (values.email.length>30) {
           errors.email = 'Field is too long ';
       }

       if (/[1234567890|<>]/g.test(values.name)) {
        errors.name = 'No numbers ';
    }
  
    if (values.name.length>10) {
      errors.name = 'Field is too long ';
  }

  if (/[1234567890|<>]/g.test(values.lastName)) {
    errors.lastName = 'No numbers ';
}

if (values.lastName.length>10) {
  errors.lastName = 'Field is too long ';
}

if (/[1234567890|<>]/g.test(values.role)) {
  errors.role = 'No numbers ';
}

if (values.role.length>10) {
errors.role = 'Field is too long ';
}

       
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
              <Field component={TextField} name="name" type="name" label="Name" />
              <Field component={TextField} type="lastname" name="lastName" label="LastName" />
              <Field component={TextField} name="role" type="role" label="Role" />
    

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
