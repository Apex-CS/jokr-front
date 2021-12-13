import React, { Fragment, useEffect, useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColorOutlined';
import { IconButton, TableCell, TableRow, Backdrop, Fade, Modal, Box } from '@mui/material';

import EditUser from '@/components/EditUser';
import DeleteUser from '@/components/DeleteUser';

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

function ListUsers(props: { user: User}) {

  const { user } = props;
  const [openEdit, setOpenEdit] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [iduser, setIdProduct] = useState<number>(0);

  const handleClose = () => setOpenEdit(false);
  const handleDelClose = () => setOpenDel(false);

  const changeStateEdit = () => {
    setOpenEdit(true);
    setIdProduct(user.id);
  };

  const changeStateDelete = () => {
    setOpenDel(true);
    setIdProduct(user.id);
  };

  return (
    <Fragment >
      <TableRow hover>
        <TableCell align="right">{user.id.toString()}</TableCell>
        <TableCell align="right">{user.email}</TableCell>
        <TableCell align="right">{user.is_active.toString()}</TableCell>
        <TableCell align="right">{user.lastName}</TableCell>
        <TableCell align="right">{user.name}</TableCell>
        <TableCell align="right">{user.password}</TableCell>
        <TableCell align="right">{user.role}</TableCell>
        <TableCell align="right">{user.created_at}</TableCell>
        <TableCell align="right">{user.delete_at}</TableCell>
        <TableCell align="right">{user.updated_at}</TableCell>
        
        <TableCell align="right">
          <IconButton color="warning" onClick={changeStateEdit}>
            <BorderColorIcon />
          </IconButton>
          <IconButton color="error" onClick={changeStateDelete}>
            <DeleteForeverIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      <EditUser obj={user} open={openEdit} handleClose={handleClose} />
      <DeleteUser id={iduser} open={openDel} handleClose={handleDelClose} />

    </Fragment>
  );
}

export default ListUsers;
