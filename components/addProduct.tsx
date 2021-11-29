import React, { useState } from 'react';
import { Button, FormGroup, InputLabel, MenuItem, Select, TextField} from '@mui/material';
import { DialogTitle } from '@mui/material';
import axios from 'axios';
/* import useSWR from 'swr'; */
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

function AddProduct() {
  const [newProduct, setNewProduct] = useState(initProduct);

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
        <FormGroup>
          <TextField
            size="small"
            margin="normal"
            variant="outlined"
            color="error"
            label="Sku"
            name="sku"
            value={newProduct.sku}
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
            value={newProduct.name}
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
            value={newProduct.description}
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
            value={newProduct.price}
            onChange={onInputChnage}
            id="outlined-basic"
          />
        </FormGroup>

        <FormGroup>
          {/*           <label>Is Active:</label>
          <TextField
            size="small"
            margin="normal"
            variant="outlined"
            color="error"
            label="Active"
            name="is_active"
            value={newProduct.is_active}
            onChange={onInputChnage}
            id="outlined-basic"
          /> */}

          <InputLabel id="demo-simple-select-label">Is active</InputLabel>
          <Select
            name = "is_active"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={newProduct.is_active}
            label="Is Active"
            onChange={onInputChnage}
          >
            <MenuItem value={1}>Yes</MenuItem>
            <MenuItem value={0}>No</MenuItem>
          </Select>
        </FormGroup>

        <FormGroup>
          <label>Created At:</label>
          <TextField
            type="date"
            size="small"
            margin="normal"
            variant="outlined"
            color="error"
            name="created_at"
            value={newProduct.created_at}
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
            type="date"
            name="updated_at"
            value={newProduct.updated_at}
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
            value={newProduct.stock}
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
            value={newProduct.photo_file_name}
            onChange={onInputChnage}
            id="outlined-basic"
          />
        </FormGroup>
        <br />
        <Button type="submit" color="primary" variant="contained">
          {' '}
          Agregar
        </Button>
      </form>
    </>
  );
}

export default AddProduct;
