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



const style = {
  fontStyle: 'Arial',
  backgroundImage: `url(${background1})`,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,

};




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



const fetcher = (url: string) => axios.get(url).then((res) => res.data);



function Home() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  

  
  const router = useRouter()


  


  const handleClick = () => {
    router.push('/post')
  }
  const { data, error } = useSWR('http://localhost:8080/products', fetcher);
  if (error) return 'An error has occurred.' + error;
  if (!data) return 'Loading...';

  
  return (
    
    
    


    <div className={styles.container}>

      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
            
      <main className={styles.main}>

        
      
        
      
      <Button color="success" onClick={handleOpen}>
  Create
</Button>
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
          <div><h3>Create product</h3></div>


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
      <br/>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Sku</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Is Active</TableCell>
            <TableCell align="right">Created At</TableCell>
            <TableCell align="right">Updated At</TableCell>
            <TableCell align="right">Stock</TableCell>
            <TableCell align="right">Photo File Name</TableCell>
            <TableCell align="center">Button</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
            
              
            
             {data?.map((usr: User) => {
            // <li key={usr.id}>{usr.name}-{usr.email}</li>
            return <ListProducts key={usr.id} user={usr}/>
})}
              
            
          
           
        </TableBody>
      </Table>
    </TableContainer>
      
      
        
        {/* <DetailTable products={products} /> */}
      </main>
    
      <label>Ingresar un nuevo usuario: </label>
      <a href={'/post'} onClick={handleClick}>ver</a>
      

    </div>
  );
}



export default Home;
