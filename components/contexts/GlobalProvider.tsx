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

import React, { createContext, useState, FC } from 'react';
import { TodosContextState } from './types';

const contextDefaultValues: TodosContextState = {
  todos: 0,
  addTodo: () => 0,
  cartItems: [],
  addCart: () => {},
};

export const TodosContext = createContext<TodosContextState>(contextDefaultValues);

const GlobalProvider: FC = ({ children }) => {
  const [todos, setTodos] = useState<number>(contextDefaultValues.todos);
  const addTodo = () => setTodos(todos + 1);

  const [cartItems, setCartItems] = useState(contextDefaultValues.cartItems);
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
    amount: number
  ) =>
    setCartItems((prev) => {
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
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export default GlobalProvider;
