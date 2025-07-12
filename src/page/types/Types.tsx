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
}

export interface ReviewsType{
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
