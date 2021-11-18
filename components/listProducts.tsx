import React from 'react'
import next from 'next'
import TableRow from '@mui/material/TableRow';
import { Button, TableCell } from '@mui/material';

type User = {
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
  };



function listProducts(props:{user:User,key:number}) {
    const{user}=props;
    console.log(user);
    return (

        <>
                <TableRow>
              <TableCell align="right">{user.id}</TableCell>
              <TableCell align="right">{user.sku}</TableCell>
              <TableCell align="right">{user.name}</TableCell>
              <TableCell align="right">{user.description}</TableCell>
              <TableCell align="right">{user.price}</TableCell>
              <TableCell align="right">{user.is_active}</TableCell>
              <TableCell align="right">{user.created_at}</TableCell>
              <TableCell align="right">{user.updated_at}</TableCell>
              <TableCell align="right">{user.stock}</TableCell>
              <TableCell align="right">{user.photo_file_name}</TableCell>
              <TableCell align="right"><Button variant="contained" href="#contained-buttons">
        Edit
      </Button>
        
              <Button variant="outlined" color="error">
        Delete
      </Button></TableCell>
                    </TableRow>

        </>
    )
}

export default listProducts
