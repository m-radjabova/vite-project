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

interface CartItem {
  product: ProductType;
  count: number;
}

function Home() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

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

  const handleAddToCart = (product: ProductType, count: number = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, count: item.count + count }
            : item
        );
      } else {
        return [...prev, { product, count }];
      }
    });
  };

  const handleIncrease = (productId: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, count: item.count + 1 }
          : item
      )
    );
  };

  const handleDecrease = (productId: number) => {
    setCartItems(prev =>
      prev
        .map(item =>
          item.product.id === productId
            ? { ...item, count: item.count - 1 }
            : item
        )
        .filter(item => item.count > 0)
    );
  };

  return (
    <div>
        <Header />
        <Category
          categories={categories}
          activeCategoryId={activeCategoryId}
          setActiveCategoryId={setActiveCategoryId}
        />
        <div className="container">
          <div className="cart-container ">  
            <div className="left">
              <Cart 
                cartItems={cartItems} 
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                />
            </div>
            <div className="right">
              {activeCategoryId && (
                <Product
                  products={filteredProducts}
                  categories={categories}
                  onAddToCart={handleAddToCart}
                />
              )}
            </div>
          </div>
        </div>
    </div>
  )
}

export default Home