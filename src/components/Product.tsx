import { useState } from "react";
import { CategoryType, ProductType } from "../page/types/Types";
import ViewModalProduct from "../page/admin/ViewModalProduct";

interface ProductProps {
  products: ProductType[];
  categories: CategoryType[];
  onAddToCart: (product: ProductType, count: number) => void;
}

function Product({ products, categories, onAddToCart}: ProductProps) {
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const [count, setCount] = useState<number>(1);
  

  const getCategoryName = (categoryId: string | number) => {
    const cat = categories.find(c => c.id === categoryId || c.id === String(categoryId));
    return cat ? cat.name : "";
  };

  const handleOpenModal = (product: ProductType) => {
    setSelectedProduct(product);
    setCount(1);
  };

  const handleAdd = () => {
    if (selectedProduct) {
      onAddToCart(selectedProduct, count);
      setSelectedProduct(null);
    }
  };

  const handleClose = () => {
    setSelectedProduct(null);
    setCount(1);
  };

  // const changePage = (event: ChangeEvent<unknown>, value: number) => {
  //   console.log(event);
  //   setPage(value);
  // };

  return (
    <>
      <div className="productList">
        {products.map((product) => (
          <div
            key={product.id}
            className="productCard"
            onClick={() => handleOpenModal(product)}
            style={{ cursor: "pointer" }}
          >
            <img
                src={product.imageUrl}
                alt={product.name}
                className="productImg"
              />

            <div style={{ width: "100%" }}>
              <div className="productPrice">
                {product.price}₽
              </div>
              <div className="productName">
                {product.name}
              </div>
              <div className="productCategory">
                {getCategoryName(product.categoryId)}
              </div>
              <div className="productWeight">
                {product.weight}г
              </div>
            </div>
            <button
              className="addButton"
              onClick={e => { e.stopPropagation(); handleOpenModal(product); }}
            >
              Добавить
            </button>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <ViewModalProduct selectedProduct={selectedProduct} handleViewClose={handleClose} count={count} setCount={setCount} handleAdd={handleAdd} />
      )}
      
      {/* <Pagination
        count={pageSize}
        onChange={changePage}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 4,
          mb: 2,
          '& .MuiPaginationItem-root': {
            borderRadius: '12px',
            fontSize: '1rem',
            fontWeight: 500,
            color: '#FF7020',
            '&.Mui-selected': {
              backgroundColor: '#FF7020',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#e65c00'
              }
            },
            '&:hover': {
              backgroundColor: 'rgba(255, 112, 32, 0.1)'
            }
          }
        }}
        variant="outlined"
        shape="rounded"
      /> */}
    </>
  );
}

export default Product;