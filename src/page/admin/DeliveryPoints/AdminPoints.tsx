import { FaEdit, FaMapMarkerAlt, FaPhone, FaPlus, FaTrash } from "react-icons/fa"
import usePoints from "../../../hooks/usePoints"
import { PointType } from "../../types/Types";
import { useState } from "react";
import DeletePointsModal from "./DeletePointsModal";
import AddPointsModal from "./AddPointsModal";

function AdminPoints() {
    const {points, deletePoint, addPoint, updatePoint} = usePoints()
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [deletePointId, setDeletePointId] = useState<string | null>(null);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [editPoint, setEditPoint] = useState<PointType | null>(null);

  return (
    <div className="admin-points-container">
        <div className="admin-bouquets-header">
            <h1 className="admin-bouquets-title">Delivery Points</h1>
                <button 
                    className="add-bouquet-btn"
                    onClick={() => {setOpenAddModal(true); setEditPoint(null)}}
                >
                    <FaPlus className="admin-btn-icon" />
                    Add Delivery Point
                </button>
        </div>
                    
        <div className="admin-divider"></div>

        <div className="admin-delivery-list">
                {points.map(item => (
                    <div className="admin-delivery-card" key={item.id}>
                        <div className="admin-card-icon">
                            <FaMapMarkerAlt className="marker-icon" />
                        </div>
                        <div className="admin-card-content-points">
                            <h3 className="admin-delivery-title">{item.address}</h3>
                            <div className="admin-delivery-info">
                                <FaPhone className="info-icon-points" />
                                <span className="info-text">{item.phone}</span>
                            </div>
                            <div className="admin-card-footer">
                                <button 
                                    onClick={() => {setOpenAddModal(true); setEditPoint(item)}}
                                    className="admin-action-btn admin-edit-btn"
                                >
                                    <FaEdit size={24} />
                                </button>
                                <button 
                                    onClick={() => {setOpenDeleteModal(true); setDeletePointId(item.id)}}
                                    className="admin-action-btn admin-delete-btn"
                                >
                                    <FaTrash size={24} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <AddPointsModal
                open={openAddModal}
                onClose={() => {setOpenAddModal(false); setEditPoint(null)}}
                editPoint={editPoint}
                addPoint={addPoint}
                updatePoint={updatePoint}
            />
            <DeletePointsModal
                deleteOpenModal={openDeleteModal}
                setDeleteOpenModal={setOpenDeleteModal}
                deletePointId={deletePointId}
                setDeletePointId={setDeletePointId}
                deletePoint={deletePoint}
            />
    </div>
  )
}

export default AdminPoints