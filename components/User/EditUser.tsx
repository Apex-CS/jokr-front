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
  DialogActions,
  Modal,
  Backdrop,
  Fade,
  Box,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  SelectChangeEvent,
} from '@mui/material';
import axios from 'axios';
import { User } from '@/pages/users';
import { TodosContext } from '@/components/contexts/GlobalProvider';
import Loader from '@/components/Loader/LoaderCommon';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-mui';
import Image from 'next/image';
import { DataUser } from '@/components/User/ValidateFieldsUser';
import Back from '@/public/back.jpg';
import swal from 'sweetalert';
import Router from 'next/router';
import { mutate } from 'swr';


type FieldTypes = {
  label: string;
  name: string;
  value: string | number;
  type: string;
  placeholder: string;
};

function EditUser(props: { obj: User; open: boolean; handleClose: any }) {
  const { obj, open, handleClose } = props;
  const { callback, isCallback } = useContext(TodosContext);
  const { isSuccess } = useContext(TodosContext);
  const { isLoader } = useContext(TodosContext);
  const [ role, setRole ] = useState<string>(obj.roleName);

  const [ imagesId, setImagesId ] = useState<string>(obj.photoPublicId);
  const [ imagesUrl, setImagesUrl ] = useState<string>(obj.photoUrl);
  const [ loading, setLoading ] = useState(false);
  const [ passBlock,setPassBlock ] = useState<boolean>(false);

  const styleUpload = {
    display: imagesUrl ? 'block' : 'none',
  };

  const handleChangeRole = async (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  const handleDestroy = async () => {
    try {
      setLoading(true);
      const imageId = imagesId.toString();
      await axios.delete(`/api/v1/products/image/${imageId}`, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });
      setImagesId('');
      setImagesUrl('');

      setLoading(false);
    } catch (err) {
      swal({ icon: 'error', text: 'Session Expired', timer: 2000 }).then(function () {
        localStorage.removeItem('token');
        Router.push('/login');
      });
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
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
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

  const editFormFieldsData: FieldTypes[] = [
    { name: 'email', type: 'email', label: 'Email', placeholder: 'Email', value: obj.email },
    { name: 'name', type: 'text', label: 'Name', placeholder: 'Name', value: obj.name },
    {
      name: 'lastName',
      type: 'text',
      label: 'last name',
      placeholder: 'Last Name',
      value: obj.lastName,
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      placeholder: 'Password',
      value: obj.password,
    },
    {
      name: 'repeat',
      type: 'password',
      label: 'Password',
      placeholder: 'Repeat Password',
      value: '',
    },
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
              email: `${obj.email}`,
              name: `${obj.name}`,
              photoUrl: '',
              lastName: `${obj.lastName}`,
              password: '',
              roleName: `${obj.roleName}`,
              photoPublicId: '',
              repeat: '',
              role: {
                id: 0,
                rolename: '',
              },
            }}
            validate={async(values) => {
              const errors: Partial<DataUser> = {};
              //

              !values.email && (errors.email = 'Required Field');
              !values.name && (errors.name = 'Required Field');
              !values.password && (errors.password = 'Required Field');
              !values.lastName && (errors.lastName = 'Required Field');
              !values.repeat && (errors.repeat = 'Required Field');

              
              if (values.password != values.repeat) {
                errors.password = 'Password doesnt match';
              } else {
                values.role.rolename = role;
              }

              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                setSubmitting(false);
                values.photoPublicId = imagesId.toString();
                values.photoUrl = imagesUrl.toString();

                await axios.put(
                  `/api/v1/users/${obj.id}`,
                  { ...values },
                  {
                    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
                  }
                );
                mutate('/api/v1/Users');
                handleClose();
                isCallback(!callback);
                isSuccess(true);
                isLoader(true);
              } catch (err) {
                swal({ icon: 'error', text: 'Session Expired', timer: 2000 }).then(function () {
                  localStorage.removeItem('token');
                  Router.push('/login');
                });
              }
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
                  title="Update User: "
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
                            type={field.type}
                            variant="outlined"
                            autoComplete="on"
                            InputProps={{
                              startAdornment: <InputAdornment position="start"></InputAdornment>,
                            }}
                          />
                        </FormControl>
                      </FormGroup>
                    );
                  })}

                  <FormGroup>
                    <FormControl fullWidth error={role ? false : true}>
                      <InputLabel>Role</InputLabel>
                      <Select
                        name="role"
                        sx={{ m: 1 }}
                        size="small"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Role"
                        value={role ? role : ''}
                        onChange={handleChangeRole}
                        required
                      >
                        <MenuItem value="Shopper">Shopper</MenuItem>
                        <MenuItem value="Admin">Admin</MenuItem>
                      </Select>
                      <FormHelperText sx={{ marginBottom: '1rem' }}>Select a role</FormHelperText>
                    </FormControl>
                  </FormGroup>

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
