import React, { useContext, useEffect, useState } from 'react';
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
import Image from 'next/image';
import Back from '@/public/back.jpg';
import axios from 'axios';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-mui';
import { Product } from '@/pages/products';
import { ShippingData } from '@/components/Product/ValidateFields';
import { FieldCategory } from '@/components/Product/ValidateFields';
import useSWR from 'swr';
import Loader from '@/components/Loader/LoaderCommon';
import { TodosContext } from '@/components/contexts/GlobalProvider';
import Router from 'next/router';
import swal from 'sweetalert';

type FieldTypes = {
  label: string;
  name: string;
  value: string | number;
};

/* const fetcher = (url:string) => {
  const auth = JSON.stringify(localStorage.getItem('token') || '');
  if (auth != '') return axios
      .get(url, { 
          headers: { 
              'Authorization': 'Bearer '+localStorage.getItem('token')
          }
      })
      .then((res) => res.data);
} */

function EditProduct(props: { obj: Product; open: boolean;  handleClose: () => void  }) {
  const { obj, open, handleClose } = props;
  const { isOpen } = useContext(TodosContext);
  const { callback, isCallback } = useContext(TodosContext);
  const { isSuccess } = useContext(TodosContext);
  const { isLoader } = useContext(TodosContext);
  const [data, setData] = useState([]);
  
  /* CLOSE MODAL */

  /* CATEGORY */
  /*   const { data } = useSWR('/api/v1/categories', fetcher); */

  const [idSub, setIdsub] = useState<number>(obj.subcategories.categories.id);
  const [listSub, setListSub] = useState([]);

  useEffect(() => {
    try {
      isCallback(!callback);

      const getSubFuction = async () => {
        const res = await axios.get(`/api/v1/subcategories/categories/${idSub}`, {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        });
        setListSub(res.data);
      };
      getSubFuction();

      const AllCategoriesFunction = async () => {
        const res = await axios.get('/api/v1/categories', {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        });
        setData(res.data);
      };
      AllCategoriesFunction();
    } catch (err) {
      swal({ icon: 'error', text: 'Session Expired', timer: 2000 }).then(function () {
        localStorage.removeItem('token');
        Router.push('/login');
      });
    }
  }, [idSub]);

  const [disableSub, SetdisableSub] = useState(false);
  const [category, setCategory] = useState<string>(obj.subcategories.categories.name);
  const [subCategory, setSubCategory] = useState<string>(obj.subcategoriesName);

  const CategorySearch = (id: any) => async () => {
    const res = await axios.get(`/api/v1/subcategories/categories/${id}`, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
    });
    setListSub(res.data);
    SetdisableSub(true);

    setIdsub(id);
  };

  const handleChangeCategory = async (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
    setSubCategory('');
  };

  const handleChangeSubCategory = async (event: SelectChangeEvent) => {
    setSubCategory(event.target.value as string);
  };

  /* IMAGES */
  const [imagesId, setImagesId] = useState<string>(obj.photoPublicId);
  const [imagesUrl, setImagesUrl] = useState<string>(obj.photoUrl);
  const [loading, setLoading] = useState(false);

  const styleUpload = {
    display: imagesUrl ? 'block' : 'none',
  };

  const handleDestroy = async () => {
    try {
      console.log('desttroy', imagesUrl, 'ID:::', imagesId);
      setLoading(true);
      const imageId = imagesId.toString();
      await axios.delete(`/api/v1/products/image/${imageId}`, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });
      setImagesId('');
      setImagesUrl('');

      setLoading(false);
    } catch (err) {
      localStorage.removeItem('token');
      Router.push('/login');
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
        headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + localStorage.getItem('token') },
      });
      setLoading(false);
      setImagesId(res.data.id);
      setImagesUrl(res.data.url);
    } catch (err) {
      swal({ icon: 'error', text: 'Session Expired', timer: 2000 }).then(function () {
        localStorage.removeItem('token');
        Router.push('/login');
      });
    }
  };

  /* VALIDATE DATA */

  const editFormFieldsData: FieldTypes[] = [
    { label: 'Sku', name: 'sku', value: obj.sku },
    { label: 'Name', name: 'name', value: obj.name },
    { label: 'Description', name: 'description', value: obj.description },
    { label: 'Price', name: 'price', value: obj.price },
    { label: 'Stock', name: 'stock', value: obj.stock },
    /*     { label: 'Subcategory', name: 'subcategory', value: obj.subcategory },
    { label: 'Image', name: 'photo_file_name', value: obj.photo_file_name }, */
  ];

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
              sku: `${obj.sku}`,
              name: `${obj.name}`,
              description: `${obj.description}`,
              price: `${obj.price}`,
              stock: `${obj.stock}`,
              subcategories: {},
              photoPublicId: '',
              photoUrl: '',
            }}
            validate={(values) => {
              const errors: Partial<ShippingData> = {};
              //

              !values.sku && (errors.sku = 'Required Field');
              !values.name && (errors.name = 'Required Field');
              !values.description && (errors.description = 'Required Field');
              !values.price && (errors.price = 'Required Field');
              !values.stock && (errors.stock = 'Required Field');

              if (!/^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/.test(values.price)) {
                errors.price = 'Incorrect price, not a number';
              }

              if (!/^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/.test(values.stock)) {
                errors.price = 'Incorrect stock, not a number';
              }

              if (values.sku.length > 10) {
                errors.sku = 'Too long';
              }

              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              values.subcategories = { name: subCategory };
              values.photoPublicId = imagesId.toString();
              values.photoUrl = imagesUrl.toString();
              
              setSubmitting(false);
              
              await axios.put(`/api/v1/products/${obj.id}`,
               { ...values }, 
               {  headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}
               );
               handleClose();
     
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
                  <FormGroup>
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
                  </FormGroup>
                  <FormGroup>
                    <FormControl
                      fullWidth
                      disabled={disableSub ? false : true}
                      error={subCategory ? false : true}
                    >
                      <InputLabel sx={{ padding: '10px' }}> Sub Category</InputLabel>
                      <Select
                        sx={{ m: 1 }}
                        required
                        name="subcategory"
                        size="small"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Sub Category"
                        value={subCategory ? subCategory : ''}
                        onChange={handleChangeSubCategory}
                      >
                        {listSub?.map((field: FieldCategory) => {
                          return (
                            <MenuItem key={field.id} value={field.name}>
                              {field.name}{' '}
                            </MenuItem>
                          );
                        })}
                      </Select>

                      <FormHelperText>Select a subcategory</FormHelperText>
                    </FormControl>
                  </FormGroup>
                  <DialogActions>
                    <Button type="submit" variant="outlined" sx={{ m: 0.5 }}>
                      Submit
                    </Button>
                  </DialogActions>
                  {/*  <Box>
                    <Button type="submit" color="secondary" variant="contained" sx= {{marginRight:'5px'}}>
                      Cancel
                    </Button>
                    <Button
                      disabled={isSubmitting}
                      onClick={submitForm}
                      color="primary"
                      variant="contained"
                    >
                      Save
                    </Button>
                  </Box> */}
                </Form>
              </Grid>
            )}
          </Formik>
        </Box>
      </Fade>
    </Modal>
  );
}

export default EditProduct;
