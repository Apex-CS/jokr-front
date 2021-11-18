import Head from 'next/head';
import styles from '../styles/Home.module.css';
import useSWR from 'swr';
import axios from 'axios';
import { useRouter } from 'next/router';
import background from "../public/20916.jpg";
import background1 from "../public/back1.jpg";
import * as React from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Table  from '@mui/material/Table';
import Container from '@mui/material/Container';
import FormGroup from '@mui/material/FormGroup';
import Box from '@mui/material/Box';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ListProducts from '@/components/listProducts';
import { TextField, Typography } from '@mui/material';

// eslint-disable-next-line react-hooks/rules-of-hooks
const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
function addProduct() {
    return (
        
        <>
         <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      }}>
          <div><h3>Edit Product</h3></div>


           <FormGroup>
             <label>
               Sku: 
             </label>
             <TextField id="outlined-basic" variant="outlined" />
           </FormGroup>
           
           <FormGroup>
             <label>
               Name: 
             </label>
             <TextField id="outlined-basic" variant="outlined" />
             
         </FormGroup>

         <FormGroup>
         <label>
               Description: 
             </label>
             <TextField id="outlined-basic" variant="outlined" />
         </FormGroup>

         <FormGroup>
         <label>
               Price: 
             </label>
             <TextField id="outlined-basic" variant="outlined" />
         </FormGroup>

         <FormGroup>
         <label>
               Is Active: 
             </label>
             <TextField id="outlined-basic" variant="outlined" />
         </FormGroup>

         <FormGroup>
         <label>
               Created At: 
             </label>
             <TextField id="outlined-basic" variant="outlined" />
         </FormGroup>

         <FormGroup>
         <label>
               Updated At: 
             </label>
             <TextField id="outlined-basic" variant="outlined" />
         </FormGroup>

         <FormGroup>
         <label>
               Stock: 
             </label>
             <TextField id="outlined-basic" variant="outlined" />
         </FormGroup>

         <FormGroup>
         <label>
               Photo File Name: 
             </label>
             <TextField id="outlined-basic" variant="outlined" />
         </FormGroup>

           <Button
             
            //  onClick={() => this.insertar()}
           >
             Insertar
           </Button>
        </Box>
        
      </Modal>   
        </>
    )
}

export default addProduct
