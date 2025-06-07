import { useState } from "react";
import useCategories from "../../hooks/useCategories";
import AdminCategory from "./AdminCategory";
import AdminProductDisplay from "./AdminProductDisplay";
import useProducts from "../../hooks/useProducts";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import apiClient from "../../apiClient/ApiClient";
import { toast } from "react-toastify";


function AdminProduct() {
  const { categories } = useCategories();
  const { product, refetch } = useProducts();
  const navigate = useNavigate();
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  const filteredProducts = activeCategoryId
    ? product.filter(p => p.categoryId === activeCategoryId)
    : product;


  const deleteProduct = async (id: string) => {
    try {
      await apiClient.delete(`/products/${id}`);
      toast.success("Product deleted successfully 🍔");
      refetch();
    } catch (error) {
      toast.error("Failed to delete product");
      console.error(error);
    }
  };

  return (
    <>
      <div className="category-header">
          <h2 className="category-title">Products</h2>
            <button 
              onClick={() => navigate("/admin/product/add")} 
              className="add-button">
              <FiPlus /> Add Product
            </button>
      </div>
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
              deleteProduct={deleteProduct}
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
    </>
  );
}

export default AdminProduct;