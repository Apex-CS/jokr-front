import React, { useEffect, useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColorOutlined';
import { IconButton, TableCell, TableRow, Backdrop, Fade, Modal, Box } from '@mui/material';
import EditProduct from '@/components/EditProduct';

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
  photo_file_name: string;
};

function ListProducts(props: { product: Product; key: number }) {
  const [product, setProduct] = useState<Product>(props.product);
  const [open, setOpen] = useState(false);
  const [iduser, setIdProduct] = useState<number>();

  const handleClose = () => setOpen(false);

  const changeStateEdit = () => {
    setOpen(true);
    setIdProduct(product.id);
  };

  useEffect(() => {
    if (open) {
      console.log(iduser);
    }
  });

  return (
    <>
      <TableRow hover>
        <TableCell align="right">{product.id}</TableCell>
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
          <IconButton color="error">
            <DeleteForeverIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <EditProduct obj={product} open={open} handleClose={handleClose} />
    </>
  );
}

export default ListProducts;
