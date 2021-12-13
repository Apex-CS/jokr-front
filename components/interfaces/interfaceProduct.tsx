export interface NewProduct {
  sku: string;
  name: string;
  description: string;
  price: number;
  is_active: number;
  created_at: string;
  updated_at: string;
  stock: number;
  subcategory: string;
  photo_file_name: string;
  
}

export interface Iproduct extends NewProduct {
  id: number;
}
