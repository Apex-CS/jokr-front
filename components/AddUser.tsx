import React, { useState } from 'react';
import { Box, Button, FormGroup, InputLabel, MenuItem, Select, TextField} from '@mui/material';
import { DialogTitle } from '@mui/material';
import axios from 'axios';
import ShippingFormUser  from "@/components/ValidateFieldsUser";
/* import useSWR from 'swr'; */

type FieldTypes = {
  label: string;
  name: string;
  
};




const editFormFieldsData: FieldTypes[] = [
  { label: 'ID', name: 'id' },  
  { label: 'Email', name: 'email' },
  { label: 'Name', name: 'name' },
  { label: 'is_active', name: 'is_active' },
  { label: 'LastName', name: 'lastname' },
  { label: 'Password', name: 'password' },
  { label: 'Role', name: 'role' },
  { label: 'Created_at', name: 'created_at' },
  { label: 'Updated At', name: 'updated_at' },
  { label: 'delete_at', name: 'delete_at' }
];
const initProduct = {
  id: 3,
  email: '',
  name: '',
  is_active: 0,
  lastname: '',
  password: '',
  role: '',
  created_at: '',
  updated_at: '',
  delete_at: ''
};

function refreshPage() {
  window.location.reload();
}

function AddUser() {
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
    <ShippingFormUser/>


      
    </>
    
  );
}

export default AddUser;