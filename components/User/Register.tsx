import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import React, { useContext } from 'react';
import swal from 'sweetalert';
import { TodosContext } from '../contexts';

import {
  Button,
  CardHeader,
  Divider,
  FormGroup,
  Grid,
  Tooltip,
  FormControl,
  DialogActions,
  InputAdornment,
} from '@mui/material';
import { TextField } from 'formik-mui';
/* Labels Inputs*/
type FieldTypes = {
  name: string | number;
  type: string | number;
  label: string;
  placeholder: string;
  value: string | number;
};

const AddlabelsConfing: FieldTypes[] = [
  { name: 'email', type: ' email', label: 'New Email', placeholder: 'Email', value: '' },
  { name: 'name', type: 'text', label: 'Name', placeholder: 'Name', value: '' },
  { name: 'lastName', type: 'text', label: 'Last name', placeholder: 'Last Name', value: '' },
  { name: 'password', type: 'password', label: 'Password', placeholder: 'Password', value: '' },
  {
    name: 'repeat',
    type: 'password',
    label: 'Repeat Password',
    placeholder: 'Repeat Password',
    value: '',
  },
];

export interface DataUser {
  id: number;
  email: string;
  password: string;
  name: string;
  lastName: string;
  getphotoUrl: string;
  getphotoPublicId: string;
  customerPaymentId: string;
  roleName: string;
  repeat: string;
  role: {
    rolename: string;
  };
}

function Register() {
  const { open, isOpen } = useContext(TodosContext);
  const { callback, isCallback } = useContext(TodosContext);
  const { isSuccess } = useContext(TodosContext);
  const { isLoader } = useContext(TodosContext);

  const handleClose = () => {
    isOpen(false);
  };

  return (
    /*     <div>
            hola

            <button onClick={close}>Submit </button>
        </div> */

    <Formik
      initialValues={{
        email: '',
        name: '',
        lastName: '',
        password: '',
        repeat: '',
        role: {
          id: 0,
          rolename: 'Shopper',
        },
      }}
      validate={(values) => {
        const errors: Partial<DataUser> = {};

        !values.email && (errors.email = 'Required Field');
        !values.name && (errors.name = 'Required Field');
        !values.password && (errors.password = 'Required Field');
        !values.lastName && (errors.lastName = 'Required Field');
        !values.repeat && (errors.repeat = 'Required Field');

        if (values.password != values.repeat) {
          errors.password = 'Password doesnt match';
        }

        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(false);
        try {
          const res = await axios.post('/api/v1/public/register', { ...values });

          if (res) {
            swal({ icon: 'success', title: 'Ok!', text: 'Great you can continue..', timer: 2000 });
          }
        } catch (err) {
          swal({
            icon: 'error',
            title: 'Ups...!',
            text: 'Email already exist or Something was wrong',
            timer: 2000,
          });
        }

        isOpen(false);
        isCallback(!callback);
        isSuccess(true);
        isLoader(true);
      }}
    >
      {() => (
        <Grid
          item
          style={{
            marginTop: '-15px',
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 300,
            minWidth: 300,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Tooltip title="Close">
            <Button
              style={{ marginLeft: '15rem' }}
              className="button-close"
              color="error"
              variant="outlined"
              size="small"
              onClick={handleClose}
            >
              <b>X</b>
            </Button>
          </Tooltip>
          <CardHeader
            sx={{ m: -2, paddingBottom: '-2rem', textAlign: 'center' }}
            title="Create a new account"
          />
          <Form>
            <Divider sx={{ marginBottom: '2rem' }} />

            {AddlabelsConfing?.map((field: FieldTypes) => {
              return (
                <FormGroup key={field.name}>
                  <FormControl sx={{ m: 1 }}>
                    <Field
                      size="small"
                      component={TextField}
                      name={field.name}
                      type={field.type}
                      label={field.label}
                      placeholder={field.placeholder}
                      autoComplete="on"
                      InputProps={{
                        startAdornment: <InputAdornment position="start"></InputAdornment>,
                      }}
                    />
                  </FormControl>
                </FormGroup>
              );
            })}

            <DialogActions>
              <Button type="submit" variant="outlined" sx={{ m: 0.5 }}>
                Create
              </Button>
            </DialogActions>
          </Form>
        </Grid>
      )}
    </Formik>
  );
}

export default Register;
