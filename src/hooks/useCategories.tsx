import { useEffect, useState } from "react";
import apiClient from "../apiClient/ApiClient";
import { CategoryType } from "../page/types/Types";
import { toast } from "react-toastify";

const useCategories = () => {
 const [categories, setCategories] = useState<CategoryType[]>([]);

  const getCategories = () => {
    apiClient.get("/categories").then((res) => {
      setCategories(res.data);
    }).catch((err) => {
      toast.error("Error fetching categories");
      console.log(err);
    })
  }

  useEffect(() => {
    getCategories();
  }, []);

  return { categories };
};

export default useCategories;