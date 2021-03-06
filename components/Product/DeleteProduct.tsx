import Button from '@mui/material/Button';
import axios from 'axios';
import { TodosContext } from '@/components/contexts/GlobalProvider';
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle,
} from '@mui/material/';
import { useContext } from 'react';
import Router from 'next/router';
import swal from 'sweetalert';

function DeleteProduct(props: { open: boolean; id: number; handleClose: () => void }) {
  const { id, open, handleClose } = props;
  const { callback, isCallback } = useContext(TodosContext);
  const {  isSuccess } = useContext(TodosContext);
  const deleteProduct = async() => {
    // Make the function async
    try {
      await axios.delete(`/api/v1/products/${id}`,{
        headers: {Authorization:  'Bearer '+localStorage.getItem('token')}
      });
      // TODO: Make snackbar appear on successfull/error at delete
      handleClose();
      isCallback(!callback);
      isSuccess(true);
    }catch(err){
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

export default DeleteProduct;
