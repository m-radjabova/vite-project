import { useEffect, useState } from "react";
import apiClient from "../apiClient/ApiClient";
import { ProductType } from "../page/types/Types";
import { toast } from "react-toastify";
import { FieldValues } from 'react-hook-form';

const useProducts = () => {
 const [products, setProducts] = useState<ProductType[]>([]);
  
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    apiClient.get("/products").then((res) => {
      setProducts(res.data);
    }).catch((err) => {
      toast.error("Error fetching products");
      console.log(err);
    })
  }

  const deleteProduct = (id: string) => {
    apiClient.delete(`/products/${id}`).then(() => {
      setProducts(products.filter(product => product.id !== id));
      toast.success("Product deleted successfully");
    }).catch((err) => {
      toast.error("Error deleting product");
      console.log(err);
    })
  }

  const addProducts = (data: FieldValues) => {
    apiClient.post("/products", data).then((res) => {
      setProducts(prev => [...prev, res.data]);
      toast.success("Product added successfully");
    }).catch((err) => {
      toast.error("Error adding product");
      console.log(err);
    })
  }

  const updateProduct = (id: string, data: FieldValues) => {
    apiClient.put(`/products/${id}`, data).then((res) => {
      setProducts(products.map(product => product.id === id ? res.data : product));
      toast.success("Product updated successfully");
    }).catch((err) => {
      toast.error("Error updating product");
      console.log(err);
    })
  }


  return { products, deleteProduct, addProducts, updateProduct };
};

export default useProducts;