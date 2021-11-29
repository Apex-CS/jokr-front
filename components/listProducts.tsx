import React, { useEffect, useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColorOutlined';
import { IconButton, Modal, Box, TableCell, TableRow, Backdrop, Fade } from '@mui/material';
import EditProduct from '@/components/EditProduct';

type User = {
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

function ListProducts(props: { user: User; key: number }) {
  const { user } = props;

  const editData = {
    id: user.id,
    sku: user.sku,
    name: user.name,
    description: user.description,
    price: user.price,
    is_active: user.is_active,
    created_at: user.created_at,
    updated_at: user.updated_at,
    stock: user.stock,
    photo_file_name: user.photo_file_name,
  };

  const [obj] = useState({ editData });

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [iduser, setIdUser] = useState<number>();
  const changeStateEdit = () => {
    setOpen(true);
    setIdUser(user.id);
  };

  useEffect(() => {
    if (open) {
      console.log(iduser);
    }
  });
  return (
    <>
      <TableRow hover>
        <TableCell align="right">{user.id}</TableCell>
        <TableCell align="right">{user.sku}</TableCell>
        <TableCell align="right">{user.name}</TableCell>
        <TableCell align="right">{user.description}</TableCell>
        <TableCell align="right">{user.price}</TableCell>
        <TableCell align="right">{user.is_active}</TableCell>
        <TableCell align="right">{user.created_at}</TableCell>
        <TableCell align="right">{user.updated_at}</TableCell>
        <TableCell align="right">{user.stock}</TableCell>
        <TableCell align="right">{user.photo_file_name}</TableCell>
        <TableCell align="right">
          <IconButton color="warning" onClick={changeStateEdit}>
            <BorderColorIcon />
          </IconButton>
          <IconButton color="error">
            <DeleteForeverIcon />
          </IconButton>
        </TableCell>
      </TableRow>

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
              height: '100%',
              borderRadius: '2%',
            }}
          >
            {/* AQUI LLAMO EL RESTO DEL MODAL el form para agregar Nuevo Productos */}
            <EditProduct obj={obj.editData} />
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default ListProducts;
