import { useState } from 'react';
import { FaPlus, FaEdit, FaTrashAlt, FaImage } from 'react-icons/fa';
import usePartners from '../../../hooks/usePartners';
import DeletePartnersModal from './DeletePartnersModal';
import { PartnerType } from '../../types/Types';
import AddPartnersModal from './AddPartnersModal';

function AdminPartners() {
  const { partners, deletePartner, updatePartner, addPartner} = usePartners();
  const [deletePartnersId, setDeletePartnersId] = useState<string | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editPartners, setEditPartners] = useState<PartnerType | null>(null);

  return (
    <div className="admin-carousel-container">
        <div className="admin-bouquets-header">
            <h1 className="admin-bouquets-title">Partners</h1>
            <button 
                onClick={() => {setOpenAddModal(true); setEditPartners(null)}}
                className="add-bouquet-btn"
            >
            <FaPlus className="admin-btn-icon" />
                Add New Partner
            </button>
        </div>

      <div className="carousel-grid">
        {partners.map((image) => (
          <div className="carousel-card" key={image.id}>
            <div className="image-container">
              {image.imageLogo ? (
                <img src={image.imageLogo} alt={image.id} className="carousel-image" />
              ) : (
                <div className="image-placeholder">
                  <FaImage className="placeholder-icon" />
                </div>
              )}
              
              <div className="action-buttons">
                <button 
                  onClick={() => {
                    setEditPartners(image);
                    setOpenAddModal(true);
                  }}
                  className="edit-btn">
                  <FaEdit />
                </button>
                <button 
                  onClick={() => {
                    setDeletePartnersId(String(image.id));
                    setOpenDeleteModal(true);
                  }} 
                  className="delete-btn">
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <DeletePartnersModal
        deleteOpenModal={openDeleteModal}
        setDeleteOpenModal={setOpenDeleteModal}
        deletePartnersId={deletePartnersId}
        deletePartner={deletePartner}
        setDeletePartnersId={setDeletePartnersId}
      />

      <AddPartnersModal
        open={openAddModal}
        onClose={() => {
          setOpenAddModal(false);
          setEditPartners(null);
        }}
        editPartner={editPartners}
        addPartner={addPartner}
        updatePartner={updatePartner}
        />

    </div>
  );
}

export default AdminPartners;