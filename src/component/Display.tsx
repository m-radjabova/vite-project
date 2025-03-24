import Box from "./Box";
import { Box as MuiBox } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useState } from "react";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: '#fff',
  borderRadius: '12px',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
  padding: '24px',
};

interface DisplayProps {
  money: number;
  remaining: number;
  spent: number;
  editMoney: (amount: number) => void;
}

function Display({ money, remaining, spent, editMoney }: DisplayProps) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState<string>(""); 

  const handleOpen = () => {
    setAmount(String(money)); 
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleEditMoney = () => {
    editMoney(Number(amount)); 
    handleClose(); 
  };

  return (
    <div className="row mt-3">
      <Box color="info">
        <h3>Expence: <span> ${money}</span></h3>
        <button onClick={handleOpen} className="btn btn-primary">Edit</button>
      </Box>
      <Box color="success">
        <h3>Remaining: <span> ${remaining}</span></h3>
      </Box>
      <Box color="primary">
        <h3>Spent so far: <span> ${spent}</span></h3>
      </Box>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <MuiBox sx={style}>
          <h2 id="modal-modal-title" style={{ marginBottom: '16px', textAlign: 'center', color: '#333' }}>
            Edit Money
          </h2>
          <p id="modal-modal-description" style={{ marginBottom: '16px', textAlign: 'center', color: '#555' }}>
            <input
              type="number"
              placeholder="Enter amount..."
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                outline: 'none',
                fontSize: '16px',
              }}
            />
          </p>
          <button
            onClick={handleEditMoney} 
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              backgroundColor: '#007bff',
              color: '#fff',
              fontSize: '16px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
          >
            Save
          </button>
        </MuiBox>
      </Modal>
    </div>
  );
}

export default Display;