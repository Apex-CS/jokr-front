import Head from 'next/head';
import React, { useState } from 'react';
import ListProducts from '@/components/ListProducts';
import { styled } from '@mui/material/styles';
/* import { Iproduct } from '@/components/interfaces/InterfaceProduct'; */
import axios from 'axios';
import useSWR from 'swr';
import AddProduct from '@/components/AddProduct';
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
  FormGroup,
  Container,
} from '@mui/material';

/* interface IProps {
  onAddProduct: (product: Iproduct) => void;
  product: Array<Iproduct>;
  onEdit: (product: Iproduct) => void;
} */

const tableHeader: string[] = [
  'ID',
  'Sku',
  'Name',
  'Description',
  'Price',
  'Is Active',
  'Created At',
  'Updated At',
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
  is_active: number;
  created_at: string;
  updated_at: string;
  stock: number;
  subcategory: string;
  photo_file_name: string;
  
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
function Products() {
  /* Saber si el conext edit esta activo pero no sirve el cambio de estados entre componentees UseContext */
  /*   let state: any = {}; state = React.useContext(ToolsContext);
  const [ModalEditActive,setModalEditActive] = React.useState<Boolean>(state.state.ProductAdmin.isModalProducts)
   */
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

  const { data, error } = useSWR('/api/v1/products', fetcher);
  console.log(data)
  if (error) return 'An error has occurred.' + error;
  if (!data) return 'Loading...';
  return (
    <>
      <Head>
        <title>ApexShop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <FormGroup>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            New Product
          </Button>

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
}

export default Products;
