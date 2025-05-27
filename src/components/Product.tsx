import { useState } from "react";
import { CategoryType, ProductType } from "../page/home/Home";
import styles from "../css/Product.module.css";

interface ProductProps {
    products: ProductType[];
    categories: CategoryType[];
}

function Product({ products, categories }: ProductProps) {
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);

  const getCategoryName = (categoryId: string | number) => {
    const cat = categories.find(c => c.id === categoryId || c.id === String(categoryId));
    return cat ? cat.name : "";
  };

  return (
    <>
      <div className={styles.productList}>
        {products.map((product) => (
          <div
            key={product.id}
            className={styles.productCard}
            onClick={() => setSelectedProduct(product)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className={styles.productImg}
            />
            <div style={{ width: "100%" }}>
              <div className={styles.productPrice}>
                {product.price}₽
              </div>
              <div className={styles.productName}>
                {product.name}
              </div>
              <div className={styles.productCategory}>
                {getCategoryName(product.categoryId)}
              </div>
              <div className={styles.productWeight}>
                {product.weight}г
              </div>
            </div>
            <button
              className={styles.addButton}
              onClick={e => { e.stopPropagation(); }}
            >
              Добавить
            </button>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          onClick={() => setSelectedProduct(null)}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "24px",
              padding: "32px",
              minWidth: "600px",
              maxWidth: "90vw",
              display: "flex",
              flexDirection: "column",
              position: "relative"
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "none",
                border: "none",
                fontSize: "28px",
                cursor: "pointer",
                color: "#888"
              }}
              aria-label="Close"
            >
              ×
            </button>
            <div style={{ fontSize: "32px", fontWeight: 700, marginBottom: "16px" }}>
              {selectedProduct.name}
            </div>
            <div style={{ display: "flex", gap: "24px" }}>
              <img
                src={selectedProduct.imageUrl}
                alt={selectedProduct.name}
                style={{
                  width: "220px",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "16px"
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "18px", marginBottom: "8px" }}>
                  {selectedProduct.description}
                </div>
                <div style={{ fontSize: "16px", fontWeight: 500, marginBottom: "4px" }}>
                  Состав:
                </div>
                <ul style={{ margin: 0, paddingLeft: "18px", marginBottom: "8px" }}>
                  {selectedProduct.compound.split(",").map((item, idx) => (
                    <li key={idx} style={{ fontSize: "15px" }}>{item.trim()}</li>
                  ))}
                </ul>
                <div style={{ color: "#B1B1B1", fontSize: "14px" }}>
                  {selectedProduct.weight}г
                </div>
              </div>
            </div>
            <div style={{
              display: "flex",
              alignItems: "center",
              marginTop: "24px",
              gap: "16px"
            }}>
              <button
                style={{
                  background: "#FF7020",
                  color: "#fff",
                  border: "none",
                  borderRadius: "12px",
                  padding: "14px 40px",
                  fontSize: "20px",
                  fontWeight: 500,
                  cursor: "pointer"
                }}
              >
                Добавить
              </button>
              <div style={{
                display: "flex",
                alignItems: "center",
                background: "#F2F2F3",
                borderRadius: "12px",
                padding: "8px 16px",
                fontSize: "20px",
                fontWeight: 500,
                gap: "16px"
              }}>
                <button style={{
                  background: "none",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer"
                }}>-</button>
                <span>1</span>
                <button style={{
                  background: "none",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer"
                }}>+</button>
              </div>
              <div style={{
                marginLeft: "auto",
                fontSize: "28px",
                fontWeight: 700
              }}>
                {selectedProduct.price}₽
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Product;