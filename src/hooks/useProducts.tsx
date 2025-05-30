import { useEffect, useState } from "react";
import apiClient from "../apiClient/ApiClient";
import { ProductType } from "../page/types/Types";

const useProducts = () => {
  const [product, setProduct] = useState<ProductType[]>([]);
  // const [page, setPage] = useState<number>(1);
  // const [limit] = useState<number>(10); 
  // const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    apiClient.get<ProductType[]>(`/products`)
      .then(res => {
        // setPageSize(Math.floor(res.headers["x-total-count"] / limit));
        setProduct(res.data);
      })
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  return { product};
};

export default useProducts;
