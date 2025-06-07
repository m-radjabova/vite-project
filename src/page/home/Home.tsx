import { useState } from "react";
import Header from "../../components/Header";
import Product from "../../components/Product";
import Category from "../../components/Category";
import Cart from "../../components/Cart";
import useProducts from "../../hooks/useProducts";
import useCategories from "../../hooks/useCategories";
import { CartItem, ProductType } from "../types/Types";
import Main from "../../components/Main";
import Footer from "../../components/Footer";
import ProductCarousel from "../../components/ProductCarousel";

function Home() {
  const {product} = useProducts();
  const { categories } = useCategories();
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const filteredProducts = activeCategoryId
    ? product.filter(p => p.categoryId === activeCategoryId)
    : product;

  const handleAddToCart = (product: ProductType, count = 1) => {
    const existingItem = cartItems.find(item => item.product.id === product.id);

    if (existingItem) {
      const updatedCart = cartItems.map(item => {
        if (item.product.id === product.id) {
          return {
            ...item,
            count: item.count + count
          };
        }
        return item;
      });
      setCartItems(updatedCart);
    } else {
      const newItem = { product, count };
      setCartItems([...cartItems, newItem]);
    }
  };


  const handleIncrease = (productId: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, count: item.count + 1 } : item
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
      <Main />
      <ProductCarousel />
      <Category
        categories={categories}
        activeCategoryId={activeCategoryId}
        setActiveCategoryId={setActiveCategoryId}
      />
      <div className="container">
        <div className="cart-container">
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
      <Footer />
    </div>
  );
}

export default Home;