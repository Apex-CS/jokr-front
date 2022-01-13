import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import Image from 'next/image';
import { TodosContext } from '@/components/contexts/GlobalProvider';
import Back from '@/public/back.jpg';
import swal from 'sweetalert';

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
} from '@mui/material';

import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import Loader from '@/components/Loader/LoaderCommon';
import Router from 'next/router';
export interface ShippingData {
  sku: string;
  name: string;
  description: string;
  price: string;
  stock: string;
  subcategories: {
    name: string;
  };
  photoPublicId: string;
  photoUrl: string;
}

type FieldTypes = {
  name: string | number;
  type: string | number;
  label: string;
  placeholder: string;
  value: string | number;
};

export type FieldCategory = {
  id: number;
  name: string;
  categories: {
    id: number;
    name: string;
  };
};

const AddlabelsConfing: FieldTypes[] = [
  { name: 'sku', type: 'sku', label: 'New sku code', placeholder: 'Sku', value: '' },
  { name: 'name', type: 'name', label: 'New name of product', placeholder: 'Name', value: '' },
  {
    name: 'description',
    type: 'description',
    label: 'Description',
    placeholder: 'Description',
    value: '',
  },
  { name: 'price', type: 'number', label: 'Price', placeholder: 'Price', value: '' },
  { name: 'stock', type: 'number', label: 'Stock', placeholder: 'Stock', value: '' },
];

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

function ShippingForm() {
  const { Token } = useContext(TodosContext);
  const { open, isOpen } = useContext(TodosContext);
  const { callback, isCallback } = useContext(TodosContext);
  const { isSuccess } = useContext(TodosContext);
  const { isLoader } = useContext(TodosContext);

  const [data, setData] = useState([]);

  const [category, setCategory] = useState<string>('');
  const [subCategory, setSubCategory] = useState<string>('');
  const [listSub, setListSub] = useState([]);
  const [disableSub, SetdisableSub] = useState(false);

  const handleChangeCategory = async (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
    setSubCategory('');
  };

  const handleChangeSubCategory = async (event: SelectChangeEvent) => {
    setSubCategory(event.target.value as string);
  };

  /* const { data } = useSWR('/api/v1/categories', fetcher,); */

  /* 'Bearer '+localStorage.getItem('token') */
  /* headers: {Authorization:  'Bearer '+localStorage.getItem('token')?.toString()!} */
 
  useEffect(() => {
    isCallback(!callback);
    const AllCategoriesFunction = async () => {
      try {
        const res = await axios.get('/api/v1/categories', {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        });
        setData(res.data);
      } catch (err) {
        swal({ icon: 'error', text: 'Session Expired', timer: 2000 }).then(function () {
          localStorage.removeItem('token');
          Router.push('/login');
        });
      }
    };
    AllCategoriesFunction();
  }, []);

  /* IMAGES */
  const handleClose = () => {
    isOpen(false);
    if (imagesId) handleDestroyClose(imagesId);
  };
  const [imagesId, setImagesId] = useState<string>('');
  const [imagesUrl, setImagesUrl] = useState<string>('');
  /* console.log('info', imagesUrl, typeof imagesUrl); */

  const [loading, setLoading] = useState(false);

  const styleUpload = {
    display: imagesUrl ? 'block' : 'none',
  };

  const CategorySearch = (id: any) => async () => {
    const res = await axios.get(`/api/v1/subcategories/categories/${id}`, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token')?.toString()! },
    });
    isCallback(!callback);
    setListSub(res.data);
    SetdisableSub(true);
  };

  const handleDestroyClose = async (id: any) =>
    await axios.delete(`/api/v1/products/image/${id}`, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token')?.toString()! },
    });

  const handleDestroy = async () => {
    try {
      setLoading(true);
      const imageId = imagesId.toString();
      await axios.delete(`/api/v1/products/image/${imageId}`, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token')?.toString()! },
      });
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
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: 'Bearer ' + localStorage.getItem('token')?.toString()!,
        },
      });
      setLoading(false);
      setImagesId(res.data.id);
      setImagesUrl(res.data.url);
    } catch (err) {
      /*  alert(err.response.data.msg) */
    }
  };
  /* IMAGES */
  return (
    <>
      <Formik
        initialValues={{
          sku: '',
          name: '',
          description: '',
          price: '',
          stock: '',
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

          /*    if(  !values.file ) {
            toast.error("No image selected.", {
              position: 'top-center',
              icon: '👎👎',
              style: {
                position:'sticky',
                marginTop:'51rem', 
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              }
            })
          } 
          */
          if (
            !/^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/.test(values.price) ||
            Number(values.price) <= 10
          ) {
            errors.price = 'Incorrect price it must be higher of 10';
          }
          if (!/^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/.test(values.stock)) {
            errors.stock = 'Incorrect number';
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          values.subcategories = { name: subCategory };
          values.photoPublicId = imagesId.toString();
          values.photoUrl = imagesUrl.toString();

          setSubmitting(false);
          await axios.post(
            '/api/v1/products',
            { ...values },
            { headers: { Authorization: 'Bearer ' + localStorage.getItem('token')?.toString()! } }
          );
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
              title="Add a new product"
            />
            <Form>
              <Divider />

              <div className="imageTitle">Select a image: </div>
              <Tooltip title="Add a image " placement="top">
                <div className="upload">
                  <input
                    required
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
              {AddlabelsConfing?.map((field: FieldTypes) => {
                return (
                  <FormGroup key={field.name}>
                    <FormControl sx={{ m: 1 }}>
                      <Field
                        size="small"
                        component={TextField}
                        name={field.name}
                        type={field.type}
                        label={field.label}
                        placeholder={field.placeholder}
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
                    value={category}
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
                  <FormHelperText>Select a category and then a subcategory</FormHelperText>
                </FormControl>
              </FormGroup>

              {/*   <FormControl sx={{ m: 1 }} fullWidth disabled={disableSub ? false : true}>
              <InputLabel id="demo-simple-select-label"> Sub Category</InputLabel>
              <Select required
                name="subcategory"
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Sub Category"
                value={subCategory}
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
            </FormControl>  */}
              <FormGroup>
                <FormControl
                  fullWidth
                  disabled={disableSub ? false : true}
                  error={subCategory ? false : true}
                >
                  <InputLabel> Sub Category</InputLabel>

                  <Select
                    sx={{ m: 1 }}
                    required
                    name="subcategory"
                    size="small"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Sub Category"
                    value={subCategory}
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

              {/*               <DialogActions>
            <Button
              sx={{ m: 0.5 }}
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              onClick={submitForm}
              type="submit"
            >
              Submit
            </Button>
            </DialogActions> */}
            </Form>
          </Grid>
        )}
      </Formik>

      {/* <FormControl sx={{ m: 1 }} fullWidth  >
  <DialogContent>
   <form onSubmit={handleSubmit(handleData)}>
     <InputLabel error={!!errors.subcategory}>Select Number</InputLabel>

     <Controller rules={{required:true}}  control={control} name="subcategory" defaultValue=""
            render={({ field }) => (
              <Select {...field}  >
                {listSub?.map((field: FieldCategory) => {
                  return (
                    <MenuItem key={field.id} value={field.name} >
                      {field.name}
                    </MenuItem>
                    
                  );
                })}
              </Select>
            )} 
          />
           <FormHelperText error={!!errors.subcategory}>
           {errors.subcategory && errors.subcategory.type === 'required' && "subcategory is required"}
          </FormHelperText> 

            { category ? console.log("bien") : console.log("error") }

     <DialogActions>
      <Button type="submit" variant="outlined">Submit</Button>

     </DialogActions>
   </form>
   </DialogContent>
   </FormControl> */}
    </>
  );
}

export default ShippingForm;
