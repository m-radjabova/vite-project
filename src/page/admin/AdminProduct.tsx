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
          <h2 className="category-title">Продукты</h2>
            <button 
              onClick={() => navigate("/admin/product/add")} 
              className="add-button">
              <FiPlus /> Добавить продукт
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
              <h3>Выберите категорию для просмотра продуктов</h3>
              <p>Пожалуйста, выберите категорию из списка слева.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminProduct;