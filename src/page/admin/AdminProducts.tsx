import { useState } from "react";
import useCategories from "../../hooks/useCategories";
import useProducts from "../../hooks/useProduct";
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import DeleteModal from "./DeleteModal";
import AddProductModal from "./AddProductModal";
import { ProductType } from "../types/Types";

function AdminProducts() {
    const {products, deleteProduct} = useProducts();
    const {categories} = useCategories();
    const [activeId, setActiveId] = useState(
        categories.length > 0 ? categories[0].id : null
    );
    const [deleteProductId, setDeleteProductId] = useState<string | null>(null);
    const [deleteOpenModal, setDeleteOpenModal] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [editProduct, setEditProduct] = useState<ProductType | null>(null);

  return (
    <>
        <div className="admin-products-container">
            <div className="admin-products-header">
                <h2>Product Management</h2>
                <button className="add-product-btn" onClick={() => setOpenAddModal(true)}>
                    <FaPlus /> Add Product
                </button>
            </div>

            <div className="admin-products">
                <div className="admin-products-categories">
                    {categories.map((category) => (
                        <div 
                            className={`admin-categories-item ${activeId === category.id ? 'active' : ''}`}
                            key={category.id}
                            onClick={() => setActiveId(category.id)}
                            >
                            <h5>{category.categoryName}</h5>
                        </div>
                    ))}
                </div>

                <div className="admin-products-list">
                {products
                    .filter((product) => product.categoryId === activeId)
                    .map((product) => (
                    <div className="admin-product-card" key={product.id}>
                        <div className="product-image-container">
                            <img src={product.image} alt={product.name} className="admin-product-image" />
                            <div className="product-actions">
                                <button 
                                    onClick={() => {
                                        setEditProduct(product); 
                                        setOpenAddModal(true);  
                                    }}
                                    className="edit-btn">
                                    <FaEdit />
                                </button>
                                <button 
                                    onClick={() => {
                                        setDeleteOpenModal(true);
                                        setDeleteProductId(product.id);
                                    }}
                                    className="delete-btn">
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                        
                        <div className="admin-product-info">
                            <h3 className="admin-product-name">{product.name}</h3>
                            <p className="admin-product-description">{product.description}</p>

                            <div className="admin-price-container">
                                <span className="admin-current-price">${product.price}</span>
                                {product.oldPrice && (
                                <span className="admin-old-price">${product.oldPrice}</span>
                                )}
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
        <DeleteModal
            deleteOpenModal={deleteOpenModal}
            setDeleteOpenModal={setDeleteOpenModal}
            deleteProductId={deleteProductId}
            deleteProduct={deleteProduct}
            setDeleteProductId={setDeleteProductId}
        />
        <AddProductModal 
            open={openAddModal} 
            onClose={() =>{ 
                setEditProduct(null);
                setOpenAddModal(false)
            }}
            editProduct={editProduct}
        />
    </>
  )
}

export default AdminProducts