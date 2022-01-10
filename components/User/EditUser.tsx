import React, { useContext, useState } from 'react';
import {
  Button,
  Grid,
  CardHeader,
  Divider,
  FormControl,
  InputAdornment,
  FormGroup,
  Tooltip,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
  DialogActions,
  FormHelperText,
  Modal,
  Backdrop,
  Fade,
  Box,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { User } from '@/pages/users';
import { TodosContext } from '@/components/contexts/GlobalProvider';
import Loader from '@/components/Loader/LoaderCommon';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-mui';
import Image from 'next/image';
import { ShippingData } from '@/components/User/ValidateFieldsUser';
import Back from '@/public/back.jpg';

type FieldTypes = {
  label: string;
  name: string;
  value: string | number;
};

function EditUser(props: { obj: User; open: boolean; handleClose: any }) {
  const { obj, open, handleClose } = props;

  const { isOpen } = useContext(TodosContext);
  const { callback, isCallback } = useContext(TodosContext);
  const { isSuccess } = useContext(TodosContext);
  const { isLoader } = useContext(TodosContext);

  const [imagesId, setImagesId] = useState<string>(obj.getphotoPublicId);
  const [imagesUrl, setImagesUrl] = useState<string>(obj.getphotoUrl);
  const [loading, setLoading] = useState(false);

  const styleUpload = {
    display: imagesUrl ? 'block' : 'none',
  };

  const handleDestroy = async () => {
    try {
      console.log('desttroy', imagesUrl, 'ID:::', imagesId);
      setLoading(true);
      const imageId = imagesId.toString();
      await axios.delete(`/api/v1/products/image/${imageId}`);
      setImagesId('');
      setImagesUrl('');

      setLoading(false);
    } catch (err) {
      /*  alert(err.response.data.msg) */
    }
  };

  const handleUpload = async (event: any) => {
    try {
      if (!event.files) return alert('No image Selected');

      const file = event.files;
      const formData = new FormData();
      formData.append('file', file);
      if (file.size > 1024 * 1024) return alert('File extended size, it must be of 1080 px');
      if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        return alert('File format is incorrect');
      setLoading(true);
      const res = await axios.post('/api/v1/products/image', formData, {
        headers: { 'content-type': 'multipart/form-data' },
      });
      setLoading(false);
      setImagesId(res.data.id);
      setImagesUrl(res.data.url);
    } catch (err) {
      /*  alert(err.response.data.msg) */
    }
  };

  const editFormFieldsData: FieldTypes[] = [
    { label: 'Email', name: 'sku', value: obj.email },
    { label: 'Name', name: 'name', value: obj.name },
  ];

  /*  const onInputChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditNewProduct({ ...productData, [name]: value });
  }; */

  /*   const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Here will go the axios.post() to edit the selected product
    e.preventDefault();
    // axios.put('http://localhost:8080/products/${id}', { ...productData});
    await axios.put(`/api/v1/Users/${productData.id}`, { ...productData });
    setEditNewProduct(initProduct);
    window.location.reload();
  }; */

  return (
    <Modal
      open={open}
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
            width: 350,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            maxHeight: '98%',
            marginTop: '.1rem',
            borderRadius: '12px',
            overflowX: 'scroll',
            '&::-webkit-scrollbar': {
              width: 0,
            },
          }}
        >
          <Formik
            initialValues={{
    
            }}
            validate={(values) => {
              const errors: Partial<ShippingData> = {};
              //

         

           

              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
             
       /*        values.photoPublicId = imagesId.toString();
              values.photoUrl = imagesUrl.toString(); */
              console.log(values);
              setSubmitting(false);
              await axios.put(`/api/v1/products/${obj.id}`, { ...values });
              isOpen(false);
              isCallback(!callback);
              isSuccess(true);
              isLoader(true);
            }}
          >
            {() => (
              <Grid
                item
                style={{
                  marginTop: '-15px',
                  display: 'flex',
                  flexDirection: 'column',
                  maxWidth: 300,
                  minWidth: 300,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Tooltip title="Close">
                  <Button
                    style={{ marginLeft: '15rem' }}
                    className="button-close"
                    color="error"
                    variant="outlined"
                    size="small"
                    onClick={handleClose}
                  >
                    <b>X</b>
                  </Button>
                </Tooltip>

                <CardHeader
                  sx={{ m: -2, paddingBottom: '-2rem', textAlign: 'center' }}
                  title="Update product: "
                />

                <Typography sx={{ textAlign: 'center' }} variant="h5" component="div">
                  {obj.name}
                </Typography>
                <Form>
                  <Divider />

                  <div className="imageTitle">Select a image: </div>
                  <Tooltip title="Add a image " placement="top">
                    <div className="upload">
                      <input
                        type="file"
                        name="file"
                        id="file_up"
                        onChange={(event: any) => {
                          handleUpload({ files: event.currentTarget.files[0] });
                        }}
                      ></input>

                      {loading ? (
                        <div id="file_Loader">
                          {' '}
                          <Loader />{' '}
                        </div>
                      ) : (
                        <div id="file_img" style={styleUpload}>
                          <Image
                            src={imagesUrl ? imagesUrl : Back}
                            width={500}
                            height={500}
                            alt="Pro_Image"
                          />

                          <span id="file_img_delete" onClick={handleDestroy}>
                            X
                          </span>
                        </div>
                      )}
                    </div>
                  </Tooltip>
                  {editFormFieldsData?.map((field: FieldTypes) => {
                    return (
                      <FormGroup key={field.name}>
                        <FormControl sx={{ m: 1 }}>
                          <Field
                            size="small"
                            component={TextField}
                            margin="normal"
                            label={field.label}
                            name={field.name}
                            variant="outlined"
                            id="outlined-basic"
                            InputProps={{
                              startAdornment: <InputAdornment position="start"></InputAdornment>,
                            }}
                          />
                        </FormControl>
                      </FormGroup>
                    );
                  })}


                 {/*  <FormGroup>
                    <FormControl fullWidth error={category ? false : true}>
                      <InputLabel>Category</InputLabel>
                      <Select
                        name="category"
                        sx={{ m: 1 }}
                        size="small"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Category"
                        value={category ? category : ''}
                        onChange={handleChangeCategory}
                        required
                      >
                        {data?.map((field: FieldCategory) => {
                          return (
                            <MenuItem
                              key={field.id}
                              value={field.name}
                              onClick={CategorySearch(field.id)}
                            >
                              {field.name}{' '}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      <FormHelperText sx={{ marginBottom: '1rem' }}>
                        Select a category and then a subcategory
                      </FormHelperText>
                    </FormControl>
                  </FormGroup> */}

                  <DialogActions>
                    <Button type="submit" variant="outlined" sx={{ m: 0.5 }}>
                      Submit
                    </Button>
                  </DialogActions>
                </Form>
              </Grid>
            )}
          </Formik>
        </Box>
      </Fade>
    </Modal>
  );
}

export default EditUser;
