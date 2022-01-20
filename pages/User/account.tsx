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
  Container,
  TableCell,
  tableCellClasses,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Paper
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

/* TABLE */
const tableHeader: string[] = ['Street 1','Street 2' ,'Municipio', 'State','Options'];
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



const fetcher = (url: string) =>  axios.get(url,{  headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}}).then((res) => res.data);

function Account() {
  const { open, isOpen } = useContext(TodosContext);
  const { IdUser } = useContext(TodosContext);


  const [imagesId, setImagesId] = useState<string>('');
  const [imagesUrl, setImagesUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const { callback, isCallback } = useContext(TodosContext);
  const { isSuccess } = useContext(TodosContext);
  const { isLoader } = useContext(TodosContext);

  const styleUpload = {
    display: imagesUrl ? 'block' : 'none',
  };

  const handleDestroy = async () => {
    try {
      setLoading(true);
      const imageId = imagesId.toString();
      await axios.delete(`/api/v1/users/image/${imageId}`, {
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
      const res = await axios.post('/api/v1/users/image', formData, {
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

  console.log('Usuario logeado', IdUser);
 

  const { data, error } = useSWR(`/api/v1/users/${IdUser}`, fetcher);
  if (error)  return <Check/> ;
  if (!data) return 'Loading...';

const AddlabelsConfing: FieldTypes[] = [
    { name: 'email', type: 'email', label: 'New Email', placeholder: 'Email', value: data[0].email },
    { name: 'name', type: 'text', label: 'Name', placeholder: 'Name', value: data[0].name },
    { name: 'lastName', type: 'text', label: 'last name', placeholder: 'Last Name', value: data[0].lastName },
    { name: 'password', type: 'password', label: 'Password', placeholder: 'Password', value: '' },
    {
      name: 'repeat',
      type: 'password',
      label: 'Password',
      placeholder: 'Repeat Password',
      value: '',
    },
  ];

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
                email: `${ data[0].email}`,
                name: `${data[0].name}`,
                photoUrl: `${data[0].photoUrl}`,
                lastName: `${data[0].lastName}`,
                password:``,
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
                }

                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  setSubmitting(false);
                  values.photoPublicId = imagesId.toString();
                  values.photoUrl = imagesUrl.toString();

                  await axios.post(
                    '/api/v1/users',
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

                mutate('/api/v1/Users');
                isOpen(false);
                isCallback(!callback);
                isSuccess(true);
                isLoader(true);
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
                  </Form>
                </>
              )}
            </Formik>

            <div className="btn">
              <Button variant="contained" size="large" color="secondary">
                Update
              </Button>
            </div>
          </div>
        </div>

        <div className="split right">
          <Tooltip title="Add a new Address" placement="top">
            <div className="wrap2">
              <button className="ADD btn5">+</button>
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
                {/* {data?.map((user: User) => {
                  return <ListUsers key={user.id} user={user} />;
                })} */}
              </TableBody>
            </Table>
          </TableContainer>
        </FormGroup>

        </div>
      </Grid>
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
