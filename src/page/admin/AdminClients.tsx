import { useEffect, useState } from "react";
import apiClient from "../../apiClient/ApiClient";
import { CarouselImg } from "../../components/ProductCarousel";
import {Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Button,Box,Typography,IconButton
} from "@mui/material";
import { MdClose } from "react-icons/md";
import { FiDelete } from "react-icons/fi";
import { toast } from "react-toastify";

function AdminClients() {
  const [carouselImg, setCarouselImg] = useState<CarouselImg[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<number | null>(null);

  useEffect(() => {
    getCarouselImg();
  }, []);
  
  const getCarouselImg = () => {
    apiClient.get<CarouselImg[]>("/productcarousel").then((res) => {
      setCarouselImg(res.data);
    });
  }

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      apiClient.post("/productcarousel", { imgUrl: newImageUrl })
        .then(() => {
          getCarouselImg();
          setNewImageUrl("");
          toast.success("Image added successfully");
        });
    }
  }

  const handleDeleteImage = (id: number) => {
    apiClient.delete(`/productcarousel/${id}`)
      .then(() => {
        getCarouselImg();
        toast.success("Image deleted successfully");
      });
  }

  const cancelDelete = () => {
      setShowDeleteModal(false);
      setImageToDelete(null);
  };

  const confirmDelete = () => {
      if (imageToDelete) {
          handleDeleteImage(imageToDelete);
      }
      setShowDeleteModal(false);
      setImageToDelete(null);
  };


  return (
    <>
      <div className="admin-clients ">
        <div className="add-section">
          <input
            type="text"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            placeholder="Enter image URL"
          />
          <button onClick={handleAddImage} className="add-button">
            Add Image
          </button>
        </div>
        
        <div className="image-list">
          {carouselImg.map((image) => (
            <div key={image.id} className="image-item">
              <img src={image.imgUrl} alt={image.imgUrl} />
              <button 
                onClick={
                  () => {
                    setShowDeleteModal(true);
                    setImageToDelete(image.id);
                  }
                } 
                className="delete-button"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
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
                Are you sure you want to delete this image?
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
            Delete Image
            </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}


export default AdminClients;