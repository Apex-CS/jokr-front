import React, { useState } from 'react';
import { Box, Button, FormGroup, InputLabel, MenuItem, Select, TextField} from '@mui/material';
import { DialogTitle } from '@mui/material';
import axios from 'axios';
/* import useSWR from 'swr'; */

type FieldTypes = {
  label: string;
  name: string;
  
};

const editFormFieldsData: FieldTypes[] = [
  { label: 'Sku', name: 'sku' },
  { label: 'Name', name: 'name' },
  { label: 'Description', name: 'description' },
  { label: 'Price', name: 'price' },
  { label: 'is_active', name: 'Active' },
  { label: 'Created At', name: 'created_at' },
  { label: 'Updated At', name: 'updated_at' },
  { label: 'Stock', name: 'stock' },
  { label: 'Image', name: 'photo_file_name' },
];
const initProduct = {
  id: 3,
  sku: '',
  name: '',
  description: '',
  price: 0,
  is_active: 0,
  created_at: '',
  updated_at: '',
  stock: 0,
  photo_file_name: '',
};

function refreshPage() {
  window.location.reload();
}

function AddProduct() {
  const [newProduct, setNewProduct] = useState(initProduct);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  
  

  /* Add new Product */
  const onInputChnage = (e: { preventDefault: () => void; target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };
  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
/*     const fetcher = (url: string) => axios.post(url,newProduct);
    const { data, error } = useSWR('/api/addProducts', fetcher);
    if (error) return 'An error has occurred.' + error;
    if (!data) return 'Loading...'; */

     await axios.post('/api/addProducts', { ...newProduct });
    setNewProduct(initProduct); 
  };

  return (
    <>
      <DialogTitle>Create a new product: </DialogTitle>
      <form onSubmit={onFormSubmit}>
        
        
        <DialogTitle>
            Update:
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
                      
                      onChange={onInputChnage}
                      id="outlined-basic"
                    />
                  </FormGroup>
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
          
        </Button>
        
      </form>
    </>
    
  );
}

export default AddProduct;
