import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { FaTrash } from 'react-icons/fa';
import { HiXMark } from 'react-icons/hi2';

interface Props {
  cancelOpenModal: boolean;
  setCancelOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  cancelOrderId: string | null;
  setCancelOrderId: React.Dispatch<React.SetStateAction<string | null>>;
  handleCancel: (id: string) => void;
}

const DeleteOrderModal = ({ cancelOpenModal, setCancelOpenModal, cancelOrderId, setCancelOrderId, handleCancel}: Props) => {
  const handleClose = () => {
    setCancelOpenModal(false);
    setCancelOrderId(null);
  };

  const handleDelete = () => {
    if (cancelOrderId) {
      handleCancel(cancelOrderId);
      handleClose();
    }
  };

  return (
    <Dialog
        open={cancelOpenModal}
        onClose={handleClose}
        aria-labelledby="cancel-dialog-title"
        className="cancel-confirmation-modal"
        PaperProps={{
            className: "modal-paper"
        }}
        >
        <DialogTitle id="cancel-dialog-title" className="modal-header">
            <div className="title-container">
            <div className="icon-circle warning-icon">
                <FaTrash className="title-icon" style={{ color: "#eab308" }} />
            </div>
            <h2 className="modal-title">Подтверждение отмены заказа</h2>
            </div>
        </DialogTitle>
        
        <DialogContent className="modal-content">
            <p className="warning-text" style={{ color: "#eab308" }}>
            Вы собираетесь отменить заказ №{cancelOrderId}. Это действие навсегда удалит данный заказ из системы.
            </p>
            
            <div className="warning-note" style={{ color: "#eab308" }}>
            <strong>Важно:</strong> 
            <ul className="note-list">
                <li>Это действие нельзя отменить</li>
                <li>Все связанные товары будут перемещены в некатегоризированные</li>
                <li>Клиент будет уведомлен об отмене</li>
            </ul>
            </div>
        </DialogContent>
        
        <DialogActions className="modal-actions">
            <Button
            startIcon={<HiXMark className="action-icon" />}
            onClick={handleClose}
            className="cancel-btn"
            variant="outlined"
            >
            Оставить заказ
            </Button>
            
            <Button
            startIcon={<FaTrash className="action-icon" style={{ color: "#eab308" }} />}
            onClick={handleDelete}
            autoFocus
            className="confirm-btn"
            color="warning"
            variant="contained"
            >
            Подтвердить отмену
            </Button>
        </DialogActions>
    </Dialog>
  );
};

export default DeleteOrderModal;