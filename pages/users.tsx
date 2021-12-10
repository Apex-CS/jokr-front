import Head from 'next/head';
import React, { useState } from 'react';
import ListUsers from '@/components/ListUsers';
import { styled } from '@mui/material/styles';
/* import { Iproduct } from '@/components/interfaces/InterfaceProduct'; */
import axios from 'axios';
import useSWR from 'swr';
import AddProduct from '@/components/AddUser';
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
  'Email',
  'Is_active',
  'Lastname',
  'Name',
  'Password',
  'Role',
  'Created_at',
  'Delete_at',
  'Updated_at'
];

type User = {
  id: number;
  email: string;
  name: string;
  is_active: number;
  lastName: string;
  password: string;
  role: string;
  created_at: string;
  delete_at: string;
  updated_at: string;
  
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
function Users() {
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

  const { data, error } = useSWR('/api/v1/Users', fetcher);
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
            New User
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
              
              {data?.map((pro: User) => (
                <TableRow
                  key={pro.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="right">{pro.id.toString()}</TableCell>
                  <TableCell align="right">{pro.email}</TableCell>
                  <TableCell align="right">{pro.name}</TableCell>
                  <TableCell align="right">{pro.is_active.toString()}1</TableCell>
                  <TableCell align="right">{pro.lastName}</TableCell>
                  <TableCell align="right">{pro.password}</TableCell>
                  <TableCell align="right">{pro.role}</TableCell>
                  <TableCell align="right">{pro.created_at.toString()}</TableCell>
                  <TableCell align="right">{pro.delete_at}</TableCell>
                  <TableCell align="right">{pro.updated_at}</TableCell>

                  
                </TableRow>
              ))}
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

export default Users;
