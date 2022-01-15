import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Box } from '@mui/material';
import GlobalLoader from '@/components/Loader/GlobalLoader';
import Image from 'next/image';
import Link from 'next/link';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { TodosContext } from '@/components/contexts/GlobalProvider';
import Router from 'next/router';
import { useRouter } from 'next/router';

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

  const { Token,IsToken } = useContext(TodosContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { Login,IsLogged} = useContext(TodosContext);
  const [data, setData] = useState<inputsLogin>({ email: '', password: '', });
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const { callback,isCallback, } = useContext(TodosContext);
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
    /*   if (state.username == state.password) { */
    /*  setData({email:state.username,password:state.username}) */
    try {
      const res = await axios.post('/api/v1/public/login', { ...data });
      console.log(res);
      const jwt = JSON.parse(atob(res.headers.authorization.split('.')[1]));
      if (res.statusText) {
        localStorage.setItem('token', res.headers.authorization);
        if(jwt.authorities.toString() == 'Admin') IsLogged(jwt.authorities.toString())
        
        IsToken(res.headers.authorization)
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
      alert(err);
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

  if (token) {
    Router.push('/');
  }
  
  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <form className="login100-form " /* onSubmit={handleSubmit} */>
            {/*  <div className="log">
        <Image src={signin} alt="log" />
        </div> */}
            {/*  <span className="login100-form-title p-b-43">Inicia Sesion Para Continuar</span> */}
            {/*         <Form.Group className="mb-3" >
            <Form.Label className="ubuntu">Email</Form.Label>
            <Form.Control onChange={handleChangeInput} name="email" className="form-control-lg ubuntu" type="email" placeholder="Ingresa tu Email" />
        </Form.Group>

        <Form.Group className="mb-3 ">
            <Form.Label className="ubuntu">Password</Form.Label>
            <Form.Control onChange={handleChangeInput}  name="password" className="form-control-lg ubuntu" type="password" placeholder="Password" autoComplete="on"/>
        </Form.Group> */}

            {/*             <div className="container-login100-form-btn">
              <button className="login100-form-btn ubuntu">Entrar</button>
            </div>

            <div className="text-center p-t-46 ">
              <Link href="/register">
                <a className="txt2">o Registrate</a>
              </Link>
            </div> */}

            <div className="container">
              <div className="top-header">
                <h3>Welcome back</h3>
                <p>Enter your credentials to access your account</p>
              </div>

              {/*       <div className="user">
          <i className="bx bxs-user-circle"></i>
          <input type="text" placeholder="Enter your username" />
        </div> */}

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

              {/*     <div className="pass">
          <i className="bx bxs-lock-alt"></i>
          <input type="password" placeholder="Enter your password" />
        </div> */}

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
              New User? <a href="#"> Create a new account </a>
            </p>
          </form>

          <div className="login100-more" />
        </div>
      </div>
    </div>
  );
}
export default Login;
