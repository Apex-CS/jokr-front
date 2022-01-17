import Head from 'next/head';
import React, { useContext, useEffect, useState } from 'react';
import ListUsers from '@/components/User/ListUsers';
import { styled } from '@mui/material/styles';
/* import { Iproduct } from '@/components/interfaces/InterfaceProduct'; */
import axios from 'axios';
import useSWR from 'swr';
import AddUser from '@/components/User/AddUser';
import { TodosContext } from '@/components/contexts/GlobalProvider';
import toast, { Toaster } from 'react-hot-toast';

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
  Tooltip,
} from '@mui/material';

import Router,{ useRouter } from 'next/router';
import Check from '@/components/Loader/GlobalLoader';

const tableHeader: string[] = ['Email', 'Name', 'Image', 'Role', 'Options'];

export type User = {
  id: number;
  email: string;
  password: string;
  name: string;
  lastName: string;
  getphotoUrl: string;
  getphotoPublicId: string;
  customerPaymentId: string;
  roleName: string;
};

const fetcher = (url: string) =>  axios.get(url,{  headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}}).then((res) => res.data);
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
  const { open, isOpen } = useContext(TodosContext);
  const handleOpen = () => isOpen(true);
  const { success, isSuccess } = useContext(TodosContext);
  const { callback, isCallback } = useContext(TodosContext);
  const router = useRouter();
  useEffect(() => {
    isCallback(!callback);
    if (success) toast.success('Action done correctly!');
    isSuccess(false);

  }, [success]);

  const { data, error } = useSWR('/api/v1/Users', fetcher);
  if (error)  return <Check/> ;
  if (!data) return 'Loading...';
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />

      <Tooltip title="Add a new User" placement="top">
        <div className="wrap">
          <button className="ADD btn5" onClick={handleOpen}>
            +
          </button>
        </div>
      </Tooltip>

      <Container>
        <FormGroup>
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
            {/* Add User */}
            <AddUser />
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

export default Users;
