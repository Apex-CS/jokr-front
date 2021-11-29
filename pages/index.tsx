import Head from 'next/head';
import React, { useState } from 'react';
import ListProducts from '@/components/listProducts';
import { styled } from '@mui/material/styles';
import {
  Modal,
  Button,
  Table,
  Box,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  tableCellClasses,
  Backdrop,
  Fade,
  Grid,
  FormGroup,
  Container,
} from '@mui/material';
import { Iproduct } from '@/components/interfaces/interfaceProduct';
import axios from 'axios';
import useSWR from 'swr';
import AddProduct from '@/components/addProduct';

interface IProps {
  onAddProduct: (product: Iproduct) => void;
  product: Array<Iproduct>;
  onEdit: (product: Iproduct) => void;
}

type Product = {
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

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
const Home = () => {
  /* Saber si el conext edit esta activo pero no sirve el cambio de estados entre componentees UseContext */
  /*   let state: any = {};
  state = React.useContext(ToolsContext);
  const [ModalEditActive,setModalEditActive] = React.useState<Boolean>(state.state.ProductAdmin.isModalProducts)
   */

  /*   console.log(state.state.ProductAdmin.isModalProducts) */
  /* COLOR HEADER TABLE */
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  /* Check if state edit is enable */

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data, error } = useSWR('http://localhost:8080/api/showProducts', fetcher);

  if (error) return 'An error has occurred.' + error;
  if (!data) return 'Loading...';
  return (
    <>
      <Head>
        <title>ApexShop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Container >
        
        <FormGroup >
        <Button variant="contained" color="primary" onClick={handleOpen}>
        Create a new Product
      </Button>
      
      
      <br />
      <br />
      
        <TableContainer component={Paper}>
          <Table /*  sx={{ minWidth: "100%", alignItems:"center"}} */ /* aria-label="simple table" */
          >
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">ID</StyledTableCell>
                <StyledTableCell align="center">Sku</StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Description</StyledTableCell>
                <StyledTableCell align="center">Price</StyledTableCell>
                <StyledTableCell align="center">Is Active</StyledTableCell>
                <StyledTableCell align="center">Created At</StyledTableCell>
                <StyledTableCell align="center">Updated At</StyledTableCell>
                <StyledTableCell align="center">Stock</StyledTableCell>
                <StyledTableCell align="center">Photo File Name</StyledTableCell>
                <StyledTableCell align="center">Options</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((usr: Product) => {
                return <ListProducts key={usr.id} user={usr} />;
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </FormGroup>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 1500,
        }}
        className="modalProduct"
      >
        <Fade in={open}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              maxHeight: '90%',
              marginTop: '-1rem',
              overflow: 'scroll',
              
            }}
          >
            {/* AQUI LLAMO EL RESTO DEL MODAL el form para agregar Nuevo Productos */}
            <AddProduct />
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default Home;
