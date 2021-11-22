import React from 'react'
import {Button,FormGroup,TextField} from '@mui/material';
import { DialogTitle } from '@mui/material';

type obj = {
    id: number
    sku: string
    name: string
    description: string
    price: number
    is_active: number
    created_at: string
    updated_at: string
    stock: number
    photo_file_name: string
}
function editProduct(props:{obj:obj}) {
    const {obj} = props;
    console.log(obj)

    const onInputChnage = (e: React.ChangeEvent<HTMLInputElement>)=> {
        const {name, value} = e.target;
        /* setNewProduct({...newProduct,[name]:value}); */
      }
    const onFormSubmit = (e:React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault();
      /*   database.products.push(newProduct) 
        setNewProduct(initProduct);
        console.log(database)    */
      }

    return (
       <>
        <DialogTitle>Update product: </DialogTitle>
          <form onSubmit={onFormSubmit}>
           <FormGroup>
             <TextField  size="small" margin="normal"  variant="outlined" color="error" label="Sku" name="sku"  value={obj.sku} onChange={onInputChnage} id="outlined-basic"  />
           </FormGroup>
           
           <FormGroup>
             <TextField size="small" margin="normal"  variant="outlined" color="error" label="Name" name="name" value= {obj.name} onChange={onInputChnage} id="outlined-basic" />
          </FormGroup>

         <FormGroup>
             <TextField  size="small" margin="normal"  variant="outlined" color="error" label="Description" name="description" value={obj.description} onChange={onInputChnage} id="outlined-basic" />
         </FormGroup>

         <FormGroup>
         <label>
               Price: 
             </label>
             <TextField size="small" margin="normal"  variant="outlined" color="error" label="Price" name="price" value={obj.price} onChange={onInputChnage} id="outlined-basic"  />
         </FormGroup>

         <FormGroup>
         <label>
               Is Active: 
             </label>
             <TextField size="small" margin="normal"  variant="outlined" color="error" label="Active" name="is_active" value={obj.is_active} onChange={onInputChnage} id="outlined-basic"  />
         </FormGroup>

         <FormGroup>
         <label>
               Created At: 
             </label>
             <TextField size="small" margin="normal"  variant="outlined" color="error" label="Created at" name="created_at" value={obj.created_at} onChange={onInputChnage} id="outlined-basic" />
         </FormGroup>

         <FormGroup>
         <label>
               Updated At: 
             </label>
             <TextField size="small" margin="normal"  variant="outlined" color="error" label="Updated at" name="updated_at" value={obj.updated_at}  onChange={onInputChnage} id="outlined-basic" />
         </FormGroup>

         <FormGroup>
         <label>
               Stock: 
             </label>
             <TextField size="small" margin="normal"  variant="outlined" color="error" label="Stock" name="stock" value={obj.stock} onChange={onInputChnage} id="outlined-basic"/>
         </FormGroup>

         <FormGroup>
         <label>
               Photo File Name: 
             </label>
             <TextField size="small" margin="normal"  variant="outlined" color="error" label="Image" name="photo_file_name" value={obj.photo_file_name} onChange={onInputChnage} id="outlined-basic" />
         </FormGroup>
         <br/>
         <Button type="submit" color ="primary" variant="contained"  > Edit Product</Button>
           </form>
       </>
    )
}

export default editProduct
