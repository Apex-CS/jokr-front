import Button from '@mui/material/Button';
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle,
} from '@mui/material/';
import axios from 'axios';

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

function DeleteProduct(props: { open: boolean; id: number; handleClose: () => void }) {
  const { id, open, handleClose } = props;

  const deleteProduct = () => {
    // Make the function async
    axios.delete(`http://localhost:8080/products/${id}`);
    // TODO: Make snackbar appear on successfull/error at delete
    handleClose();
  };

  return (
    <Dialog
      open={id ? open : false} // If id!=null then show the dialog
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">You are about to delete a product</DialogTitle>
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
