import { FaPlus, FaEdit, FaTrashAlt, FaImage } from 'react-icons/fa';
import { useState } from 'react';
import useCarouselImg from '../../../hooks/useCarouselImg';
import { ImageType } from '../../types/Types';
import AddImageModal from './AddImageModal';
import DeleteModalImage from './DeleteImageModal';

function AdminCarousel() {
  const { image, deleteImage, updateImage, addImage } = useCarouselImg();
  const [deleteImageId, setDeleteImageId] = useState<string | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editImage, setEditImage] = useState<ImageType | null>(null);

  return (
    <div className="admin-carousel-container">
      <div className="admin-bouquets-header">
        <h1 className="admin-bouquets-title">Carousel Image</h1>
                <button 
                    className="add-bouquet-btn"
                    onClick={() => {setOpenAddModal(true); setEditImage(null)}}
                >
                    <FaPlus className="admin-btn-icon" />
                    Add New Image
                </button>
        </div>

      <div className="admin-divider"></div>

      <div className="carousel-grid">
        {image.map((photo) => (
          <div className="carousel-card" key={photo.id}>
            <div className="image-container">
              {photo.image ? (
                <img src={photo.image} alt={photo.id} className="carousel-image" />
              ) : (
                <div className="image-placeholder">
                  <FaImage className="placeholder-icon" />
                </div>
              )}
              
              <div className="action-buttons">
                <button 
                  onClick={() => {
                    setEditImage(photo);
                    setOpenAddModal(true);
                  }}
                  className="edit-btn" style={{color : 'black', backgroundColor : 'white'}}>
                  <FaEdit />
                </button>
                <button 
                  onClick={() => {
                    setDeleteImageId(String(photo.id));
                    setOpenDeleteModal(true);
                  }} 
                  className="delete-btn" style={{color : 'red', backgroundColor : 'white'}}>
                  <FaTrashAlt />
                </button>
              </div>
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
        addImage={addImage}
        updateImage={updateImage}
      />
    </div>
  );
}

export default AdminCarousel;