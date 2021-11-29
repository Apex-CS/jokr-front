import ProductAdmin from '@/pages/api/ProductAdmin';
import React, { useState, createContext, useEffect } from 'react';

export const ToolsContext = createContext({});
export const GlobalProvider = ({ children }: any) => {
  const [UserLogeado, setLogeado] = useState<any>(false);
  
  useEffect( () => {
    setLogeado(true);
  },[])
  /*  Here I created a context of userLogeado, to share the state of this variable
      you have to create the components that you want to share of this variable, context only is good
      if the variable won't chnage so much, for example the log in of a user. */
  const state = { ProductAdmin: ProductAdmin(UserLogeado) };

  return <ToolsContext.Provider value={{ state }}>{children}</ToolsContext.Provider>;
};
