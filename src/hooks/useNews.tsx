import { useEffect, useState } from 'react'
import apiClient from '../apiClient/ApiClient';
import { NewsType } from '../page/types/Types';

function useNews() {
    const [news, setNews] = useState<NewsType[]>([]);

    useEffect(() => {
      getNews();
    }, []);
    
    const getNews = async () => {
        apiClient.get<NewsType[]>(`/news`).then((res) => {
            setNews(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

  return { news }
}

export default useNews;