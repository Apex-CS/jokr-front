import React, { Fragment, useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColorOutlined';
import { IconButton, TableCell, TableRow } from '@mui/material';

import EditUser from '@/components/User/EditUser';
import DeleteUser from '@/components/User/DeleteUser';
import { User } from '@/pages/users';
import { textAlign } from '@mui/system';

function ListUsers(props: { user: User }) {
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
    <Fragment>
      <TableRow hover >
        <TableCell align="center">{user.email}</TableCell>
        <TableCell align="center"> {user.name} {user.lastName}</TableCell>
        <TableCell align="center"> {user.getphotoUrl}</TableCell>
        <TableCell align="center">{user.roleName}</TableCell>
        <TableCell align="center">
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
