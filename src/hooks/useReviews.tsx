import { useEffect, useState } from "react";
import apiClient from "../apiClient/ApiClient";
import { ReviewsType } from "../page/types/Types";

function useReviews() {
    const [reviews, setReviews] = useState<ReviewsType[]>([]);

    useEffect(() => {
        getReviews();
    }, []);

    const getReviews = async () => {
        apiClient.get<ReviewsType[]>(`/reviews`).then((res) => {
            setReviews(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }
    return { 
        reviews, getReviews, 
    };
}

export default useReviews;