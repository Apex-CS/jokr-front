import Head from 'next/head';
import React, { useContext, useEffect, useState } from 'react';
import ListProducts from '@/components/Product/ListProducts';
import { styled } from '@mui/material/styles';

import AddProduct from '@/components/Product/AddProduct';
import {
  Modal,
  Tooltip,
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
  FormGroup,
  Container,
} from '@mui/material';
import { TodosContext } from '@/components/contexts/GlobalProvider';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import Router from 'next/router';

const tableHeader: string[] = [
  'Sku',
  'Name',
  'Description',
  'Price',
  'Stock',
  'Category',
  'Subcategory',
  'Photo File Name',
  'Options',
];

export type Product = {
  description: string;
  id: number;
  name: string;
  photoPublicId: string;
  photoUrl: string;
  price: number;
  sku: string;
  stock: number;
  subcategories: {
    categories: {
      id: number;
      name: string;
    };
  };
  subcategoriesName: string;
};

function Products() {
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
  const { open, isOpen } = useContext(TodosContext);
  const handleOpen = () => isOpen(true);

  /* const { AllProducts } = useContext(TodosContext);  */
  const { success, isSuccess } = useContext(TodosContext);
  const { callback, isCallback } = useContext(TodosContext);
  const { Login, IsLogged } = useContext(TodosContext);
  const { AllProductsAdmin} = useContext(TodosContext);
/*   const [AllProducts, setAllProducts] = useState([]); */

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Head>
        <title>ApexShop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Tooltip title="Add a new Product" placement="top">
        <div className="wrap">
          <button className="ADD btn5" onClick={handleOpen}>
            +
          </button>
        </div>
      </Tooltip>

      <Container>
        <FormGroup>
          <TableContainer component={Paper}>
            <Table /*  sx={{ minWidth: "100%", alignItems:"center"}} */ /* aria-label="simple table" */
            >
              <TableHead>
                <TableRow>
                  {tableHeader?.map((header: string) => {
                    return (
                      <StyledTableCell align="center" key={header}>
                        {header}
                      </StyledTableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {AllProductsAdmin?.map((pro: Product) => {
                  return <ListProducts key={pro.id} product={pro} />;
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </FormGroup>
      </Container>

      <Modal
        open={open}
        /* onClose={handleClose}  */
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
              width: 350,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              maxHeight: '98%',
              marginTop: '.1rem',
              borderRadius: '12px',
              overflowX: 'scroll',
              '&::-webkit-scrollbar': {
                width: 0,
              },
            }}
          >
            {/* AQUI LLAMO EL RESTO DEL MODAL el form para agregar Nuevo Productos */}
            <AddProduct />
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      protected: true,
      userTypes: ['Admin'],
    },
  };
}

export default Products;
