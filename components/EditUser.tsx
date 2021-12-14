import React, { useState } from 'react';
import { Button, FormGroup, TextField } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { Modal, Box, Backdrop, Fade } from '@mui/material';
import axios from 'axios';

type User = {
  id: number;
  email: string;
  name: string;
  is_active: number;
  lastName: string;
  password: string;
  role: string;
  created_at: string;
  delete_at: string;
  updated_at: string;
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
    is_active: obj.is_active,
    lastName: obj.lastName,
    password: obj.password,
    role: obj.role,
    created_at: obj.created_at,
    delete_at: obj.delete_at,
    updated_at: obj.updated_at,
  };

  const [productData, setEditNewProduct] = useState(initProduct);

  const editFormFieldsData: FieldTypes[] = [
    { label: 'id', name: 'id', value: productData.id },
    { label: 'email', name: 'email', value: productData.email },
    { label: 'name', name: 'name', value: productData.name },
    { label: 'is_active', name: 'is_active', value: productData.is_active },
    { label: 'lastName', name: 'lastName', value: productData.lastName },
    { label: 'password', name: 'password', value: productData.password },
    { label: 'role', name: 'role', value: productData.role },
    { label: 'created_at', name: 'created_at', value: productData.created_at },
    { label: 'delete_at', name: 'delete_at', value: productData.delete_at },
    { label: 'updated_at', name: 'updated_at', value: productData.updated_at },
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

export default EditUser;
