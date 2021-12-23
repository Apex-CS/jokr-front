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
      subcategory: string,
      photo_file_name: string,
      amount:number
    }>;
    /* Add items to cart */

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
      subcategory: string,
      photo_file_name: string,
      amount:number 
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
        subcategory: string,
        photo_file_name: string,
        amount:number ,
        ) => void;
      /* Check if modal is open or closer */
      open:boolean;
      isOpen: (open:boolean) => void;


      success:boolean;
      isSuccess: (success:boolean) => void;
    };
