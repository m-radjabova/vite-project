import { FaPlus, FaEdit, FaTrashAlt, FaImage } from 'react-icons/fa';
import useImageCarousel from "../../hooks/useImageCarousel";
import { useState } from 'react';
import DeleteModalImage from './DeleteModalImage';
import { CarouselImg } from '../types/Types';
import AddImageModal from './AddImageModal';

function AdminCarousel() {
  const { carouselImg, deleteImage } = useImageCarousel();
  const [deleteImageId, setDeleteImageId] = useState<string | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editImage, setEditImage] = useState<CarouselImg | null>(null);

  return (
    <div className="admin-carousel-container">
      <div className="carousel-header">
        <h2 className="carousel-title">Image Carousel</h2>
        <button  onClick={() => setOpenAddModal(true)} className="add-image-btn">
          <FaPlus className="btn-icon" />
          Add New Image
        </button>
      </div>

      <div className="carousel-grid">
        {carouselImg.map((image) => (
          <div className="carousel-card" key={image.id}>
            <div className="image-container">
              {image.image ? (
                <img src={image.image} alt={image.title} className="carousel-image" />
              ) : (
                <div className="image-placeholder">
                  <FaImage className="placeholder-icon" />
                </div>
              )}
              
              <div className="action-buttons">
                <button 
                  onClick={() => {
                    setEditImage(image);
                    setOpenAddModal(true);
                  }}
                  className="edit-btn">
                  <FaEdit />
                </button>
                <button 
                  onClick={() => {
                    setDeleteImageId(String(image.id));
                    setOpenDeleteModal(true);
                  }} 
                  className="delete-btn">
                  <FaTrashAlt />
                </button>
              </div>
            </div>
            
            <div className="image-details">
              <h3 className="image-title">{image.title || 'Untitled Image'}</h3>
            </div>
          </div>
        ))}
      </div>
      <DeleteModalImage 
        deleteOpenModal={openDeleteModal} 
        setDeleteOpenModal={setOpenDeleteModal} 
        deleteImageId={deleteImageId}
        deleteImage={deleteImage}
        setDeleteImageId={setDeleteImageId}
      />
      <AddImageModal
        open={openAddModal} 
        onClose={() => 
          {
            setEditImage(null);
            setOpenAddModal(false);
          }
        } 
        editImage={editImage}
      />
    </div>
  );
}

export default AdminCarousel;