import { useState } from "react";
import { CategoryType, ProductType } from "../types/Types";
import ViewModalProduct from "./ViewModalProduct";
import { FiDelete, FiEdit2, FiTrash2 } from "react-icons/fi";
import {Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Button,Box,Typography,IconButton
} from "@mui/material";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface Props{
    products: ProductType[];
    categories: CategoryType[];
    deleteProduct: (id: string) => void;
}

function AdminProductDisplay({products, categories, deleteProduct}: Props ) {
    const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
    const [count, setCount] = useState<number>(1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState<string | null>(null);
    const navigate = useNavigate();

    const getCategoryName = (categoryId: string | number) => {
        const cat = categories.find(c => c.id === categoryId || c.id === String(categoryId));
        return cat ? cat.name : "";
    };

    const handleViewOpenModal = (product: ProductType) => {
        setSelectedProduct(product);
        setCount(1);
    };

    const handleViewClose = () => {
        setSelectedProduct(null);
        setCount(1);
    };

    const handleDeleteClick = (productId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setProductToDelete(productId);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (productToDelete) {
            deleteProduct(productToDelete);
        }
        setShowDeleteModal(false);
        setProductToDelete(null);
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setProductToDelete(null);
    };

  return (
    <>
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
                        navigate(`/admin/product/add/${product.id}`);
                    }}
                >
                    <FiEdit2 /> Edit
                </button>
                <button 
                    className="deleteButton"
                    onClick={(e) => {
                        e.stopPropagation(); 
                        handleDeleteClick(String(product.id), e);
                    }}
                >
                    <FiTrash2 /> Delete
                </button>

                </div>
            </div>
            ))}
        </div>
        {selectedProduct && (
                <ViewModalProduct 
                    selectedProduct={selectedProduct} 
                    handleViewClose={handleViewClose} 
                    count={count} 
                    setCount={setCount} 
                    handleAdd={handleViewClose} 
                />
        )}
        <Dialog
            open={showDeleteModal}
            onClose={cancelDelete}
            aria-labelledby="delete-dialog-title"
            sx={{
                '& .MuiPaper-root': {
                borderRadius: '16px',
                padding: '8px',
                maxWidth: '480px',
                width: '100%',
                boxShadow: '0 10px 30px rgba(255, 140, 0, 0.2)',
                border: '1px solid rgba(255, 140, 0, 0.1)'
                }
            }}
            >
            <Box display="flex" justifyContent="space-between" alignItems="center" px={3} pt={3}>
                <DialogTitle id="delete-dialog-title" sx={{ p: 0 }}>
                <Typography variant="h6" fontWeight="600" color="text.primary">
                    Confirm Deletion
                </Typography>
                </DialogTitle>
                <IconButton 
                onClick={cancelDelete} 
                sx={{ 
                    color: 'text.secondary',
                    '&:hover': {
                    backgroundColor: 'rgba(255, 140, 0, 0.08)'
                    }
                }}
                >
                <MdClose size={24} />
                </IconButton>
            </Box>
            
            <DialogContent sx={{ px: 3, py: 2 }}>
                <Box display="flex" flexDirection="column" alignItems="center" textAlign="center" py={2}>
                <Box
                    bgcolor="rgba(255, 140, 0, 0.1)"
                    color="warning.main"
                    p={2}
                    mb={3}
                    borderRadius="50%"
                    sx={{
                    width: '72px',
                    height: '72px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                    }}
                >
                    <FiDelete size={28} />
                </Box>
                <DialogContentText variant="body1" color="text.primary" fontWeight="500" mb={1} fontSize="1.1rem">
                    Delete this product permanently?
                </DialogContentText>
                <DialogContentText variant="body2" color="text.secondary" fontSize="0.95rem">
                    This will remove all product data from our systems. You won't be able to undo this action.
                </DialogContentText>
                </Box>
            </DialogContent>
            
            <DialogActions sx={{ px: 3, pb: 3, pt: 0, gap: '12px' }}>
                <Button
                onClick={cancelDelete}
                variant="outlined"
                fullWidth
                sx={{
                    color: 'text.primary',
                    borderColor: 'rgba(255, 140, 0, 0.3)',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    textTransform: 'none',
                    fontSize: '0.95rem',
                    '&:hover': {
                    borderColor: 'rgba(255, 140, 0, 0.5)',
                    backgroundColor: 'rgba(255, 140, 0, 0.04)'
                    }
                }}
                >
                Cancel
                </Button>
                <Button
                onClick={confirmDelete}
                variant="contained"
                fullWidth
                sx={{
                    backgroundColor: 'rgba(255, 140, 0, 0.9)',
                    color: '#fff',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    textTransform: 'none',
                    fontSize: '0.95rem',
                    boxShadow: 'none',
                    '&:hover': {
                    backgroundColor: 'rgba(255, 140, 0, 1)',
                    boxShadow: '0 2px 8px rgba(255, 140, 0, 0.3)'
                    }
                }}
                >
                Delete Product
                </Button>
            </DialogActions>
        </Dialog>
    </>
  )
}

export default AdminProductDisplay