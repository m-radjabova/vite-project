export interface BouqetType {
    id: string;
    name: string;
    price: string;
    oldPrice: string;
    status: string;
    compound: string;
    image: string;
    size: string;
    isLiked: boolean;
    category: string[];
    reviews: ReviewsType[];
    count?: number; 
}

export interface ReviewsType{
    userId: string;
    username: string;
    id: string;
    author: string;
    date: string;
    time: string;
    location: string;
    rating: number;
    text: string;
}

export interface PartnerType{
    id: string;
    imageLogo: string;
}

export interface ArticleType {
    id: string;
    title: string;
    date: string;
    description: string;
    image: string;
    createdAt: string;
}

export interface NewsType {
    id: string;
    title: string;
    text: string;
    date: string;
    createdAt: string;
}

export interface PointType{
    id: string;
    address: string;
    phone: string;
}

export interface CategoryType{
    id: string;
    title: string;
}


export interface OrderType {
    id: string;
    userName: string;
    name: string;
    phone: string;
    email: string;
    items: BouqetType[];
    deliveryMethod: string;
    address?: string;
    paymentMethod: string;
    totalPrice: number;
    createdAt: string;
    status: string;
}

export interface ImageType{
    id: string;
    image: string
}

export interface FavoriteType {
  id: string;
  bouquetId: string;
  userId: string;
  userName: string;
}
