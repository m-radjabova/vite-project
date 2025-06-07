import { useCallback, useEffect, useState } from "react";
import apiClient from "../apiClient/ApiClient";
import { CategoryType } from "../page/types/Types";
import { toast } from "react-toastify";

const useCategories = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const deleteCategory = async (id: string) => {
    try {
      await apiClient.delete(`/categories/${id}`);
      toast.success("Category deleted successfully 🍔");
      getCategories();
    } catch (error) {
      toast.error("Failed to delete category");
      console.error(error);
    }
  }

  const getCategories = useCallback(() => {
      apiClient.get<CategoryType[]>("/categories")
        .then(res => {
          setCategories(res.data);
        })
        .catch(err => console.error("Error fetching products:", err));
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return { categories, deleteCategory, refetch : getCategories };
};

export default useCategories;
