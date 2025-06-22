import { useEffect, useState } from "react";
import apiClient from "../apiClient/ApiClient";
import { ProductType } from "../page/types/Types";
import { toast } from "react-toastify";

const useProducts = () => {
 const [products, setProducts] = useState<ProductType[]>([]);
  
  const getProducts = () => {
    apiClient.get("/products").then((res) => {
      setProducts(res.data);
      toast.success("Products fetched successfully");
    }).catch((err) => {
      toast.error("Error fetching products");
      console.log(err);
    })
  }

  useEffect(() => {
    getProducts();
  }, []);

  return { products };
};

export default useProducts;