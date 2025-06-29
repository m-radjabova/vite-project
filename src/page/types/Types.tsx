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
  id: string;
  image: string;
  title: string;
}

export interface QuestionType {
  id: string;
  question: string;
  userId: string;
  username: string;
  createdAt: string;
  answer: string;
}