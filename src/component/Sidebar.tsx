import { FormEvent, useState } from "react";
import { User } from "../App";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  color: "white",
  backgroundColor: "#dd9fd8", 
  borderRadius: "8px", 
  border: "none", 
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)", 
  padding: "24px", 
};

interface Props {
  users: User[],
  addUser: (user: User) => void
  setSelectedUser: (user: User) => void
  selectedUser: User | null
}

function Sidebar(props: Props) {
    const [open, setOpen] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function saveUser(e: FormEvent) {
        e.preventDefault();
        if( !name || !phone ) return;
        const newUser: User = {
            id: props.users.length + 1,
            userName: name,
            phone: phone,
        }
        props.addUser(newUser);
        Reset();
    }

    function Reset(){
        handleClose();
        setName("");
        setPhone("");
    }
    
    return (
        <div className="sidebar">
        <button onClick={handleOpen} className="btn">
            Add User
        </button>
        {props.users.map((user) => (
            <div onClick={() => props.setSelectedUser(user)} className={user.id === props.selectedUser?.id ? "user active" : "user"} key={user.id}>
            {user.userName}
            </div>
        ))}

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <h1 style={{ marginBottom: "16px", textAlign: "center" }}>Add User</h1>
                <form onSubmit={saveUser}>
                    <label htmlFor="name" style={{ display: "block", marginBottom: "8px" }}>
                    Name
                    </label>
                    <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    id="name"
                    className="inp"
                    />
                    <label htmlFor="phone" style={{ display: "block", marginBottom: "8px" }}>
                    Phone
                    </label>
                    <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="text"
                    id="phone"
                    className="inp"
                    />
                    <button
                    className="btn"
                    >
                    Save
                    </button>
                </form>
            </Box>
        </Modal>
        </div>
    );
}

export default Sidebar;