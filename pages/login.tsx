import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Box, Modal, Fade } from '@mui/material';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import  { TodosContext } from '@/components/contexts/GlobalProvider';
import Router from 'next/router';
import Register from '@/components/User/Register';
import swal from 'sweetalert';


type inputsLogin = {
  email: string;
  password: string;
};

//state type

type State = {
  username: string;
  password: string;
  isButtonDisabled: boolean;
  helperText: string;
  isError: boolean;
};

const initialState: State = {
  username: '',
  password: '',
  isButtonDisabled: true,
  helperText: '',
  isError: false,
};

type Action =
  | { type: 'setUsername'; payload: string }
  | { type: 'setPassword'; payload: string }
  | { type: 'setIsButtonDisabled'; payload: boolean }
  | { type: 'loginSuccess'; payload: string }
  | { type: 'loginFailed'; payload: string }
  | { type: 'setIsError'; payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setUsername':
      return {
        ...state,
        username: action.payload,
      };
    case 'setPassword':
      return {
        ...state,
        password: action.payload,
      };
    case 'setIsButtonDisabled':
      return {
        ...state,
        isButtonDisabled: action.payload,
      };
    case 'loginSuccess':
      return {
        ...state,
        helperText: action.payload,
        isError: false,
      };
    case 'loginFailed':
      return {
        ...state,
        helperText: action.payload,
        isError: true,
      };
    case 'setIsError':
      return {
        ...state,
        isError: action.payload,
      };
  }
};

function Login() {
  const { Token, IsToken } = useContext(TodosContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { Login, IsLogged } = useContext(TodosContext);
  const [data, setData] = useState<inputsLogin>({ email: '', password: '' });
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const { callback, isCallback } = useContext(TodosContext);

  useEffect(() => {
    if (state.username.trim() && state.password.trim()) {
      dispatch({
        type: 'setIsButtonDisabled',
        payload: false,
      });

      setData({ email: state.username, password: state.password });
    } else {
      dispatch({
        type: 'setIsButtonDisabled',
        payload: true,
      });
    }
  }, [state.username, state.password]);

  const handleLogin = async () => {
    try {
      const res = await axios.post('/api/v1/public/login', { ...data });
      const jwt = JSON.parse(atob(res.headers.authorization.split('.')[1]));


      if (res.statusText) {
        swal({ icon: 'success', title: 'Ok!', text: 'Great you can continue..', timer: 2000 });
        localStorage.setItem('token', res.headers.authorization);
        if (jwt.authorities.toString() == 'Admin') IsLogged(jwt.authorities.toString());

        IsToken(res.headers.authorization);
        isCallback(!callback);
        Router.push('/');
        
        dispatch({
          type: 'loginSuccess',
          payload: 'Login Successfully',
        });
      } else {
        dispatch({
          type: 'loginFailed',
          payload: 'Incorrect username or password',
        });
      }
    } catch (err) {
      swal({ icon: 'error', title: 'Ups!', text: 'Email or Password are incorrect', timer: 3000 });
    }

    //await axios.post('/api/v1/Auth', { ...state.userame&&password })
    /*   window.location.href = "/login"
        dispatch({
          type: 'loginSuccess',
          payload: 'Login Successfully'
        });
      } else {
        dispatch({
          type: 'loginFailed',
          payload: 'Incorrect username or password'
        });
      } */
  };

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    dispatch({
      type: 'setUsername',
      payload: event.target.value,
    });
  };

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    dispatch({
      type: 'setPassword',
      payload: event.target.value,
    });
  };
  const {open, isOpen} =useContext(TodosContext)

  
  const handleOpen = () => isOpen(true);
  const handleClose = () => isOpen(false);

  if (token) {
    Router.push('/');
  }

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <form className="login100-form " /* onSubmit={handleSubmit} */>
            <div className="container">
              <div className="top-header">
                <h3>Welcome back</h3>
                <p>Enter your credentials to access your account</p>
              </div>

              <TextField
                error={state.isError}
                fullWidth
                id="username"
                type="email"
                label="Username"
                placeholder="Username"
                margin="normal"
                onChange={handleUsernameChange}
                size="small"
                autoComplete="on"
              />

              <TextField
                error={state.isError}
                fullWidth
                id="password"
                type="password"
                label="Password"
                placeholder="Password"
                margin="normal"
                helperText={state.helperText}
                onChange={handlePasswordChange}
                size="small"
                autoComplete="on"
              />

              <div className="btn">
                {/* <button  >Sign in</button> */}
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  onClick={handleLogin}
                  disabled={state.isButtonDisabled}
                >
                  Sign in
                </Button>
              </div>
            </div>
            <p className="last">
              New User?{' '}
              <a href="#" onClick={handleOpen} className="colors">
                {' '}
                Create a new account{' '}
              </a>
            </p>
          </form>

          <div className="login100-more" />
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        /* BackdropComponent={Backdrop} */
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
              marginTop: '-1rem',
              borderRadius: '12px'
            }}
          >
            <Register />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
export default Login;
