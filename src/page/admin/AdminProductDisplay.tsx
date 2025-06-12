import { useState } from "react";
import { CategoryType, ProductType } from "../types/Types";
import ViewModalProduct from "./ViewModalProduct";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import {Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Button,Box,Typography,IconButton
} from "@mui/material";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Player } from '@lottiefiles/react-lottie-player';

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
                    <FiEdit2 /> Изменить
                </button>
                <button 
                    className="deleteButton"
                    onClick={(e) => {
                        e.stopPropagation(); 
                        handleDeleteClick(String(product.id), e);
                    }}
                >
                    <FiTrash2 /> Удалить
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
                borderRadius: '20px',
                padding: '16px',
                maxWidth: '500px',
                width: '100%',
                boxShadow: '0 10px 50px rgba(0, 0, 0, 0.15)',
                border: 'none',
                background: 'linear-gradient(145deg, #ffffff, #f8f8f8)',
                overflow: 'hidden',
                position: 'relative',
                '&:before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, #FF6B6B, #FF8E53)'
                }
                },
                backdropFilter: 'blur(3px)'
            }}
            >
            <Box display="flex" justifyContent="space-between" alignItems="center" px={3} pt={2}>
                <DialogTitle id="delete-dialog-title" sx={{ p: 0 }}>
                <Typography variant="h6" fontWeight="700" color="text.primary" fontSize="1.3rem">
                    Подтверждение удаления
                </Typography>
                </DialogTitle>
                <IconButton 
                onClick={cancelDelete} 
                sx={{ 
                    color: 'text.secondary',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                    transform: 'rotate(90deg)',
                    backgroundColor: 'rgba(255, 107, 107, 0.1)'
                    }
                }}
                >
                <MdClose size={26} />
                </IconButton>
            </Box>
            
            <DialogContent sx={{ px: 3, py: 3 }}>
                <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
                {/* Lottie animatsiya qo'shildi */}
                <Player
                    autoplay
                    loop={false}
                    src="https://assets1.lottiefiles.com/packages/lf20_khtt8ejx.json"
                    style={{ 
                    height: '150px', 
                    width: '150px',
                    marginBottom: '16px'
                    }}
                />
                
                <DialogContentText 
                    variant="body1" 
                    color="text.primary" 
                    fontWeight="600" 
                    mb={1} 
                    fontSize="1.15rem"
                    sx={{ lineHeight: 1.5 }}
                >
                    Вы уверены, что хотите удалить эту продукт?
                </DialogContentText>
                </Box>
            </DialogContent>
            
            <DialogActions sx={{ px: 3, pb: 3, pt: 0, gap: '16px' }}>
                <Button
                onClick={cancelDelete}
                variant="outlined"
                fullWidth
                sx={{
                    color: 'text.primary',
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: '600',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                    borderColor: 'rgba(0, 0, 0, 0.2)',
                    backgroundColor: 'rgba(0, 0, 0, 0.02)',
                    transform: 'translateY(-2px)'
                    }
                }}
                >
                Отменить
                </Button>
                <Button
                onClick={confirmDelete}
                variant="contained"
                fullWidth
                sx={{
                    background: 'linear-gradient(90deg, #FF6B6B, #FF8E53)',
                    color: '#fff',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: '600',
                    boxShadow: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                    background: 'linear-gradient(90deg, #FF5757, #FF7B3D)',
                    boxShadow: '0 5px 15px rgba(255, 107, 107, 0.4)',
                    transform: 'translateY(-2px)'
                    },
                    '&:active': {
                    transform: 'translateY(0)'
                    }
                }}
                >
                Удалить
                </Button>
            </DialogActions>
        </Dialog>
    </>
  )
}

export default AdminProductDisplay