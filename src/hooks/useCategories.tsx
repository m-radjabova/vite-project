import { useEffect, useState } from "react";
import apiClient from "../apiClient/ApiClient";
import { CategoryType } from "../page/types/Types";
import { toast } from "react-toastify";
import { FieldValues } from "react-hook-form";

const useCategories = () => {
  const [category, setCategory] = useState<CategoryType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    setIsLoading(true); 
    apiClient.get("/categories")
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        toast.error("Error fetching categories");
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false); 
      });
  };

  const addCategory = (data: FieldValues) => {
    setIsLoading(true);
    return apiClient.post("/categories", data)
      .then((res) => {
        setCategory(prev => [...prev, res.data]); 
        toast.success("Category added successfully");
      })
      .catch((err) => {
        toast.error("Error adding category");
        console.log(err);
        throw err;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const updateCategory = (id: string, data: FieldValues) => {
    setIsLoading(true);
    return apiClient.put(`/categories/${id}`, data)
      .then((res) => {
        setCategory(category.map(cat => cat.id === id ? res.data : cat));
        toast.success("Category updated successfully");
      })
      .catch((err) => {
        toast.error("Error updating category");
        console.log(err);
        throw err;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deleteCategory = (id: string) => {
    setIsLoading(true);
    return apiClient.delete(`/categories/${id}`)
      .then(() => {
        setCategory(category.filter(cat => cat.id !== id));
        toast.success("Category deleted successfully");
      })
      .catch((err) => {
        toast.error("Error deleting category");
        console.log(err);
        throw err;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { 
    category, 
    addCategory, 
    updateCategory, 
    deleteCategory, 
    isLoading,
    getCategories 
  };
};

export default useCategories;