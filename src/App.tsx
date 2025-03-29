import { useState } from "react";
import ProductList from "./component/ProductList"
import ProductForm from "./component/ProductForm";
import ProductFilter from './component/ProductFilter';

export interface Category {
  id: number
  name: string
}

export interface Product{
  id: number
  title: string
  description: string
  price: number
  categoryId: number 
}

function App() {

  const [categories] = useState<Category[]>([
    {id: 1, name: 'Candies'},
    {id: 2, name: 'Desserts'},
    {id: 3, name: 'Drinks'},
    {id: 4, name: 'Ice Creams'},
    {id: 5, name: 'Nuts'},
    {id: 6, name: 'Fruits'},
    {id: 7, name: 'Vegetables'}
  ]);

  const [products, setProducts] = useState<Product[]>([
    { id: 1, title: "Chocolate", description: "Sweet and delicious", price: 5, categoryId: 1 },
    { id: 2, title: "Gummy Bears", description: "Chewy and fruity", price: 3, categoryId: 1 },
    { id: 3, title: "Cake", description: "Soft and creamy", price: 10, categoryId: 2 },
    { id: 4, title: "Brownie", description: "Rich and chocolaty", price: 8, categoryId: 2 },
    { id: 5, title: "Coke", description: "Refreshing drink", price: 2, categoryId: 3 },
    { id: 6, title: "Orange Juice", description: "Freshly squeezed", price: 4, categoryId: 3 },
    { id: 7, title: "Vanilla Ice Cream", description: "Creamy and sweet", price: 6, categoryId: 4 },
    { id: 8, title: "Chocolate Ice Cream", description: "Rich and creamy", price: 7, categoryId: 4 },
    { id: 9, title: "Almonds", description: "Healthy and crunchy", price: 12, categoryId: 5 },
    { id: 10, title: "Cashews", description: "Rich and buttery", price: 15, categoryId: 5 },
    { id: 11, title: "Apple", description: "Crisp and juicy", price: 1, categoryId: 6 },
    { id: 12, title: "Banana", description: "Sweet and soft", price: 1, categoryId: 6 },
    { id: 13, title: "Carrot", description: "Fresh and crunchy", price: 2, categoryId: 7 },
    { id: 14, title: "Broccoli", description: "Healthy and green", price: 3, categoryId: 7 },
    { id: 15, title: "Strawberry", description: "Sweet and juicy", price: 4, categoryId: 6 },
    { id: 16, title: "Blueberry", description: "Fresh and juicy", price: 5, categoryId: 6 },
    { id: 17, title: "Spinach", description: "Healthy and green", price: 6, categoryId: 7 },
    { id: 18, title: "Lollipop", description: "Colorful and sweet", price: 2, categoryId: 1 },
    { id: 19, title: "Marshmallow", description: "Soft and fluffy", price: 3, categoryId: 1 },
    { id: 20, title: "Cheesecake", description: "Rich and creamy", price: 12, categoryId: 2 },
    { id: 21, title: "Tiramisu", description: "Coffee-flavored dessert", price: 15, categoryId: 2 },
    { id: 22, title: "Pepsi", description: "Refreshing soda", price: 2, categoryId: 3 },
    { id: 23, title: "Lemonade", description: "Fresh and tangy", price: 3, categoryId: 3 },
    { id: 24, title: "Mango Ice Cream", description: "Tropical and sweet", price: 6, categoryId: 4 },
    { id: 25, title: "Pistachio Ice Cream", description: "Nutty and creamy", price: 7, categoryId: 4 },
    { id: 26, title: "Walnuts", description: "Rich in omega-3", price: 10, categoryId: 5 },
    { id: 27, title: "Peanuts", description: "Crunchy and salty", price: 5, categoryId: 5 },
    { id: 28, title: "Grapes", description: "Juicy and sweet", price: 2, categoryId: 6 },
    { id: 29, title: "Pineapple", description: "Tropical and tangy", price: 3, categoryId: 6 },
    { id: 30, title: "Potato", description: "Versatile and starchy", price: 1, categoryId: 7 },
    { id: 31, title: "Tomato", description: "Fresh and juicy", price: 2, categoryId: 7 },
  ]);


  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [currentFilter, setCurrentFilter] = useState<number | string>("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleFilter = (categoryId: number | string) => {
    setCurrentFilter(categoryId);
    if (categoryId === "") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((product) => product.categoryId === categoryId));
    }
  };

  const addProducts = (product: Product) => {
    const newProduct = { ...product, id: products.length + 1, categoryId: Number(product.categoryId) };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);

    if (currentFilter === "" || currentFilter === newProduct.categoryId) {
      setFilteredProducts(updatedProducts.filter((p) => currentFilter === "" || p.categoryId === currentFilter));
    }
  };

  const startEditProduct = (product: Product) => {
    setEditingProduct(product);
  };
  
  const updateProduct = (updatedProduct: Product) => {
    const updatedProducts = products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProducts(updatedProducts);

    if (currentFilter === "" || currentFilter === updatedProduct.categoryId) {
      setFilteredProducts(updatedProducts.filter((p) => currentFilter === "" || p.categoryId === currentFilter));
    }

    setEditingProduct(null);
  };

  return (
    <div className="container mt-3 ">
      <h1 className=" mb-4 display-6">
        Product Management
      </h1>
      <ProductForm 
        categories={categories}
        addProducts={addProducts}
        updateProduct={updateProduct}
        editingProduct={editingProduct}
      />
      <ProductFilter 
        filteredProducts={handleFilter} 
        categories={categories} 
      />
      <ProductList
        deleteProducts={(id: number) => {
          const updatedProducts = products.filter((product) => product.id !== id);
          setProducts(updatedProducts);

          if (currentFilter === "") {
            setFilteredProducts(updatedProducts);
          } else {
            setFilteredProducts(updatedProducts.filter((product) => product.categoryId === currentFilter));
          }
        }}
        editProduct={startEditProduct}
        products={filteredProducts}
      />
    </div>
  )
}

export default App

