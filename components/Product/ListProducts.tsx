import React, { Fragment, useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColorOutlined';
import { IconButton, TableCell, TableRow } from '@mui/material';
import EditProduct from '@/components/Product/EditProduct';
import DeleteProduct from '@/components/Product/DeleteProduct';
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

function ListProducts(props: { product: Product }) {
  const { product } = props;
  const [openEdit, setOpenEdit] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [iduser, setIdProduct] = useState<number>(0);

  const handleClose = () => setOpenEdit(false);
  const handleDelClose = () => setOpenDel(false);

  const changeStateEdit = () => {
    setOpenEdit(true);
    setIdProduct(product.id);
  };

  const changeStateDelete = () => {
    setOpenDel(true);
    setIdProduct(product.id);
  };

  return (
    <Fragment>
      <TableRow hover>
        {/* <TableCell align="right">{product.id.toString()}</TableCell> */}
        <TableCell align="right">{product.sku}</TableCell>
        <TableCell align="right">{product.name}</TableCell>
        <TableCell align="right">{product.description}</TableCell>
        <TableCell align="right">{product.price.toString()}</TableCell>
        {/* <TableCell align="right">{product.is_active.toString()}</TableCell>
        <TableCell align="right">{product.created_at}</TableCell>
        <TableCell align="right">{product.updated_at}</TableCell> */}
        <TableCell align="right">{product.stock}</TableCell>
        <TableCell align="right">{product.subcategory}</TableCell>
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
      <EditProduct obj={product} open={openEdit} handleClose={handleClose} />
      <DeleteProduct id={iduser} open={openDel} handleClose={handleDelClose} />
    </Fragment>
  );
}

export default ListProducts;
