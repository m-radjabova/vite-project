import { useEffect, useState } from 'react'
import { CategoryType } from '../page/types/Types';
import apiClient from '../apiClient/ApiClient';

function useCategories() {
    const [category, setCategory] = useState<CategoryType[]>([]);

    useEffect(() => {
      getReviews();
    }, []);
    
    const getReviews = async () => {
        apiClient.get<CategoryType[]>(`/category`).then((res) => {
            setCategory(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

  return { category }
}

export default useCategories