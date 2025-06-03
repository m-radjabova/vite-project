import { useState } from "react";
import { CategoryType, ProductType } from "../types/Types";
import ViewModalProduct from "./ViewModalProduct";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";

interface Props{
    products: ProductType[];
    categories: CategoryType[];
}

function AdminProductDisplay({products, categories}: Props ) {

    const getCategoryName = (categoryId: string | number) => {
        const cat = categories.find(c => c.id === categoryId || c.id === String(categoryId));
        return cat ? cat.name : "";
    };

    const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
    const [count, setCount] = useState<number>(1);

    const handleViewOpenModal = (product: ProductType) => {
        setSelectedProduct(product);
        setCount(1);
    };

    const handleViewClose = () => {
        setSelectedProduct(null);
        setCount(1);
    };

  return (
    <>
        <div className="category-header">
            <h2 className="category-title">Products</h2>
            <button className="add-button">
                <FiPlus /> Add Product
            </button>
        </div>
        <div className="adminProductList">
            {products.map((product) => (
            <div
                key={product.id}
                className="adminProductCard"
                onClick={() => handleViewOpenModal(product)}
            >
                <img
                src={product.imageUrl}
                alt={product.name}
                className="adminProductImg"
                />
                
                <div className="adminProductInfo">
                    <div className="adminProductPrice">{product.price}₽</div>
                    <div className="adminProductName">{product.name}</div>
                    <div className="adminProductCategory">
                        {getCategoryName(product.categoryId)}
                    </div>
                    <div className="adminProductWeight">{product.weight}г</div>
                </div>
                <div className="adminProductActions">
                <button 
                    className="editButton"
                    onClick={(e) => {
                    e.stopPropagation();
                    }}
                >
                    <FiEdit2 /> Edit
                </button>
                <button 
                    className="deleteButton"
                    onClick={(e) => {
                    e.stopPropagation();
                    }}
                >
                    <FiTrash2 /> Delete
                </button>
                </div>
            </div>
            ))}
        </div>
            {selectedProduct && (
                <ViewModalProduct selectedProduct={selectedProduct} handleViewClose={handleViewClose} count={count} setCount={setCount} handleAdd={handleViewClose} />
            )}
    </>
  )
}

export default AdminProductDisplay