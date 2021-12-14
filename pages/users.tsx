import Head from 'next/head';
import React, { useState } from 'react';
import ListUsers from '@/components/ListUsers';
import { styled } from '@mui/material/styles';
/* import { Iproduct } from '@/components/interfaces/InterfaceProduct'; */
import axios from 'axios';
import useSWR from 'swr';
import AddUser from '@/components/AddUser';
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
  'Updated_at',
  'Options',
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
            <Table>
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
                {data?.map((user: User) => {
                  return <ListUsers key={user.id} user={user} />;
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
            <AddUser />
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default Users;
