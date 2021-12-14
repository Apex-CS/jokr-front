import Button from '@mui/material/Button';
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle,
} from '@mui/material/';
import axios from 'axios';

function refreshPage() {
  window.location.reload();
}

function DeleteUser(props: { open: boolean; id: number; handleClose: () => void }) {
  const { id, open, handleClose } = props;

  const deleteProduct = () => {
    // Make the function async
    axios.delete(`/api/v1/Users/${id}`);
    // TODO: Make snackbar appear on successfull/error at delete
    refreshPage();
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

export default DeleteUser;
