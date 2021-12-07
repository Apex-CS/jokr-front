
export type TodosContextState = {
    todos: number;
    addTodo: (quantiy:number) => void;
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
      amount:number
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
      amount:number 
      ) => void;
  };
