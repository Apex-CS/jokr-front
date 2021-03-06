import React, { Fragment, useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColorOutlined';
import { IconButton, TableCell, TableRow } from '@mui/material';
import DeleteUser from '@/components/User/DeleteUser';
import { DataAddress } from '@/pages/User/account';

function ListAdress(props: { address: DataAddress }) {

    const { address} = props;
    
    const [openDel, setOpenDel] = useState(false);
    const [iduser, setIdProduct] = useState<number>(0);
  

    const handleDelClose = () => setOpenDel(false);
  

  
    const changeStateDelete = () => {
      setOpenDel(true);
      setIdProduct(address.id);
    };

    return (
        <Fragment>
        <TableRow hover >
          <TableCell align="center">{address.street1}</TableCell>
          <TableCell align="center"> { address.street2}</TableCell>
          <TableCell align="center"> { address.colonia}</TableCell>
          <TableCell align="center"> { address.municipio}</TableCell>
          <TableCell align="center"> { address.state}</TableCell>
          <TableCell align="center"> { address.country}</TableCell>
          <TableCell align="center"> { address.postal_code}</TableCell>
          <TableCell align="center"> { address.recipient_name}</TableCell>
          <TableCell align="center"> { address.phone}</TableCell>
          <TableCell align="center"> { address.is_default_billing_address.toString()}</TableCell>
          <TableCell align="center"> { address.is_default_shipping_address.toString()}</TableCell>
          <TableCell align="center">
            <IconButton color="error" onClick={changeStateDelete}>
              <DeleteForeverIcon />
            </IconButton>
          </TableCell>
        </TableRow>
  

        {/* <DeleteUser id={iduser} open={openDel} handleClose={handleDelClose} /> */}
      </Fragment>
    )
}

export default ListAdress
