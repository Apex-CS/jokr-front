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


export type CartItemType = {
  id: number;
  sku: string;
  name: string;
  description: string;
  price: number;
  is_active: number;
  created_at: string;
  updated_at: string;
  stock: number;
  photo_file_name: string;
  amount: number;
};

const contextDefaultValues: TodosContextState = {
  todos: 0,
  addTodo: () => 0,
  /* isDeleted: {} as any, */
  cartItems: [],
  addCart: () => ({}),
  DeletedCart:() => []
};

export const TodosContext = createContext<TodosContextState>(contextDefaultValues);

const GlobalProvider: FC = ({ children }) => {

  //const [isDeleted, setRemove] = useState(contextDefaultValues.isDeletedState);
  //const setisDeleted = (State: boolean, _id: number) => {
   /*  setRemove({ removeState: State, id: _id }); */
  // setRemove({ removeState:some.removeState,id:some.id});
  //};
  

 
  const [todos, setTodos] = useState<number>(contextDefaultValues.todos);
  const addTodo = () => setTodos(todos + 1);

  
  const [cartItems, setCartItems] = useState(contextDefaultValues.cartItems);


  const DeletedCart  = (
    id: number,
    addSku: string,
    name: string,
    description: string,
    price: number,
    is_active: number,
    created_at: string,
    updated_at: string,
    stock: number,
    photo_file_name: string,
    amount: number,
    isdeleted: boolean
  ) =>
 
    setCartItems((prev) => {

      const isItemInCart = prev.find((item) => item.id === id);
      const isItemInAmount = prev.find((item) => item.amount === 1 && item.id === id);

        if (isItemInAmount) {
        return prev.filter((item) => 
         item.id !== id
        );

        }
        if (isItemInCart) {
          return prev.map((item) =>
            item.id === id ? { ...item, amount: item.amount - 1 } : item
          );
        }
      

      return [
        ...prev,
        {
          id: id,
          sku: addSku,
          name: name,
          description: description,
          price: price,
          is_active: is_active,
          created_at: created_at,
          updated_at: updated_at,
          stock: stock,
          photo_file_name: photo_file_name,
          amount: amount - 1,
          isdeleted: isdeleted,
        },
      ]; 
    });  
  
   const addCart = (
    addId: number,
    addSku: string,
    name: string,
    description: string,
    price: number,
    is_active: number,
    created_at: string,
    updated_at: string,
    stock: number,
    photo_file_name: string,
    amount: number,
    isdeleted: boolean
  ) =>
    setCartItems((prev) => {
        console.log("opcion agregar")
        const isItemInCart = prev.find((item) => item.id === addId);
        if (isItemInCart) {
          return prev.map((item) =>
            item.id === addId ? { ...item, amount: item.amount + 1 } : item
          );
        }
      

      return [
        ...prev,
        {
          id: addId,
          sku: addSku,
          name: name,
          description: description,
          price: price,
          is_active: is_active,
          created_at: created_at,
          updated_at: updated_at,
          stock: stock,
          photo_file_name: photo_file_name,
          amount: amount + 1,
          isdeleted: isdeleted,
        },
      ];

    });  
  
  

    
  return (
    <TodosContext.Provider
      value={{
        todos,
        addTodo,
        cartItems,
        addCart,
        DeletedCart
      
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export default GlobalProvider;
