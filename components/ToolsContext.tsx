import ProductAdmin from '@/pages/api/ProductAdmin';
import React,{ useState ,createContext} from 'react';

export const ToolsContext = createContext({});
export const  GlobalProvider = ({children}:any)=> {
    const [UserLogeado,setLogeado] =  useState<any>(false); 
    const state = { ProductAdmin:ProductAdmin(UserLogeado)}

     {/* AQUI VA ESTAR TODOS NUESTRO COMPIENTES */}
    return (
        <ToolsContext.Provider value={{state}}>
                {children}
        </ToolsContext.Provider>
    )
}

