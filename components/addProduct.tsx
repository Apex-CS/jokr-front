import * as React from 'react';
import {Button,FormGroup,TextField} from '@mui/material';
import { DialogTitle } from '@mui/material';
import database from "../mockdb.json"

const initProduct = { id:3, sku:"",name:"", description: "", price:0 ,is_active:0 ,created_at: "",updated_at: "",
  stock:0,photo_file_name: ""}

function addProduct() {
  /* Add new Product */
const [newProduct,setNewProduct] = React.useState(initProduct)

const onInputChnage = (e: React.ChangeEvent<HTMLInputElement>)=> {
    const {name, value} = e.target;
    setNewProduct({...newProduct,[name]:value});
  }
const onFormSubmit = (e:React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault();
    database.products.push(newProduct) 
    setNewProduct(initProduct);
    console.log(database)   
  }
/* Add new Product */



    return (
        <>
        <DialogTitle>Create a new product: </DialogTitle>
          <form onSubmit={onFormSubmit}>
           <FormGroup>
             <TextField  size="small" margin="normal"  variant="outlined" color="error" label="Sku" name="sku" value ={newProduct.sku} onChange={onInputChnage} id="outlined-basic"  />
           </FormGroup>
           
           <FormGroup>
             <TextField size="small" margin="normal"  variant="outlined" color="error" label="Name" name="name" value= {newProduct.name} onChange={onInputChnage} id="outlined-basic" />
          </FormGroup>

         <FormGroup>
             <TextField  size="small" margin="normal"  variant="outlined" color="error" label="Description" name="description" value={newProduct.description} onChange={onInputChnage} id="outlined-basic" />
         </FormGroup>

         <FormGroup>
         <label>
               Price: 
             </label>
             <TextField size="small" margin="normal"  variant="outlined" color="error" label="Price" name="price" value={newProduct.price} onChange={onInputChnage} id="outlined-basic"  />
         </FormGroup>

         <FormGroup>
         <label>
               Is Active: 
             </label>
             <TextField size="small" margin="normal"  variant="outlined" color="error" label="Active" name="is_active" value={newProduct.is_active} onChange={onInputChnage} id="outlined-basic"  />
         </FormGroup>

         <FormGroup>
         <label>
               Created At: 
             </label>
             <TextField size="small" margin="normal"  variant="outlined" color="error" label="Created at" name="created_at" value={newProduct.created_at} onChange={onInputChnage} id="outlined-basic" />
         </FormGroup>

         <FormGroup>
         <label>
               Updated At: 
             </label>
             <TextField size="small" margin="normal"  variant="outlined" color="error" label="Updated at" name="updated_at" value={newProduct.updated_at}  onChange={onInputChnage} id="outlined-basic" />
         </FormGroup>

         <FormGroup>
         <label>
               Stock: 
             </label>
             <TextField size="small" margin="normal"  variant="outlined" color="error" label="Stock" name="stock" value={newProduct.stock} onChange={onInputChnage} id="outlined-basic"/>
         </FormGroup>

         <FormGroup>
         <label>
               Photo File Name: 
             </label>
             <TextField size="small" margin="normal"  variant="outlined" color="error" label="Image" name="photo_file_name" value={newProduct.photo_file_name} onChange={onInputChnage} id="outlined-basic" />
         </FormGroup>
         <br/>
         <Button type="submit" color ="primary" variant="contained"  > Agregar</Button>
           </form>
        </>
    )
}

export default addProduct
