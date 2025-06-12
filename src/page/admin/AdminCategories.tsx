import {FiPlus, FiTrash2 } from "react-icons/fi";
import useCategories from "../../hooks/useCategories";
import {Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Button,Box,Typography,IconButton, Modal, TextField
} from "@mui/material";
import { MdClose } from "react-icons/md";
import { useState } from "react";
import apiClient from "../../apiClient/ApiClient";
import { toast } from "react-toastify";
import { Player } from '@lottiefiles/react-lottie-player';


function AdminCategories() {
  const {categories, deleteCategory, refetch} = useCategories();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [categoryName, setCategoryName] = useState('');

  const cancelDelete = () => {
      setShowDeleteModal(false);
      setCategoryToDelete(null);
  };

  const confirmDelete = () => {
      if (categoryToDelete) {
          deleteCategory(categoryToDelete);
      }
      setShowDeleteModal(false);
      setCategoryToDelete(null);
  };

  const handleAddCategory = () => {
    if (categoryName.trim()) {
      apiClient.post("/categories", { name: categoryName })
        .then(() => {
          refetch();
          setCategoryName('');
          toast.success("Category added successfully");
          handleClose();
        });
    }
  }

  return (
    <>
      <div className="container">
        <div className="category-header">
          <h2 className="category-title">Категории</h2>
          <button onClick={() => handleOpen()} className="add-button">
            <FiPlus /> Добавить категорию
          </button>
        </div>

        <ul className="category-admin-list">
          {categories.map((category) => (
            <li className="category-admin-item" key={category.id}>
              <span className="category-admin-name">{category.name}</span>
              <div className="category-actions">
                <button 
                  className="action-button delete-button"
                  onClick={() => {setShowDeleteModal(true); setCategoryToDelete(String(category.id))}}
                >
                  <FiTrash2 /> 
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
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
                Вы уверены, что хотите удалить эту категорию?
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


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            backgroundColor: '#fff8f0', 
            border: '2px solid #ffd8b2',
            borderRadius: '8px',
            boxShadow: 24,
            p: 4,
            width: 400,
            maxWidth: '90vw',
          }}
        >
          <Typography 
            id="modal-modal-title" 
            variant="h5" 
            component="h2"
            sx={{
              color: '#e67a00',
              fontWeight: 'bold',
              mb: 3,
              textAlign: 'center'
            }}
          >
            Добавить категорию
          </Typography>
          
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}
          >
            <TextField
              id="category"
              label="Название категории"
              variant="outlined"
              fullWidth
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ffd8b2',
                  },
                  '&:hover fieldset': {
                    borderColor: '#ffb347',
                  },
                }
              }}
            />
            
            <Button
              variant="contained"
              onClick={handleAddCategory}
              sx={{
                backgroundColor: '#ffb347',
                color: 'white',
                fontWeight: 'bold',
                py: 1.5,
                '&:hover': {
                  backgroundColor: '#ff9500',
                }
              }}
            >
              Добавить
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default AdminCategories