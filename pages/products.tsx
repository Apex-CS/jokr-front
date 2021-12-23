import Head from 'next/head';
import React, { useContext, useEffect, useState } from 'react';
import ListProducts from '@/components/Product/ListProducts';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import useSWR from 'swr';
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
import { TodosContext } from '@/components/contexts';

const tableHeader: string[] = [
  'Sku',
  'Name',
  'Description',
  'Price',
  'Stock',
  'Subcategory',
  'Photo File Name',
  'Options',
];

type Product = {
  id: number;
  sku: string;
  name: string;
  description: string;
  price: number;
  // is_active: number;
  // created_at: string;
  // updated_at: string;
  stock: number;
  subcategory: string;
  photo_file_name: string;
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
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
  const { open , isOpen} = useContext(TodosContext);
  const handleOpen = () => isOpen(true);
/*   const handleClose = () => isOpen(false); */

  const { data, error } = useSWR('/api/v1/products', fetcher);
  if (error) return 'An error has occurred.' + error;
  if (!data) return 'Loading...';
  return (
    <>
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
      

      <Container >
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
                {data?.map((pro: Product) => {
                  return <ListProducts key={pro.id} product={pro} />;
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </FormGroup>
      </Container>

      <Modal
        open={open}
/*         onClose={handleClose} */
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

export default Products;
