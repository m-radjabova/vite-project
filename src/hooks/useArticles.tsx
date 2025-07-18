import { useEffect, useState } from 'react'

import apiClient from '../apiClient/ApiClient';
import { ArticleType } from '../page/types/Types';
import { toast } from 'react-toastify';
import { FieldValues } from 'react-hook-form';

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

    const addArticle = async (data: FieldValues) => {
      try {
        const res = await apiClient.post("/articles", data);
        setArticles(prev => [...prev, res.data]);
        toast.success("Article added successfully");
      } catch (err) {
        console.log(err);
        toast.error("Error adding article");
      }
    }

    const updateArticle = async (id: string, data: FieldValues) => {
      try {
        const res = await apiClient.put(`/articles/${id}`, data);
        setArticles(articles.map(a => a.id === id ? res.data : a));
        toast.success("Article updated successfully");
      } catch (err) {
        console.log(err);
        toast.error("Error updating article");
      }
    }

    const deleteArticle = async (id: string) => {
      try {
        await apiClient.delete(`/articles/${id}`);
        setArticles(articles.filter(a => a.id !== id));
        toast.success("Article deleted successfully");
      } catch (err) {
        console.log(err);
        toast.error("Error deleting article");
      }
    };

  return { articles, deleteArticle, addArticle, updateArticle };
}

export default useArticles