import React, { useEffect, useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColorOutlined';
import { IconButton, TableCell, TableRow, Backdrop, Fade, Modal, Box } from '@mui/material';
import EditProduct from '@/components/EditProduct';
import DeleteProduct from '@/components/DeleteProduct';
type Product = {
  di: number;
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

function ListProducts(props: { key: number ; product: Product; }) {
  const { product } = props;
  const [openEdit, setOpenEdit] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [iduser, setIdProduct] = useState<number>(0);
  console.log(props);
  const handleClose = () => setOpenEdit(false);
  const handleDelClose = () => setOpenDel(false);

  const changeStateEdit = () => {
    setOpenEdit(true);
    setIdProduct(product.di);
  };

  const changeStateDelete = () => {
    setOpenDel(true);
    setIdProduct(product.di);
  };

  return (
    <>
      <TableRow hover>
        <TableCell align="right">{product.di}</TableCell>
        <TableCell align="right">{product.sku}</TableCell>
        <TableCell align="right">{product.name}</TableCell>
        <TableCell align="right">{product.description}</TableCell>
        <TableCell align="right">{product.price}</TableCell>
        <TableCell align="right">{product.is_active}</TableCell>
        <TableCell align="right">{product.created_at}</TableCell>
        <TableCell align="right">{product.updated_at}</TableCell>
        <TableCell align="right">{product.stock}</TableCell>
        <TableCell align="right">{product.photo_file_name}</TableCell>
        <TableCell align="right">
          <IconButton color="warning" onClick={changeStateEdit}>
            <BorderColorIcon />
          </IconButton>
          <IconButton color="error" onClick={changeStateDelete}>
            <DeleteForeverIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <EditProduct obj={product} id={iduser} open={openEdit} handleClose={handleClose} />
      <DeleteProduct id={iduser} open={openDel} handleClose={handleDelClose} />
    </>
  );
}

export default ListProducts;
