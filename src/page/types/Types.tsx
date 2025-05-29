export interface ProductType {
  id: number;
  name: string;
  description: string;
  compound: string;
  price: number;
  imageUrl: string;
  categoryId: string;
  weight: number;
}

export interface CategoryType {
  id: string;
  name: string;
}

export interface CartItem {
  product: ProductType;
  count: number;
}


export interface CartItemForCart {
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    weight?: number;
  };
  count: number;
}