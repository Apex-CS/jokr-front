export type RemoveCart ={
  removeState:boolean;
  id:number;
}



/* fin */
export type  CartItemType = {
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
}

/* fin */

export type TodosContextState = {
    todos: number;
    addTodo: (quantiy:number) => void;


    isDeletedState: boolean;
    IsDeletedCartId: number;
    setRemove: (state:boolean) => void;
    setRemoveId: (id:number) => void;



    setisDeleted:(
      setdelete:boolean,
      setIdDelete:number
      ) => void;

    cartItems:Array<{
      id:number,
      sku:string,
      name: string,
      description: string, 
      price: number,
      is_active: number,
      created_at: string,
      updated_at: string,
      stock: number,
      photo_file_name: string,
      amount:number,
      isdeleted:boolean
    }>;

    addCart:(
      id:number,
      sku:string,
      name: string,
      description: string, 
      price: number,
      is_active: number,
      created_at: string,
      updated_at: string,
      stock: number,
      photo_file_name: string,
      amount:number ,
      isdeleted:boolean
      ) => void;

     DeletedCart:(
        id:number,
        sku:string,
        name: string,
        description: string, 
        price: number,
        is_active: number,
        created_at: string,
        updated_at: string,
        stock: number,
        photo_file_name: string,
        amount:number ,
        isdeleted:boolean
        ) => void;

    };
