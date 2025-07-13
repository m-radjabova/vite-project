import { useEffect, useState } from 'react'

import apiClient from '../apiClient/ApiClient';
import { ArticleType } from '../page/types/Types';

function useArticles() {
    const [articles, setArticles] = useState<ArticleType[]>([]);

    useEffect(() => {
      getArticles();
    }, []);
    
    const getArticles = async () => {
        apiClient.get<ArticleType[]>(`/articles`).then((res) => {
            setArticles(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

  return { articles }
}

export default useArticles