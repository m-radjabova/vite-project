export interface CategoryType {
    id: string;
    categoryName: string;
}

export interface ProductType {
    id: string;
    name: string;
    description: string;
    price: number;
    oldPrice: number;
    categoryId : string;
    image: string;
}

export interface CarouselImg {
  id: number;
  image: string;
  title: string;
}