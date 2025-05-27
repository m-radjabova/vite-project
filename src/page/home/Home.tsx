import { useEffect, useState } from "react";
import Header from "../../components/Header"
import Product from "../../components/Product";
import apiClient from "../../apiClient/ApiClient";
import Category from "../../components/Category";
import Cart from "../../components/Cart";

export interface ProductType {
  id: number;
  name: string;
  description: string;
  compound: string;
  price: number;
  imageUrl: string;
  categoryId: string;
  weight: number;
}

export interface CategoryType {
    id: string;
    name: string;
}

function Home() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const getProducts = () => {
    apiClient.get<ProductType[]>("/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const getCategories = () => {
        apiClient.get<CategoryType[]>("/categories")
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
        });
  };

  const filteredProducts = activeCategoryId
    ? products.filter((p) => p.categoryId === activeCategoryId)
    : [];

  return (
    <div>
        <Header />
        <Category
          categories={categories}
          activeCategoryId={activeCategoryId}
          setActiveCategoryId={setActiveCategoryId}
        />
        <div className="cart-container">
          <div className="left">
            <Cart />
          </div>
          <div className="right">
            {activeCategoryId && (
              <Product products={filteredProducts} categories={categories} />
            )}
          </div>
        </div>
    </div>
  )
}

export default Home