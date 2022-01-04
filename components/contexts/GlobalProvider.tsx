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

import React, { createContext, useState, FC, useEffect } from 'react';
import { TodosContextState } from './types';
import axios from 'axios';
import Loader from '@/components/Loader/GlobalLoader';

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

  const [open, setOpen] = useState<boolean>(contextDefaultValues.open);
  const isOpen = (open: boolean) => setOpen(open);

  const [success, setSuccess] = useState<boolean>(contextDefaultValues.success);
  const isSuccess = (success: boolean) => setSuccess(success);

  const [loaderShow, setLoaderShow] = useState<boolean>(contextDefaultValues.loaderShow);
  const isLoader = (loaderShow: boolean) => setLoaderShow(loaderShow);

  const [callback, setCallback] = useState<boolean>(contextDefaultValues.callback);
  const isCallback = (callback: boolean) => setCallback(callback);

  const [AllProducts, setProducts] = useState(contextDefaultValues.AllProducts);

  useEffect(() => {
    const AllProductsFunction = async () => {
      const res = await axios.get('/api/v1/products');
      setProducts(res.data);
      setLoaderShow(false);
    };
    AllProductsFunction();
  }, [callback]);

  if (loaderShow) return <Loader />;

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
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export default GlobalProvider;
