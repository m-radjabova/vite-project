import { useEffect, useState } from "react";
import apiClient from "../apiClient/ApiClient";
import { CategoryType } from "../page/types/Types";
import { toast } from "react-toastify";
import { FieldValues } from "react-hook-form";

const useCategories = () => {
 const [category, setCategory] = useState<CategoryType[]>([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    apiClient.get("/categories").then((res) => {
      setCategory(res.data);
    }).catch((err) => {
      toast.error("Error fetching categories");
      console.log(err);
    })
  }

  const addCategory = (data: FieldValues) => {
    apiClient.post("/categories", data).then((res) => {
      setCategory(prev => [...prev, res.data]); 
      toast.success("Category added successfully");
    }).catch((err) => {
      toast.error("Error adding category");
      console.log(err);
    });
  };


  const updateCategory = (id: string, data: FieldValues) => {
    apiClient.put(`/categories/${id}`, data).then((res) => {
      setCategory(category.map(cat => cat.id === id ? res.data : cat));
      toast.success("Category updated successfully");
    }).catch((err) => {
      toast.error("Error updating category");
      console.log(err);
    });
  }

  const deleteCategory = (id: string) => {
    apiClient.delete(`/categories/${id}`).then(() => {
      setCategory(category.filter(cat => cat.id !== id));
      toast.success("Category deleted successfully");
    }).catch((err) => {
      toast.error("Error deleting category");
      console.log(err);
    });
  }

  return { category, addCategory, updateCategory, deleteCategory };
};

export default useCategories;