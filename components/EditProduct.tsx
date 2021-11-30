import React, { useState } from 'react';
import { Button, FormGroup, TextField } from '@mui/material';
import { DialogTitle } from '@mui/material';

type obj = {
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


function EditProduct(props: { obj: obj }) {
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

  const [EditProduct,setEditNewProduct] = useState(initProduct);

  const onInputChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
     const { name, value } = e.target; 
     setEditNewProduct({...EditProduct,[name]:value}); 
  };
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(EditProduct)
    /*   database.products.push(newProduct) 
        setNewProduct(initProduct);
        console.log(database)    */
  };

  return (
    <>
      <DialogTitle>Update {obj.name} product: </DialogTitle>
      <form onSubmit={onFormSubmit}>
        <FormGroup>
          <TextField
            size="small"
            margin="normal"
            variant="outlined"
            color="error"
            label="Sku"
            name="sku"
           value={EditProduct.sku}
            onChange={onInputChnage}
            id="outlined-basic"
          />
        </FormGroup>

        <FormGroup>
          <TextField
            size="small"
            margin="normal"
            variant="outlined"
            color="error"
            label="Name"
            name="name"
            value={EditProduct.name}
            onChange={onInputChnage}
            id="outlined-basic"
          />
        </FormGroup>

        <FormGroup>
          <TextField
            size="small"
            margin="normal"
            variant="outlined"
            color="error"
            label="Description"
            name="description"
            value={EditProduct.description}
            onChange={onInputChnage}
            id="outlined-basic"
          />
        </FormGroup>

        <FormGroup>
          <label>Price:</label>
          <TextField
            size="small"
            margin="normal"
            variant="outlined"
            color="error"
            label="Price"
            name="price"
            value={EditProduct.price}
            onChange={onInputChnage}
            id="outlined-basic"
          />
        </FormGroup>

        <FormGroup>
          <label>Is Active:</label>
          <TextField
            size="small"
            margin="normal"
            variant="outlined"
            color="error"
            label="Active"
            name="is_active"
            value={EditProduct.is_active}
            onChange={onInputChnage}
            id="outlined-basic"
          />
        </FormGroup>

        <FormGroup>
          <label>Created At:</label>
          <TextField
            size="small"
            margin="normal"
            variant="outlined"
            color="error"
            label="Created at"
            name="created_at"
            value={EditProduct.created_at}
            onChange={onInputChnage}
            id="outlined-basic"
          />
        </FormGroup>

        <FormGroup>
          <label>Updated At:</label>
          <TextField
            size="small"
            margin="normal"
            variant="outlined"
            color="error"
            label="Updated at"
            name="updated_at"
            value={EditProduct.updated_at}
            onChange={onInputChnage}
            id="outlined-basic"
          />
        </FormGroup>

        <FormGroup>
          <label>Stock:</label>
          <TextField
            size="small"
            margin="normal"
            variant="outlined"
            color="error"
            label="Stock"
            name="stock"
            value={EditProduct.stock}
            onChange={onInputChnage}
            id="outlined-basic"
          />
        </FormGroup>

        <FormGroup>
          <label>Photo File Name:</label>
          <TextField
            size="small"
            margin="normal"
            variant="outlined"
            color="error"
            label="Image"
            name="photo_file_name"
            value={EditProduct.photo_file_name}
            onChange={onInputChnage}
            id="outlined-basic"
          />
        </FormGroup>
        <br />
        <Button type="submit" color="primary" variant="contained">
          {' '}
          Edit Product
        </Button>
      </form>
    </>
  );
}

export default EditProduct;
