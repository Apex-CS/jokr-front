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

import React, { createContext, useState, FC } from "react";
import { TodosContextState } from "./types";

const contextDefaultValues: TodosContextState = {
  todos: 0,
  addTodo: () => 0
};

export const TodosContext = createContext<TodosContextState>(
  contextDefaultValues
);

const GlobalProvider: FC = ({ children }) => {
  const [todos, setTodos] = useState<number>(contextDefaultValues.todos);

  const addTodo = (newTodo: number) => setTodos(todos + 1);
console.log("cantidad de productos",todos)
  return (
    <TodosContext.Provider
      value={{
        todos,
        addTodo
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export default GlobalProvider;