/* import ProductAdmin from '@/pages/api/ProductAdmin';
import React, { useState, createContext, useEffect } from 'react';

export const ToolsContext = createContext({});
export const GlobalProvider = ({ children }: any) => {
  const [UserLogeado, setLogeado] = useState<any>(false);

  useEffect( () => {
    setLogeado(true);
  },[])

  const state = { ProductAdmin: ProductAdmin(UserLogeado) };

  return <ToolsContext.Provider value={{ state }}>{children}</ToolsContext.Provider>;
}; */
/*eslint no-empty: "error"*/

import React, { createContext, useState, FC, useEffect, Fragment } from 'react';
import { TodosContextState } from './types';
import axios from 'axios';
import swal from 'sweetalert';
import Router from 'next/router';
import GlobalLoader from '@/components/Loader/GlobalLoader';
export type CartItemType = {
  id: number;
  sku: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  subcategory: string;
  photoUrl: string;
  amount: number;
};

const contextDefaultValues: TodosContextState = {
  todos: 0,
  addTodo: () => 0,

  cartItems: [],
  addCart: () => ({}),
  DeletedCart: () => [],

  open: false,
  isOpen: () => false,

  success: false,
  isSuccess: () => false,

  callback: false,
  isCallback: () => false,

  loaderShow: true,
  isLoader: () => true,

  AllProducts: [],
  AllProductsAdmin: [],

  Login: '' ,
  IsLogged: () => ({}),

  Token: '',
  IsToken: () => ({}),

  ImageUser:{url:'',urlId:''},
  IsImageUser: () => ({}),

  IdUser:0,


};

export const TodosContext = createContext<TodosContextState>(contextDefaultValues);

const GlobalProvider: FC = ({ children }) => {
  const [todos, setTodos] = useState<number>(contextDefaultValues.todos);
  const addTodo = () => setTodos(todos + 1);

  /* Add items to cart adn delete */
  const [cartItems, setCartItems] = useState(contextDefaultValues.cartItems);
  const DeletedCart = (
    id: number,
    sku: string,
    name: string,
    description: string,
    price: number,
    stock: number,
    subcategory: string,
    photoUrl: string,
    amount: number
  ) =>
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === id);
      const isItemInAmount = prev.find((item) => item.amount === 1 && item.id === id);

      if (isItemInAmount) {
        return prev.filter((item) => item.id !== id);
      }
      if (isItemInCart) {
        return prev.map((item) => (item.id === id ? { ...item, amount: item.amount - 1 } : item));
      }

      return [
        ...prev,
        {
          id: id,
          sku: sku,
          name: name,
          description: description,
          price: price,
          stock: stock,
          subcategory: subcategory,
          photoUrl: photoUrl,
          amount: amount - 1,
        },
      ];
    });

  const addCart = (
    id: number,
    sku: string,
    name: string,
    description: string,
    price: number,
    stock: number,
    subcategory: string,
    photoUrl: string,
    amount: number
  ) =>
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === id);
      if (isItemInCart) {
        return prev.map((item) => (item.id === id ? { ...item, amount: item.amount + 1 } : item));
      }

      return [
        ...prev,
        {
          id: id,
          sku: sku,
          name: name,
          description: description,
          price: price,
          stock: stock,
          photoUrl: photoUrl,
          subcategory: subcategory,
          amount: amount + 1,
        },
      ];
    });
  /* Modal check if is open or close */

  const [ open, setOpen ] = useState<boolean>(contextDefaultValues.open);
  const isOpen = (open: boolean) => setOpen(open);

  const [ success, setSuccess ] = useState<boolean>(contextDefaultValues.success);
  const isSuccess = (success: boolean) => setSuccess(success);

  const [ loaderShow, setLoaderShow ] = useState<boolean>(contextDefaultValues.loaderShow);
  const isLoader = (loaderShow: boolean) => setLoaderShow(loaderShow);

  const [ callback, setCallback ] = useState<boolean>(contextDefaultValues.callback);
  const isCallback = (callback: boolean) => setCallback(callback);

  const [ AllProducts, setProducts ] = useState(contextDefaultValues.AllProducts);
  const [ AllProductsAdmin, setProductsAdmin] = useState(contextDefaultValues.AllProductsAdmin);

  const [ Login, setLogin ] = useState(contextDefaultValues.Login);
  const IsLogged = (role: string) => setLogin(role);

  const [ Token, setToken ] = useState(contextDefaultValues.Token);
  const IsToken = (token: string) => setToken(token);

  const [ ImageUser, setImageUser ] = useState(contextDefaultValues.ImageUser);
  const IsImageUser = (url: string, urlId:string) => setImageUser({url,urlId});

  const [ IdUser, setIdUser ] = useState(contextDefaultValues.IdUser);
 
  
  
 
  useEffect(() => {
    try {
      const auth = localStorage.getItem('token');
     
      if (auth) {
        const jwt = JSON.parse(atob(auth.split('.')[1]));
        setIdUser(jwt.jti)
        setImageUser({url:jwt.photoUrl,urlId:jwt.photoUrlId})
        if(jwt.authorities.toString() === 'Admin') IsLogged(jwt.authorities.toString())

        console.log(jwt)
        /* let ff = jwt.exp * 1000 */
        const expiration = new Date(jwt.exp * 1000);
        /* const g = new Date( expiration) */
        const now = new Date();
        const fiveMinutes = 100000;

        if (expiration.getTime() - now.getTime() < fiveMinutes) {
          console.log('JWT has expired or will expire soon');
          console.log(expiration.getTime() - now.getTime(), fiveMinutes);
          const f = 'Bearer ' + auth;
          swal({
            title: 'Session will expire soon, Do you want to continue?',
            text: 'Are you sure?',
            icon: 'warning',
            buttons: ['No', 'Yes'],
          }).then(async (res) => {
            if (res) {
              try {
                const refresh = await axios.post(`/api/v1/refreshJwt`,{ token: f }, { 
                   headers: { Authorization: 'Bearer ' + auth },
                  }
                );
              
                const foo = refresh.headers.authorization.replace('Bearer ', '');
                localStorage.setItem('token', foo);
                Router.push('/');
                await refresh;

                swal({ icon: 'success', text: 'You can continue', timer: 2000 }).then(function () {
                  setCallback(!callback);
                });
              } catch (err) {
                swal({ icon: 'error', text: 'Session Expired', timer: 2000 }).then(function () {
                  localStorage.removeItem('token');
                  Router.push('/login');
                });
              
              }
            }  else {
              localStorage.removeItem('token');
              Router.push('/login');
            } 
          });
        } else {
          console.log(expiration, now);
          console.log(expiration.getTime() - now.getTime(), fiveMinutes);

          const getProduct = async () => {
            const res = await axios.get('/api/v1/products', {
              headers: { Authorization: 'Bearer ' + auth },
            });
            setProducts(res.data);
            setProductsAdmin(res.data);
          };
          getProduct();

          setToken('Bearer ' + auth);
          console.log('JWT is valid for less than 5 minutes');
        }
      }
    } catch (err) {
    
      localStorage.removeItem('token');
      Router.push('/login');
    }

    /*    const RefreshToken = async () => {
        try {
          const res = await axios.post('/api/v1/refreshJwt',{token: 'Bearer ' + auth}, {
            headers: { Authorization: 'Bearer ' + auth }
          });
          console.log('respuesta del refresh',res)
        }catch(err) {
          Router.push('/login');
        }

        
      };
      
      RefreshToken()   */
  }, [callback]);

  if (loaderShow) {
    <Fragment>
      <GlobalLoader />
    </Fragment>;
  }

  /* if (loaderShow) return <GlobalLoader />;  */

  return (
    <TodosContext.Provider
      value={{
        todos,
        addTodo,
        cartItems,
        addCart,
        DeletedCart,

        open,
        isOpen,

        success,
        isSuccess,

        loaderShow,
        isLoader,

        callback,
        isCallback,
        /* Get all products */
        AllProducts,
        AllProductsAdmin,
        /* GET LOGIN STATUS */
        Login,
        IsLogged,

        Token,
        IsToken,

        ImageUser,
        IsImageUser,

        IdUser
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export default GlobalProvider;
