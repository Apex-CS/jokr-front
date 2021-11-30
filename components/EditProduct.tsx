import React, { useState } from 'react';
import { Button, FormGroup, TextField } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { Modal, Box, Backdrop, Fade } from '@mui/material';

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

function EditProduct(props: { obj: Product; open: boolean; handleClose: any }) {
  const { obj, open, handleClose } = props;
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
    { label: 'Sku', name: 'sku', value: productData.id },
    { label: 'Name', name: 'name', value: productData.sku },
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

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Here will go the axios.post() to edit the selected product
    e.preventDefault();
    console.log(productData);
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
            Update {obj.name} product:
            <form onSubmit={onFormSubmit}>
              {editFormFieldsData?.map((field: FieldTypes) => {
                return (
                  <FormGroup key={field.label}>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="outlined"
                      label={field.label}
                      name={field.name}
                      value={field.value}
                      onChange={onInputChnage}
                      id="outlined-basic"
                    />
                  </FormGroup>
                );
              })}

              <Box>
                <Button type="submit" color="secondary" variant="contained">
                  Cancel
                </Button>
                <Button type="submit" color="primary" variant="contained">
                  Save
                </Button>
              </Box>
            </form>
          </DialogTitle>
        </Box>
      </Fade>
    </Modal>
  );
}

export default EditProduct;