import React, { ChangeEvent, useContext, useState } from 'react';
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
} from '@mui/material';

import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import Loader from '@/components/Loader/LoaderCommon';
import { TodosContext } from '@/components/contexts/GlobalProvider';
import Image from 'next/image';
import Back from '@/public/back.jpg';
import axios from 'axios';

type FieldTypes = {
  name: string | number;
  type: string | number;
  label: string;
  placeholder: string;
  value: string | number;
};

export interface ShippingData {
  id: number;
  email: string;
  password: string;
  name: string;
  lastName: string;
  getphotoUrl: string;
  getphotoPublicId: string;
  customerPaymentId: string;
  roleName: string;
  repeat: string;
  role: {
    rolename: string;
  };
}

export interface PassRepeat {
  repeat: string;
}

const AddlabelsConfing: FieldTypes[] = [
  { name: 'email', type: ' email', label: 'New Email', placeholder: 'Email', value: '' },
  { name: 'name', type: 'text', label: 'Name', placeholder: 'Name', value: '' },
  { name: 'lastName', type: 'text', label: 'last name', placeholder: 'Last Name', value: '' },
  { name: 'password', type: 'password', label: 'Password', placeholder: 'Password', value: '' },
  {
    name: 'repeat',
    type: 'password',
    label: 'Password',
    placeholder: 'Repeat Password',
    value: '',
  },
];

function ShippingFormUser() {
  const { isOpen } = useContext(TodosContext);
  const { callback, isCallback } = useContext(TodosContext);
  const { isSuccess } = useContext(TodosContext);
  const { isLoader } = useContext(TodosContext);

  /* IMAGE */
  const [CategoryRole, setCategoryRole] = useState<string>('');
  const [repeat, setRepeat] = useState<string>('');

  const handleChangeCategory = async (event: SelectChangeEvent) => {
    setCategoryRole(event.target.value as string);
  };
  const handleRepeatPassword = async (e: ChangeEvent<HTMLInputElement>) => {
    const element = e.currentTarget.value;
    setRepeat(element);
  };

  const [imagesId, setImagesId] = useState<string>('');
  const [imagesUrl, setImagesUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const styleUpload = {
    display: imagesUrl ? 'block' : 'none',
  };

  const handleClose = () => {
    isOpen(false);
    if (imagesId) handleDestroyClose(imagesId);
  };

  const handleDestroyClose = async (id: any) => await axios.delete(`/api/v1/users/image/${id}`);

  const handleDestroy = async () => {
    try {
      setLoading(true);
      const imageId = imagesId.toString();
      await axios.delete(`/api/v1/users/image/${imageId}`);
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
      const res = await axios.post('/api/v1/users/image', formData, {
        headers: { 'content-type': 'multipart/form-data' },
      });
      setLoading(false);
      setImagesId(res.data.id);
      setImagesUrl(res.data.url);
    } catch (err) {
      /*  alert(err.response.data.msg) */
    }
  };

  return (
    <Formik
      initialValues={{
        email: '',
        name: '',
        getphotoUrl: '',
        lastName: '',
        password: '',
        roleName: '',
        getphotoPublicId: '',
        repeat: '',
        role: {
          id: 0,
          rolename: '',
        },
      }}
      validate={(values) => {
        const errors: Partial<ShippingData> = {};

        !values.email && (errors.email = 'Required Field');
        !values.name && (errors.name = 'Required Field');
        !values.password && (errors.password = 'Required Field');
        !values.lastName && (errors.lastName = 'Required Field');
        !values.repeat && (errors.repeat = 'Required Field');

        if (values.password != values.repeat) {
          errors.password = 'Password doesnt match';
        } else {
          values.role.rolename = CategoryRole;
        }

        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(false);
        await axios.post('/api/v1/users', { ...values });
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
            title="Add a new user"
          />
          <Form>
            <Divider />

            {/*   <div className="imageTitle">Select a image: </div>
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
            </Tooltip> */}
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
                      autoComplete="on"
                      InputProps={{
                        startAdornment: <InputAdornment position="start"></InputAdornment>,
                      }}
                    />
                  </FormControl>
                </FormGroup>
              );
            })}

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                sx={{ m: 1 }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={CategoryRole}
                label="Role"
                onChange={handleChangeCategory}
                size="small"
              >
                <MenuItem value="Shopper">Shopper</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
              </Select>
            </FormControl>

            <DialogActions>
              <Button type="submit" variant="outlined" sx={{ m: 0.5 }}>
                Submit
              </Button>
            </DialogActions>
          </Form>
        </Grid>
      )}
    </Formik>
  );
}

export default ShippingFormUser;
