import { FormEvent, useState } from "react";
import { User } from "../App";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { IoPersonAddOutline } from "react-icons/io5";
import { BsFillPersonXFill } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";


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
    addUser: (user: User) => void,
    updateUser: (user: User) => void,
    setSelectedUser: (user: User) => void,
    selectedUser: User | null,
    deleteUser: (user: User) => void
}

function Sidebar(props: Props) {
    const [open, setOpen] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [userToEdit, setUserToEdit] = useState<User | null>(null);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setIsEditing(false);
        setUserToEdit(null);
    };

    function saveUser(e: FormEvent) {
        e.preventDefault();
        if (!name || !phone) return;
    
        if (isEditing && userToEdit) {
            const updatedUser = { 
                ...userToEdit, 
                userName: name, 
                phone: phone 
            };
            props.updateUser(updatedUser);
        } else {
            const newUser = {
                id: props.users.length + 1,
                userName: name,
                phone: phone,
            };
            props.addUser(newUser);
        }
        Reset();
    }

    function openEditModal(user: User) {
        setUserToEdit(user); 
        setName(user.userName); 
        setPhone(user.phone); 
        setIsEditing(true); 
        handleOpen();
    }

    function Reset(){
        handleClose();
        setName("");
        setPhone("");
    }
    return (
        <div className="sidebar">
        <button onClick={handleOpen} className="btn1">
            <IoPersonAddOutline className="addIcon" />
            Add User
        </button>
        {props.users.map((user) => (
            <div onClick={() => props.setSelectedUser(user)} className={user.id === props.selectedUser?.id ? "user active" : "user"} key={user.id}>
                {user.userName}
                <div className="icons2">
                    <BsFillPersonXFill 
                        className="deleteIcon"
                        onClick={() => setDeleteModalOpen(true)}
                    />
                    <FaUserEdit 
                        className="editIcon"
                        onClick={() => openEditModal(user)}
                    />
                </div>
            </div>
        ))}
    

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <h1 style={{ marginBottom: "16px", textAlign: "center" }}>
                    {isEditing ? "Edit User" : "Add User"}
                </h1>
                      
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
                    className="btn1"
                    >
                        {isEditing ? "Edit User" : "Add User"}
                    </button>
                </form>
            </Box>
        </Modal>


        <Modal
                open={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                aria-labelledby="delete-modal-title"
                aria-describedby="delete-modal-description"
            >
                <Box sx={style}>
                    <h2 id="delete-modal-title" style={{ textAlign: "center" }}>
                        are you sure you want to delete this user?
                    </h2>
                    <div className="deleteUserBtns">
                        <button
                            className="deleteUserYesbtn"
                            onClick={() => {
                                props.deleteUser(props.selectedUser!);
                                setDeleteModalOpen(false);
                            }}
                        > Yes
                        </button>
                        <button
                            className="deleteUserNobtn"
                            onClick={() => setDeleteModalOpen(false)}
                        >
                            No
                        </button>
                    </div>
                </Box>
        </Modal>
        </div>
    );
}

export default Sidebar;