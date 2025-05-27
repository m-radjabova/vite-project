import { useState } from "react";
import { CategoryType, ProductType } from "../page/home/Home";
import styles from "../css/Product.module.css";
import {Modal,Box,Button,IconButton,Typography,List,ListItem,ListItemText} from "@mui/material";
import { MdClose } from "react-icons/md";

interface ProductProps {
  products: ProductType[];
  categories: CategoryType[];
  onAddToCart: (product: ProductType, count: number) => void;
}

function Product({ products, categories, onAddToCart }: ProductProps) {
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);;
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

  return (
    <>
      <div className={styles.productList}>
        {products.map((product) => (
          <div
            key={product.id}
            className={styles.productCard}
            onClick={() => handleOpenModal(product)}
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
              onClick={e => { e.stopPropagation(); handleOpenModal(product); }}
            >
              Добавить
            </button>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <Modal
        open={Boolean(selectedProduct)}
        onClose={handleClose}
        aria-labelledby="product-modal-title"
        aria-describedby="product-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: "24px",
            boxShadow: 24,
            p: 4,
            minWidth: 600,
            maxWidth: "90vw",
            outline: "none"
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 16,
              top: 16,
              color: "text.secondary"
            }}
          >
            <MdClose fontSize="large" />
          </IconButton>

          <Typography id="product-modal-title" variant="h4" fontWeight={700} mb={2}>
            {selectedProduct?.name}
          </Typography>

          <Box display="flex" gap={3}>
            <img
              src={selectedProduct?.imageUrl}
              alt={selectedProduct?.name}
              style={{
                width: "220px",
                height: "180px",
                objectFit: "cover",
                borderRadius: "16px"
              }}
            />
            <Box flex={1}>
              <Typography variant="body1" mb={1}>
                {selectedProduct?.description}
              </Typography>
              <Typography variant="subtitle1" fontWeight={500} mb={0.5}>
                Состав:
              </Typography>
              <List dense sx={{ py: 0, mb: 1 }}>
                {selectedProduct?.compound.split(",").map((item, idx) => (
                  <ListItem key={idx} sx={{ py: 0, px: 2 }}>
                    <ListItemText primary={item.trim()} />
                  </ListItem>
                ))}
              </List>
              <Typography color="text.secondary" variant="body2">
                {selectedProduct?.weight}г
              </Typography>
            </Box>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            mt={3}
            gap={2}
          >
            <Button
              variant="contained"
              color="warning"
              sx={{
                borderRadius: "12px",
                py: 1.75,
                px: 5,
                fontSize: "1.25rem",
                fontWeight: 500
              }}
              onClick={handleAdd}
            >
              Добавить
            </Button>

            <Box
              display="flex"
              alignItems="center"
              bgcolor="grey.100"
              borderRadius="12px"
              px={2}
              py={1}
              gap={2}
            >
              <IconButton
                onClick={() => setCount(prev => Math.max(1, prev - 1))}
                size="large"
              >
                -
              </IconButton>
              <Typography variant="h6" fontWeight={500}>
                {count}
              </Typography>
              <IconButton
                onClick={() => setCount(prev => prev + 1)}
                size="large"
              >
                +
              </IconButton>
            </Box>

            <Box ml="auto">
              <Typography variant="h4" fontWeight={700}>
                {selectedProduct ? selectedProduct.price * count : 0}₽
              </Typography>
            </Box>
          </Box>
        </Box>
      </Modal>
      )}
    </>
  );
}

export default Product;