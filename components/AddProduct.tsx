import React, { useState } from 'react';
import { Box, Button, FormGroup, InputLabel, MenuItem, Select, TextField} from '@mui/material';
import { DialogTitle } from '@mui/material';
import axios from 'axios';
import ShippingForm  from "@/components/ValidateFields";
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
  subcategory: ''
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

     await axios.post('/api/v1/products', { ...newProduct });
     setOpen(false);
    setNewProduct(initProduct); 
  };

  return (
    <>
    <ShippingForm/>


      
    </>
    
  );
}

export default AddProduct;
