import { useEffect, useState } from "react";
import apiClient from "../../apiClient/ApiClient";
import Header from "../../components/Header";
import Main from "../../components/Main";
import MainServices from "../../components/MainServices";
import Oatmea from "../../components/Oatmea";
import { CategoryType, ProductType } from "../types/Types";
import { toast } from "react-toastify";
import OurProducts from "../../components/OurProducts";
import Order from './../../components/Order';

function Home() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    getCategory();
    getProducts();
  }, [])

  const getCategory = () => {
    apiClient.get("/categories").then((res) => {
      setCategories(res.data);
      toast.success("Categories fetched successfully");
    }).catch((err) => {
      toast.error("Error fetching categories");
      console.log(err);
    })
  }

  const getProducts = () => {
    apiClient.get("/products").then((res) => {
      setProducts(res.data);
      toast.success("Products fetched successfully");
    }).catch((err) => {
      toast.error("Error fetching products");
      console.log(err);
    })
  }

  return (
    <div>
      <Header />
      <div style={{backgroundColor : "#f0dde3"}}>
        <Main />
      </div>
      <div className="container">
        <MainServices />
      </div>
      <div style={{backgroundColor : "#F8EDF0"}}>
        <Oatmea />
      </div>
      <div className="container">
        <OurProducts categories={categories} products={products} />
      </div>
      <div style={{backgroundColor : "#F8EDF0"}}>
        <Order/>
      </div>
    </div>
  );
}

export default Home;