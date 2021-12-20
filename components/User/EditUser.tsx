import React, { useState } from 'react';
import { Button, FormGroup} from '@mui/material';
import { DialogTitle } from '@mui/material';
import { Modal, Box, Backdrop, Fade } from '@mui/material';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';

type User = {
    id: number;
    email: string;
    name: string;
    lastName: string;
    role: string;
      
    };

type FieldTypes = {
  label: string;
  name: string;
  value: string | number;
};

function EditUser(props: { obj: User; open: boolean; handleClose: any }) {
  const { obj, open, handleClose } = props;
  const initProduct = {
    id: obj.id,
    email: obj.email,
    name: obj.name,
    lastName: obj.lastName,
    role: obj.role,
  };

  const [productData, setEditNewProduct] = useState(initProduct);

  interface ShippingData {
    email: string;
    name: string;
    lastName: string;
    role: string;

  }


  const editFormFieldsData: FieldTypes[] = [
    { label: 'email', name: 'email', value: productData.email },
    { label: 'name', name: 'name', value: productData.name },
    { label: 'lastName', name: 'lastName', value: productData.lastName },
    { label: 'role', name: 'role', value: productData.role }
  ];
  const onInputChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditNewProduct({ ...productData, [name]: value });
  };

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Here will go the axios.post() to edit the selected product
    e.preventDefault();
    // axios.put('http://localhost:8080/products/${id}', { ...productData});
    await axios.put(`/api/v1/Users/${productData.id}`, { ...productData });
    setEditNewProduct(initProduct);
    window.location.reload();
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 1500,
      }}
      className="modalProduct"
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            maxHeight: '90%',
            marginTop: '-1rem',
            overflow: 'scroll',
            height: '100%',
            borderRadius: '2%',
          }}
          
        >
          <DialogTitle>
            <Formik
            initialValues={{
              email: `${productData.email}`,
              name: `${productData.name}`,
              lastName: `${productData.lastName}`,
              role: `${productData.role}`
            }}
            validate={(values) => {
              const errors: Partial<ShippingData> = {};
              //
      
              !values.email && (errors.email = 'Required Field');
        !values.name && (errors.name = 'Required Field');
        !values.lastName && (errors.lastName = 'Required Field');
        !values.role && (errors.role = 'Required Field');
      
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
                 // axios.put('http://localhost:8080/products/${id}', { ...productData});
                 await axios.put(`/api/v1/products/${productData.id}`, { ...values });
                 setEditNewProduct(initProduct);
                 window.location.reload();
              }, 500);
            }}
            >
            {({ submitForm, isSubmitting }) => (
    <React.Fragment>
            Update {obj.name} product:
           
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

              <Box>
                <Button type="submit" color="secondary" variant="contained">
                  Cancel
                </Button>
                <Button disabled={isSubmitting}
                onClick={submitForm}  color="primary" variant="contained">
                  Save
                </Button>
              </Box>
              </React.Fragment>
            )}
            </Formik>
            
          </DialogTitle>
        </Box>
      </Fade>
    </Modal>
  );
}

export default EditUser;
