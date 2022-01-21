import Button from '@mui/material/Button';
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle,
} from '@mui/material/';
import axios from 'axios';
import swal from 'sweetalert';
import Router from 'next/router';
import { mutate } from 'swr';


function DeleteUser(props: { open: boolean; id: number; handleClose: () => void }) {
  const { id, open, handleClose } = props;

  const deleteProduct = async() => {
    try {
      // Make the function async
     await axios.delete(`/api/v1/Users/${id}`, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });
    mutate('/api/v1/Users');
      
      // TODO: Make snackbar appear on successfull/error at delete
    
      handleClose();
    } catch (err) {
      swal({ icon: 'error', text: 'Session Expired', timer: 2000 }).then(function () {
        localStorage.removeItem('token');
        Router.push('/login');
      });
    }
  };

  return (
    <Dialog
      open={id ? open : false} // If id!=null then show the dialog
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {/* <DialogTitle id="alert-dialog-title">You are about to delete a product</DialogTitle> */}
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete the product?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={deleteProduct} autoFocus color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteUser;
