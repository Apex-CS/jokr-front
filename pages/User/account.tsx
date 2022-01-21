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
  Container,
  TableCell,
  tableCellClasses,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  Modal,
  Fade,
  Box,
  Backdrop,

} from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import { TodosContext } from '@/components/contexts/GlobalProvider';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import axios from 'axios';
import { mutate } from 'swr';
import Image from 'next/image';
import Back from '@/public/back.jpg';
import Loader from '@/components/Loader/LoaderCommon';
import swal from 'sweetalert';
import Router from 'next/router';
import useSWR from 'swr';
import Check from '@/components/Loader/GlobalLoader';
import { styled } from '@mui/material/styles';
import AddAddress from '@/components/Address/AddAddress';
import ListAdress from '@/components/Address/ListAdress';
import { useRouter } from 'next/router';




/* TABLE */
const tableHeader: string[] = ['Streer 1', 'Street 2', 'Colonia','Municipio','State','Country','Postal Code','Phone','Recipient Name','Default billing','Default Shipping','Options'];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

/* TABLE  */
export interface DataAddress {
  id: number;
  street1: string;
  street2: string;
  colonia: string;
  municipio: string;
  state: string;
  country: string;
  postal_code: string;
  phone: string;
  recipient_name: string;
  is_default_billing_address: boolean;
  is_default_shipping_address: boolean;
  users: {
    id: number;
  };
}

export interface DataUser {
  id: number;
  email: string;
  password: string;
  name: string;
  lastName: string;
  photoUrl: string;
  photoPublicId: string;
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

type FieldTypes = {
  name: string | number;
  type: string | number;
  label: string;
  placeholder: string;
  value: string | number;
};

const fetcher = (url: string) =>
  axios
    .get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
    .then((res) => res.data);

function Account() {
  const router = useRouter();
  const { open, isOpen } = useContext(TodosContext);
  const { IdUser } = useContext(TodosContext);
  const [loading, setLoading] = useState(false);

  const { ImageUser, IsImageUser } = useContext(TodosContext);
  const { callback, isCallback } = useContext(TodosContext);
  const { isSuccess } = useContext(TodosContext);
  const { isLoader } = useContext(TodosContext);
  const handleOpen = () => isOpen(true);
  /*   const [imagesId, setImagesId] = useState<string>(ImageUser.urlId);
  const [imagesUrl, setImagesUrl] = useState<string>(ImageUser.url); */

  const { data: address } = useSWR(`/api/v1/addresses/${IdUser}`, fetcher);


  const { data, error } = useSWR(`/api/v1/users/${IdUser}`, fetcher);
  if (error) return <Check />;
  if (!data) return 'Loading...';

  const handleDestroy = async () => {
    try {
      setLoading(true);
      const imageId = ImageUser.urlId;
      await axios.delete(`/api/v1/users/image/${imageId}`, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });


      IsImageUser('', '');


      IsImageUser('','')
      
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
      const res = await axios.post('/api/v1/users/image', formData, {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      setLoading(false);

      IsImageUser(res.data.url, res.data.id);

    } catch (err) {
      swal({ icon: 'error', text: 'Session Expired', timer: 2000 }).then(function () {
        localStorage.removeItem('token');
        Router.push('/login');
      });
    }
  };

  const AddlabelsConfing: FieldTypes[] = [
    {
      name: 'email',
      type: 'email',
      label: 'New Email',
      placeholder: 'Email',
      value: data[0].email,
    },
    { name: 'name', type: 'text', label: 'Name', placeholder: 'Name', value: data[0].name },
    {
      name: 'lastName',
      type: 'text',
      label: 'last name',
      placeholder: 'Last Name',
      value: data[0].lastName,
    },
    { name: 'password', type: 'password', label: 'Password', placeholder: 'Password', value: '' },
    {
      name: 'repeat',
      type: 'password',
      label: 'Password',
      placeholder: 'Repeat Password',
      value: '',
    },
  ];

  const styleUpload = {
    display: ImageUser.url ? 'block' : 'none',
  };

  return (
    <>
      <Grid>
        <div className="split left">
          <div className="containerAccount">
            <div className="top-header">
              <h3>My information</h3>
              <p>Update your information</p>
            </div>

            <Formik
              initialValues={{
                email: `${data[0].email}`,
                name: `${data[0].name}`,
                photoUrl: '',
                lastName: `${data[0].lastName}`,
                password: ``,
                roleName: `${data[0].roleName}`,
                photoPublicId: ``,
                repeat: '',
                role: {
                  id: 0,
                  rolename: '',
                },
              }}
              validate={(values) => {
                const errors: Partial<DataUser> = {};

                !values.email && (errors.email = 'Required Field');
                !values.name && (errors.name = 'Required Field');
                !values.password && (errors.password = 'Required Field');
                !values.lastName && (errors.lastName = 'Required Field');
                !values.repeat && (errors.repeat = 'Required Field');

                if (values.password != values.repeat) {
                  errors.password = 'Password doesnt match';
                } else {
                  values.role.rolename = data[0].roleName;
                }

                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  setSubmitting(false);
                  values.photoPublicId = ImageUser.urlId;
                  values.photoUrl = ImageUser.url;

                  await axios.put(
                    `/api/v1/users/${IdUser}`,
                    { ...values },
                    {
                      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
                    }
                  );
                } catch (err) {
                  swal({ icon: 'error', text: 'Session Expired', timer: 2000 }).then(function () {
                    localStorage.removeItem('token');
                    Router.push('/login');
                  });
                }


                swal({
                  icon: 'warning',
                  title: '!!!Have you done modifications to your perfil',
                  text: 'Log in again',
                  timer: 4000,
                }).then(function () {
                  localStorage.removeItem('token');
                  Router.push('/login');
                  router.reload();

                  mutate('/api/v1/Users');
                  mutate(`/api/v1/users/${IdUser}`);
                  isOpen(false);

                  isSuccess(true);
                  isLoader(true);
                });

              }}
            >
              {() => (
                <>
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
                              src={ImageUser.url ? ImageUser.url : Back}
                              width={500}
                              height={380}
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
                              autoComplete="on"
                              InputProps={{
                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                              }}
                            />
                          </FormControl>
                        </FormGroup>
                      );
                    })}

                    <div className="btn">
                      <Button type="submit" variant="contained" size="large" color="secondary">
                        Update
                      </Button>
                    </div>
                  </Form>
                </>
              )}
            </Formik>
          </div>
        </div>

        <div className="split right">
          <Tooltip title="Add a new Address" placement="top">
            <div className="wrap2">
              <button className="ADD btn5" onClick={handleOpen}>
                +
              </button>
            </div>
          </Tooltip>

          <FormGroup>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    {tableHeader?.map((header: string) => {
                      return (
                        <StyledTableCell align="center" key={header}>
                          {header}
                        </StyledTableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>

                  {address?.map((address: DataAddress) => {
                    return <ListAdress key={address.id} address={address} />;
                  })}

                </TableBody>
              </Table>
            </TableContainer>
          </FormGroup>

        </div>
      </Grid>

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
            {/* Add Addrees */}
            <AddAddress />
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default Account;
