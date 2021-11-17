import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material/';

type Product = {
  id: number;
  sku: number;
};

export default function DetailTable(props: { products: Product[] }) {
  const products: Product[] = props.products;
  console.log(products);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">SKU</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products?.map((prod: Product) => (
            <TableRow key={prod.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {prod.id}
              </TableCell>
              <TableCell align="right">{prod.id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
