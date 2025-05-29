import { useEffect, useState } from "react";
import apiClient from "../apiClient/ApiClient";
import { ProductType } from "../page/types/Types";

const useProducts = () => {
  const [product, setProduct] = useState<ProductType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(6); 
  const [totalPages, setTotalPages] = useState<number>(10);

  useEffect(() => {
    apiClient.get<ProductType[]>(`/products?page=${page}&limit=${limit}`)
      .then(res => {
        setProduct(res.data);
        setTotalPages(Math.floor(res.headers["x-total-count"] / limit));
      })
      .catch(err => console.error("Error fetching products:", err));
  }, [page, limit]);

  return { product, page, setPage, totalPages, setLimit };
};

export default useProducts;
