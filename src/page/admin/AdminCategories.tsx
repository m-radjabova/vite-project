import {FiPlus, FiTrash2 } from "react-icons/fi";
import useCategories from "../../hooks/useCategories";
import {Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Button,Box,Typography,IconButton, Modal, TextField
} from "@mui/material";
import { MdClose } from "react-icons/md";
import { FiDelete } from "react-icons/fi";
import { useState } from "react";
import apiClient from "../../apiClient/ApiClient";
import { toast } from "react-toastify";

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
          <h2 className="category-title">Categories</h2>
          <button onClick={() => handleOpen()} className="add-button">
            <FiPlus /> Add Category
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
                      Are you sure you want to delete this category?
                  </DialogContentText>
                  <DialogContentText variant="body2" color="text.secondary" fontSize="0.95rem">
                      This action cannot be undone
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
                  Delete Category
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
            Add Category
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
              label="Category Name"
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
              Add Category
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default AdminCategories