import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { FaTrash } from 'react-icons/fa';
import { HiXMark } from 'react-icons/hi2';

interface Props {
  deleteOpenModal: boolean;
  setDeleteOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  deleteBouquetId: string | null;
  setDeleteBouquetId: React.Dispatch<React.SetStateAction<string | null>>;
  deleteBouquet: (id: string) => void;
}

const DeleteBouquetModal = ({deleteOpenModal, setDeleteOpenModal, deleteBouquetId, setDeleteBouquetId, deleteBouquet}: Props) => {
  const handleClose = () => {
    setDeleteOpenModal(false);
    setDeleteBouquetId(null);
  };

  const handleDelete = () => {
    if (deleteBouquetId) {
      deleteBouquet(deleteBouquetId);
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
          Are you sure you want to delete this bouquet? This action cannot be undone.
        </p>
        
        <div className="warning-note">
          <strong className='me-2'>Note:</strong> All items in this bouquet will be moved to uncategorized.
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

export default DeleteBouquetModal;