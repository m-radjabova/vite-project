import { useEffect, useState } from "react";
import apiClient from "../apiClient/ApiClient";
import { CategoryType } from "../page/types/Types";

const useCategories = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  

  useEffect(() => {
    apiClient.get<CategoryType[]>("/categories")
      .then(res => setCategories(res.data))
      .catch(err => console.error("Error fetching categories:", err));
  }, []);

  return categories;
};

export default useCategories;
