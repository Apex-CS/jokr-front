import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image'

import {
  Button,
  Grid,
  CardHeader,
  Divider,
  FormControl,
  InputAdornment,
  FormGroup,
} from '@mui/material';

import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';

interface ShippingData {
  sku: string;
  name: string;
  description: string;
  price: string;
  // Active: string;
  // created_at: string;
  // updated_at: string;
  stock: string;
  subcategory: string;
  photo_file_name: string;
}

type FieldTypes = {
  name: string | number;
  type: string | number;
  label: string;
  placeholder: string;
};
const AddlabelsConfing: FieldTypes[] = [
  { name: 'sku', type: 'sku', label: 'New sku code', placeholder: 'Sku' },
  { name: 'name', type: 'name', label: 'New name of product', placeholder: 'Name' },
  { name: 'description', type: 'description', label: 'Description', placeholder: 'Description' },
  { name: 'price', type: 'number', label: 'Price', placeholder: 'Price' },
  { name: 'stock', type: 'number', label: 'Stock', placeholder: 'Stock' },
  { name: 'subcategory', type: 'subcategory', label: 'Subcategory', placeholder: 'Subcategory' },
  { name: 'photo_file_name', type: 'photo_file_name', label: 'Photo_file_name', placeholder: 'Photo_file_name' }
];


/* IMAGES */
const [images,setImages]=useState('')
const [loading,setLoading] = useState(false)

const styleUpload={
  display:images ? "block" :"none"
}

const handleDestroy=async()=>{
  try{
      /* if(!islogged) return alert("No estas logeado") */
      setLoading(true)
     /*  await axios.post('/api/destroy',{public_id: images.public_id},{
          headers:{Authorization:token}
      }) */
      setLoading(false)
      setImages('')
  }catch(err){
     /*  alert(err.response.data.msg) */
  }
}
const handleUpload =async ()=>{
  try{
     
 /*      if(!islogged)
      return alert("No estas logeado") */
      const file=e.target.files[0]

      if(!file) return alert("file not exist")

      if(file.size >1024 *1024)
      return alert("File not exist")

      if(file.type !== 'image/jpeg' && file.type !== 'image/png')
      return alert("File format is incorrect")

      let formData = new FormData()
      formData.append('file',file)
  
      setLoading(true)
 /*      const res= await axios.post('/api/upload',formData,{
          headers:{'content-type':'multipart/form-data',Authorization:token}
      }) */ 
      setLoading(false)
     /*  setImages(res.data) */
  }catch(err){
     /*  alert(err.response.data.msg) */
  }
}
/* IMAGES */

function ShippingForm() {
  return (
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
        subcategory: 'DEPORTIVA',
        photo_file_name: '',
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
        !values.photo_file_name && (errors.photo_file_name = 'Required Field');
        !values.subcategory && (errors.subcategory = 'Required Field');

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
        setTimeout(async () => {
          setSubmitting(false);

          await axios.post('/api/v1/products', { ...values });
          window.location.reload();
        }, 500);
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Grid
          item
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 300,
            minWidth: 300,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <CardHeader sx={{ m: -2 }} title="New product" />

          <Form>
            <Divider />
            <br/>

            <div className="upload">
                    <input type="file" name="file" id="file_up" onChange={handleUpload}></input>
                    {
                        loading ? <div id="file_img"><Loader/></div>
                    :<div id="file_img" style={styleUpload}>
                        <Image  SRC=""/* src={images ? images.url:''} */ alt=""/>
                        <span onClick={handleDestroy}>X</span>
                    </div>
                    }
                </div> 


            {AddlabelsConfing?.map((field: FieldTypes) => {
              return (
                <FormGroup key={field.name}>
                  <FormControl  sx={{ m: 1 }}>
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

            {/* <Field component={TextField} name="Active" type="number" label="Active" />
              <Field component={TextField} name="created_at" type="date" label="" />
              <Field component={TextField} name="updated_at" type="date" label="" /> */}

            <Button variant="contained" component="label">
              Upload File
              <input type="file" hidden />
            </Button>

            <Button
              sx={{ m: 0.5 }}
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              onClick={submitForm}
            >
              Submit
            </Button>
          </Form>
        </Grid>
      )}
    </Formik>
  );
}

export default ShippingForm;
