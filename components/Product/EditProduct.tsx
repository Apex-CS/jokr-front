import React, { useState } from 'react';
import { Button, FormGroup } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { Modal, Box, Backdrop, Fade } from '@mui/material';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';

type Product = {
  id: number;
  sku: string;
  name: string;
  description: string;
  price: number;
  // is_active: number;
  // created_at: string;
  // updated_at: string;
  stock: number;
  subcategory: string;
  photo_file_name: string;
};

type FieldTypes = {
  label: string;
  name: string;
  value: string | number;
};





function EditProduct(props: { obj: Product; open: boolean; handleClose: any }) {
  const { obj, open, handleClose } = props;
  const initProduct = {
    id: obj.id,
    sku: obj.sku,
    name: obj.name,
    description: obj.description,
    price: obj.price,
    // is_active: obj.is_active,
    // created_at: obj.created_at,
    // updated_at: obj.updated_at,
    subcategory: obj.subcategory,
    stock: obj.stock,
    photo_file_name: obj.photo_file_name,
  };

  const [productData, setEditNewProduct] = useState(initProduct);

  interface ShippingData {
    sku: string;
    name: string;
    description: string;
    price: string;
    // Active: string;
    // created_at: string;
    // updated_at: string;
    stock: string;
    subcategory: string;
    photo_file_name: string;
  }

  const editFormFieldsData: FieldTypes[] = [
    { label: 'Sku', name: 'sku', value: productData.sku },
    { label: 'Name', name: 'name', value: productData.name },
    { label: 'Description', name: 'description', value: productData.description },
    { label: 'Price', name: 'price', value: productData.price },
    // { label: 'is_active', name: 'Active', value: productData.is_active },
    // { label: 'Created At', name: 'created_at', value: productData.created_at },
    // { label: 'Updated At', name: 'updated_at', value: productData.updated_at },
    { label: 'Stock', name: 'stock', value: productData.stock },
    { label: 'Subcategory', name: 'subcategory', value: productData.subcategory },
    { label: 'Image', name: 'photo_file_name', value: productData.photo_file_name },
  ];
  const onInputChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
   /*  const onlyNums = e.target.value.replace(/[^0-9]/g, ''); */

    /* if (onlyNums.length > 5) {
      
      window.alert("Hello world!");
      console.log("Only 5 numbers");
  } */

  setEditNewProduct({ ...productData, [name]: value });

// if (productData.price.toString().length > 5) {

//     setEditNewProduct({...initProduct})
//     window.alert("Hello world!");
//     console.log("Only 5 numbers");
  
// }


    

    
    
  };


  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Here will go the axios.post() to edit the selected product
    e.preventDefault();
    // axios.put('http://localhost:8080/products/${id}', { ...productData});
    await axios.put(`/api/v1/products/${productData.id}`, { ...productData });
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
        sku: `${productData.sku}`,
        name: `${productData.name}`,
        description: `${productData.description}`,
        price: `${productData.price}`,
        // Active: '1',
        // created_at: '1',
        // updated_at: '1',
        stock: `${productData.stock}`,
        subcategory: 'DEPORTIVA',
        photo_file_name: `${productData.photo_file_name}`
      }}
      validate={(values) => {
        const errors: Partial<ShippingData> = {};
        //

        !values.sku && (errors.sku = 'Required Field');
        !values.name && (errors.name = 'Required Field');
        !values.description && (errors.description = 'Required Field');
        !values.price && (errors.price = 'Required Field');
        !values.stock && (errors.stock = 'Required Field');
        !values.photo_file_name && (errors.photo_file_name = 'Required Field');
        !values.subcategory && (errors.subcategory = 'Required Field');

        if (!/^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/.test(values.price)) {
          errors.price ="Incorrect price, not a number";
          }

        if (!/^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/.test(values.stock)) {
            errors.price ="Incorrect stock, not a number";
          }

        if(values.sku.length>10){
          errors.sku="Too long";
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
                     
                    /*    value={field.value}  */
                     /*  onChange={onInputChnage} */
                      id="outlined-basic"
                    />
                  </Form>
                );
              })}

              <Box>
                <Button type="submit" color="secondary" variant="contained">
                  Cancel
                </Button>
                <Button  disabled={isSubmitting}
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

export default EditProduct;
