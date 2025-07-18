import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { FaTrash } from 'react-icons/fa';
import { HiXMark } from 'react-icons/hi2';

interface Props {
  deleteOpenModal: boolean;
  setDeleteOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  deleteCatId: string | null;
  setDeleteCatId: React.Dispatch<React.SetStateAction<string | null>>;
  deleteCategory: (id: string) => void;
}

const DeleteCategoryModal = ({ 
  deleteOpenModal, 
  setDeleteOpenModal, 
  deleteCatId, 
  setDeleteCatId, 
  deleteCategory 
}: Props) => {
  const handleClose = () => {
    setDeleteOpenModal(false);
    setDeleteCatId(null);
  };

  const handleDelete = () => {
    if (deleteCatId) {
      deleteCategory(deleteCatId);
      handleClose();
    }
  };

  return (
    <Dialog
      open={deleteOpenModal}
      onClose={handleClose}
      aria-labelledby="delete-dialog-title"
      className="delete-confirmation-modal"
      PaperProps={{
        className: "modal-paper"
      }}
    >
      <DialogTitle id="delete-dialog-title" className="modal-header">
        <div className="title-container">
          <div className="icon-circle danger-icon">
            <FaTrash className="title-icon" />
          </div>
          <h2 className="modal-title">Confirm Deletion</h2>
        </div>
      </DialogTitle>
      
      <DialogContent className="modal-content">
        <p className="warning-text">
          Are you sure you want to delete this category? This action cannot be undone.
        </p>
        
        <div className="warning-note">
          <strong>Note:</strong> All items in this category will be moved to uncategorized.
        </div>
      </DialogContent>
      
      <DialogActions className="modal-actions">
        <Button
          startIcon={<HiXMark className="action-icon" />}
          onClick={handleClose}
          className="cancel-btn"
          variant="outlined"
        >
          Cancel
        </Button>
        
        <Button
          startIcon={<FaTrash className="action-icon" />}
          onClick={handleDelete}
          autoFocus
          className="delete-btn-modal"
          variant="contained"
        >
          Delete Permanently
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteCategoryModal;