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