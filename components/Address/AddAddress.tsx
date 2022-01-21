import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import React, { useContext, useState } from 'react';
import swal from 'sweetalert';
import { mutate } from 'swr';
import { TodosContext } from '@/components/contexts/GlobalProvider';
import Router from 'next/router';
import {
  Button,
  CardHeader,
  Divider,
  Grid,
  InputAdornment,
  Tooltip,
  FormControl,
  FormGroup,
  DialogActions,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

export interface DataAddress {
  street1: string;
  street2: string;
  colonia: string;
  municipio: string;
  state: string;
  country: string;
  postal_code: string;
  phone: string;
  recipient_name: string;
  is_default_billing_address: boolean;
  is_default_shipping_address: boolean;
  users: {
    id: number;
  };
}

type FieldTypes = {
  name: string | number;
  type: string | number;
  label: string;
  placeholder: string;
  value: string | number;
};

const AddlabelsConfing: FieldTypes[] = [
  { name: 'street1', type: 'text', label: 'Street 1', placeholder: 'Street 1', value: '' },
  { name: 'street2', type: 'text', label: 'Street 2', placeholder: 'Street 2', value: '' },
  { name: 'colonia', type: 'text', label: 'Colony', placeholder: 'Colony', value: '' },
  { name: 'municipio', type: 'text', label: 'Municipio', placeholder: 'Municipio', value: '' },
  { name: 'state', type: 'text', label: 'State', placeholder: 'Estate', value: '' },
  { name: 'country', type: 'text', label: 'Country', placeholder: 'Country', value: '' },
  {
    name: 'postal_code',
    type: 'text',
    label: 'Postal Code',
    placeholder: 'Postal Code',
    value: '',
  },
  { name: 'phone', type: 'text', label: 'Phone', placeholder: 'Phone', value: '' },
  {
    name: 'recipient_name',
    type: 'text',
    label: 'Recipient Name',
    placeholder: 'Recipient Name',
    value: '',
  },
];

function AddAddress() {
  const { isOpen } = useContext(TodosContext);
  const { callback, isCallback } = useContext(TodosContext);
  const { isSuccess } = useContext(TodosContext);
  const { isLoader } = useContext(TodosContext);
  const { IdUser } = useContext(TodosContext);

  const handleClose = () => {
    isOpen(false);
  };

  const [checkedBilling, setCheckedBilling] = useState(false);
  const checkChangedBilling = () => {
    setCheckedBilling(!checkedBilling);
  };

  const [checkedShipping, setCheckedShipping] = useState(false);
  const checkChangedShipping = () => {
    setCheckedShipping(!checkedShipping);
  };



  return (
    <Formik
      initialValues={{
        id: 0,
        street1: '',
        street2: '',
        colonia: '',
        municipio: '',
        state: '',
        country: '',
        postal_code: '',
        phone: '',
        recipient_name: '',
        is_default_billing_address: false,
        is_default_shipping_address: false,
        users: {
          id: IdUser,
        },
      }}
      validate={(values) => {
        const errors: Partial<DataAddress> = {};

        !values.street1 && (errors.street1 = 'Required Field');
        !values.street2 && (errors.street2 = 'Required Field');
        !values.colonia && (errors.colonia = 'Required Field');
        !values.municipio && (errors.municipio = 'Required Field');
        !values.state && (errors.state = 'Required Field');
        !values.country && (errors.country = 'Required Field');
        !values.postal_code && (errors.postal_code = 'Required Field');
        !values.phone && (errors.phone = 'Required Field');
        !values.recipient_name && (errors.recipient_name = 'Required Field');
        
        values.is_default_billing_address = checkedBilling
        values.is_default_shipping_address = checkedShipping

        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          setSubmitting(false);
          console.log(values);
          await axios.post(
            '/api/v1/addresses',
            { ...values },
            {
              headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
            }
          );
        } catch (err) {
          swal({ icon: 'error', text: 'Session Expired', timer: 2000 }).then(function () {
            localStorage.removeItem('token');
            Router.push('/login');
          });
        }

        mutate('/api/v1/addresses');
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
            title="Add a new address"
          />
          <Form>
            <Divider />

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

            <FormGroup>
              <FormControlLabel
                sx={{ m: 1, '& .MuiSvgIcon-root': { fontSize: 18 } }}
                control={<Checkbox  />}
                label="Biling Address"
                onChange={checkChangedBilling}
                checked={checkedBilling}
              />
            </FormGroup>

            <FormGroup>
              <FormControlLabel
                sx={{ m: 1, '& .MuiSvgIcon-root': { fontSize: 18 } }}
                control={<Checkbox/>}
                label="Shipping Address"
                onChange={checkChangedShipping}
                checked={checkedShipping}
              />
            </FormGroup>

            <DialogActions>
              <Button type="submit" variant="outlined" sx={{ m: 0.5 }}>
                Submit
              </Button>
            </DialogActions>
          </Form>
        </Grid>
      )}
    </Formik>
  );
}

export default AddAddress;
