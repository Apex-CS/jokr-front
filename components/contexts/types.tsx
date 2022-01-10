export type TodosContextState = {
  todos: number;
  addTodo: (quantiy: number) => void;
  /* Add Items to cart */
  cartItems: Array<{
    id: number;
    sku: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    subcategory: string;
    photoUrl: string;
    amount: number;
  }>;

  addCart: (
    id: number,
    sku: string,
    name: string,
    description: string,
    price: number,
    stock: number,
    subcategory: string,
    photoUrl: string,
    amount: number
  ) => void;

  DeletedCart: (
    id: number,
    sku: string,
    name: string,
    description: string,
    price: number,
    stock: number,
    subcategory: string,
    photoUrl: string,
    amount: number
  ) => void;
  /* Check if modal is open or closer */
  open: boolean;
  isOpen: (open: boolean) => void;

  /* if something is done correctly */
  success: boolean;
  isSuccess: (success: boolean) => void;

  /* Show loader compoent */
  loaderShow: boolean;
  isLoader: (loaderShow: boolean) => void;

  /* GET All products */

  AllProducts: Array<{
    description: string;
    id: number;
    name: string;
    photoPublicId: string;
    photoUrl: string;
    price: number;
    sku: string;
    stock: number;
    subcategories: {
      categories: {
        id: number;
        name: string;
      };
    };
    subcategoriesName: string;
  }>;
  /* To refresh any component */
  callback: boolean;
  isCallback: (callback: boolean) => void;

  Token:string;
/*   IsToken:(token:string) => void; */

  Login: { name: string; login: boolean; role: string};
  IsLogged: (name: string, login: boolean, role: string) => void;
};
