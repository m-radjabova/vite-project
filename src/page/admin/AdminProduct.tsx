import { useState } from "react";
import useCategories from "../../hooks/useCategories";
import AdminCategory from "./AdminCategory";
import AdminProductDisplay from "./AdminProductDisplay";
import useProducts from "../../hooks/useProducts";

function AdminProduct() {
  const categories = useCategories();
  const { product } = useProducts();
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  const filteredProducts = activeCategoryId
    ? product.filter(p => p.categoryId === activeCategoryId)
    : product;

  return (
    <div className="admin-product">
      <div className="sidebar-category">
        <AdminCategory 
          categories={categories} 
          activeCategoryId={activeCategoryId} 
          setActiveCategoryId={setActiveCategoryId} 
        />
      </div>
      <div className="content-product">
        {activeCategoryId ? (
          <AdminProductDisplay
            products={filteredProducts}
            categories={categories}
          />
        ) : (
          <div className="empty-state">
            <h3>Select a category to view products</h3>
            <p>Choose from the categories on the left to display products</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminProduct;