import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FaTrash } from 'react-icons/fa';
import { HiXMark } from 'react-icons/hi2';

const PinkDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: theme.spacing(1.5),
    padding: theme.spacing(2),
    backgroundColor: '#fff9fa',
    boxShadow: '0px 4px 20px rgba(255, 182, 193, 0.3)',
  },
}));

const PinkButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  padding: theme.spacing(2),
  borderRadius: '8px',
  fontWeight: 500,
  textTransform: 'none',
  transition: 'all 0.3s ease',
}));


const DeleteButton = styled(PinkButton)({
  backgroundColor: '#ffb6c1',
  color: '#d32f2f',
  '&:hover': {
    backgroundColor: '#ff8fab',
  boxShadow: '0px 2px 10px rgba(255, 182, 193, 0.5)',
  },
});

const CancelButton = styled(PinkButton)({
  backgroundColor: '#f8e1e4',
  color: '#555',
  '&:hover': {
    backgroundColor: '#f5d0d5',
    boxShadow: '0px 2px 10px rgba(255, 182, 193, 0.3)',
  },
});

interface Props {
  deleteOpenModal: boolean;
  setDeleteOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  deleteCatId: string | null;
  setDeleteCatId: React.Dispatch<React.SetStateAction<string | null>>;
  deleteCategory: (id: string) => void;
}

const DeleteCategoryModal = ({ deleteOpenModal, setDeleteOpenModal, deleteCatId, setDeleteCatId, deleteCategory} : Props) => {
  return (
    <PinkDialog
      open={deleteOpenModal}
      onClose={() => {
        setDeleteOpenModal(false);
        setDeleteCatId(null);
      }}
      aria-labelledby="delete-dialog-title"
    >
      <DialogTitle 
        id="delete-dialog-title" 
        sx={{ 
          color: '#d32f2f', 
          display: 'flex', 
          alignItems: 'center',
          gap: '8px',
          padding: '16px 24px 8px'
        }}
      >
        <FaTrash fontSize="medium" />
        Confirm Deletion
      </DialogTitle>
      
      <DialogContent sx={{ padding: '16px 24px', color: '#555' }}>
        Are you sure you want to delete this category? This action cannot be undone.
      </DialogContent>
      
      <DialogActions sx={{ padding: '16px 24px' }}>
        <CancelButton
          startIcon={<HiXMark />}
          onClick={() => {
            setDeleteOpenModal(false);
            setDeleteCatId(null);
          }}
        >
          Cancel
        </CancelButton>
        
        <DeleteButton
          startIcon={<FaTrash />}
          onClick={() => {
            if (deleteCatId) {
              deleteCategory(deleteCatId);
              setDeleteOpenModal(false);
              setDeleteCatId(null);
            }
          }}
          autoFocus
        >
          Delete
        </DeleteButton>
      </DialogActions>
    </PinkDialog>
  );
};

export default DeleteCategoryModal;