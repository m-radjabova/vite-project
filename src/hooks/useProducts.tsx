import { useEffect, useState, useCallback } from "react";
import apiClient from "../apiClient/ApiClient";
import { ProductType } from "../page/types/Types";

const useProducts = () => {
  const [product, setProduct] = useState<ProductType[]>([]);

  const fetchProducts = useCallback(() => {
    apiClient.get<ProductType[]>("/products")
      .then(res => {
        setProduct(res.data);
      })
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { product, refetch: fetchProducts };
};

export default useProducts;
