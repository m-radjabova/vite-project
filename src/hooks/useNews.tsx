import { useEffect, useState } from 'react'
import apiClient from '../apiClient/ApiClient';
import { NewsType } from '../page/types/Types';
import { toast } from 'react-toastify';
import { FieldValues } from 'react-hook-form';

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

    const addNews = async (data: FieldValues) => {
      try {
        const res = await apiClient.post("/news", data);
        setNews(prev => [...prev, res.data]);
        toast.success("News added successfully");
      } catch (err) {
        console.log(err);
        toast.error("Error adding news");
      }
    };

    const updateNews = async (id: string, data: FieldValues) => {
      try {
        const res = await apiClient.put(`/news/${id}`, data);
        setNews(news.map(n => n.id === id ? res.data : n));
        toast.success("News updated successfully");
      } catch (err) {
        console.log(err);
        toast.error("Error updating news");
      }
    }

    const deleteNews = async (id: string) => {
      try {
        await apiClient.delete(`/news/${id}`);
        setNews(news.filter(n => n.id !== id));
        toast.success("News deleted successfully");
      } catch (err) {
        console.log(err);
      }
    };

  return { news , deleteNews, addNews, updateNews }
}

export default useNews;