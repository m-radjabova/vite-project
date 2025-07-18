import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import useCategories from "../../../hooks/useCategories";
import { useState } from 'react';
import DeleteCategoryModal from './DeleteCategoryModal';
import AddCategoryModal from './AddCategoryModal';
import { CategoryType } from '../../types/Types';

function AdminCategories() {
  const { category, addCategory, updateCategory, deleteCategory} = useCategories();
  const [deleteCatId, setDeleteCatId] = useState<string | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editCategory, setEditCategory] = useState<CategoryType | null>(null);

  return (
    <div className="admin-categories-container">
      <div className="admin-bouquets-header">
          <h1 className="admin-bouquets-title">Categories</h1>
              <button className="add-bouquet-btn" onClick={() => setOpenAddModal(true)}>
                  <FaPlus className="admin-btn-icon" />
                    Add New Category
              </button>
        </div>
        <div className="admin-divider"></div>
      <div className="categories-grid">
        {category.map((category) => (
          <div className="category-card" key={category.id}>
            <div className="category-details">
              <h3 className="category-name">{category.title}</h3>
            </div>
            <div className="admin-category-actions">
                <button className="admin-action-btn admin-edit-btn"
                  onClick={() => {setOpenAddModal(true); setEditCategory(category)}}
                >
                  <FaEdit size={24} />
                </button>
                <button className="admin-action-btn admin-delete-btn"
                  onClick={() => {setOpenDeleteModal(true); setDeleteCatId(category.id)}}
                >
                  <FaTrash size={24} />
                </button>
            </div>
          </div>
        ))}
      </div>

      <DeleteCategoryModal 
        deleteOpenModal={openDeleteModal} 
        setDeleteOpenModal={setOpenDeleteModal} 
        deleteCatId={deleteCatId}
        setDeleteCatId={setDeleteCatId}
        deleteCategory={deleteCategory}
      />

      <AddCategoryModal 
        open={openAddModal}
        onClose={() => {setOpenAddModal(false); setEditCategory(null)} }
        editCategory={editCategory}
        addCategory={addCategory}
        updateCategory={updateCategory}
       />
    </div>
  );
}

export default AdminCategories;