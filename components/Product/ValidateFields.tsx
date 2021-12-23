import React, { useContext, useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import Image from 'next/image';
import { TodosContext } from '@/components/contexts';
import Back from '@/public/back.jpg';
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
  DialogContent,
  Dialog,
  FormHelperText,
} from '@mui/material';

import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import Loader from '@/components/Loader/loader';

import { useForm, Controller } from 'react-hook-form';

import toast, { Toaster } from 'react-hot-toast';

interface ShippingData {
  sku: string;
  name: string;
  description: string;
  price: string;
  stock: string;
  subcategories: {
    name: string;
  };
  public_id: string;
  url: string;
}

type FieldImage = {
  id: string;
  url: string;
};

type FieldTypes = {
  name: string | number;
  type: string | number;
  label: string;
  placeholder: string;
};

type FieldCategory = {
  id: number;
  name: string;
  categories: {
    id: number;
    name: string;
  };
};

const AddlabelsConfing: FieldTypes[] = [
  { name: 'sku', type: 'sku', label: 'New sku code', placeholder: 'Sku' },
  { name: 'name', type: 'name', label: 'New name of product', placeholder: 'Name' },
  { name: 'description', type: 'description', label: 'Description', placeholder: 'Description' },
  { name: 'price', type: 'number', label: 'Price', placeholder: 'Price' },
  { name: 'stock', type: 'number', label: 'Stock', placeholder: 'Stock' },
  /*  { name: 'subcategory', type: 'subcategory', label: 'Subcategory', placeholder: 'Subcategory' }, */
  /*  { name: 'photo_file_name', type: 'photo_file_name', label: 'Photo_file_name', placeholder: 'Photo_file_name' } */
];

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

function ShippingForm() {
  const { open, isOpen } = useContext(TodosContext);
  const { isSuccess } = useContext(TodosContext);
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

  /* SELECT VALIDATION */

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const handleData = (data: any) => {
    isSuccess(true);
    toast.success('Always at the bottom.', {
      position: 'bottom-center',
    });
  };
  /* SLECT VALIDATION */

  const { data } = useSWR('/api/v1/categories', fetcher);
  /* IMAGES */
  const handleClose = () => {
    isOpen(false);
    if (images) handleDestroyClose(images?.id);
  };
  const [images, setImages] = useState<FieldImage>();
  const [loading, setLoading] = useState(false);

  const styleUpload = {
    display: images ? 'block' : 'none',
  };

  const CategorySearch = (id: any) => async (event: any) => {
    const res = await axios.get(`/api/v1/subcategories/${id}`);
    setListSub(res.data);
    SetdisableSub(true);
  };

  const handleDestroyClose = async (id: any) => await axios.delete(`/api/v1/products/image/${id}`);
  const handleDestroy = async () => {
    try {
      setLoading(true);
      const imageId = images?.id.toString();
      await axios.delete(`/api/v1/products/image/${imageId}`);
      setImages(undefined);
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
      if (file.size > 1024 * 1024) return alert('File not extended size, it must be of 1080 px');
      if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        return alert('File format is incorrect');
      setLoading(true);
      const res = await axios.post('/api/v1/products/image', formData, {
        headers: { 'content-type': 'multipart/form-data' },
      });
      setLoading(false);
      setImages(res.data);
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
          // Active: '1',
          // created_at: '1',
          // updated_at: '1',
          stock: '',
          subcategories: {},
          public_id: '',
          url: '',
          /* photo_file_name: '', */
        }}
        validate={(values) => {
          const errors: Partial<ShippingData> = {};
          //
          !values.sku && (errors.sku = 'Required Field');
          !values.name && (errors.name = 'Required Field');
          !values.description && (errors.description = 'Required Field');
          !values.price && (errors.price = 'Required Field');
          // !values.Active && (errors.Active = 'Required Field');
          // !values.created_at && (errors.created_at = 'Required Field');
          // !values.updated_at && (errors.updated_at = 'Required Field');
          !values.stock && (errors.stock = 'Required Field');
          /* !values.photo_file_name && (errors.photo_file_name = 'Required Field'); */

          /*       !values.subcategories && (errors.subcategories!.name = 'Required Field');   */
          // Alphanumeric chars
          // if (!/^[\w\-\s]+$/.test(values.zipcode)) {
          //   errors.zipcode = 'Incorrect zip code';
          // }
          //Phone number of 10 chars
          if (!/^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/.test(values.price)) {
            errors.price = 'Incorrect price';
          }
          //  if (!/^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/.test(values.Active)) {
          //   errors.Active ="0/1";
          //   }
          if (!/^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/.test(values.stock)) {
            errors.stock = 'Incorrect number';
          }

    
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          values.subcategories = { name: subCategory };
          values.public_id = images?.id.toString()!;
          values.url = images?.url.toString()!;
          toast('New Product Added!!', {
            position: 'top-center',
            icon: '👏',
            style: {
              position:'sticky',
              marginTop:'55rem',
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            }
          });
          if (subCategory && images) {
            setTimeout(async () => {
              setSubmitting(false);
              await axios.post('/api/v1/products', { ...values });
              window.location.reload();
            }, 500);
          }
        }}
      >
        {({ submitForm, isSubmitting }) => (
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
            <Toaster position="bottom-center" reverseOrder={false} />

            <Tooltip title="Close">
              <Button
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
                    onChange={(event) => {
                      handleUpload({ files: event.currentTarget.files![0] });
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
                        src={images ? images?.url : Back}
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
                <FormControl fullWidth  error={category ? false : true}>
                  <InputLabel >
                    Category
                  </InputLabel>
                  <Select
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
                          onClick={(e) => CategorySearch(field.id)(e)}
                        >
                          {field.name}{' '}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <FormHelperText>Select a category and then a subcategory</FormHelperText>
                </FormControl>
              </FormGroup>

              {/*  <FormControl sx={{ m: 1 }} fullWidth disabled={disableSub ? false : true}>
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
              <FormGroup >
                <FormControl fullWidth disabled={disableSub ? false : true}  error={subCategory ? false : true}>
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
