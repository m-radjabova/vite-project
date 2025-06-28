import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import useCategories from "../../../hooks/useCategories";
import { useState } from 'react';
import DeleteCategoryModal from './DeleteCategoryModal';
import AddCategoryModal from './AddCategoryModal';
import { CategoryType } from '../../types/Types';

function AdminCategories() {
  const { categories, deleteCategory, addCategory, updateCategory} = useCategories();
  const [deleteCatId, setDeleteCatId] = useState<string | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editCategory, setEditCategory] = useState<CategoryType | null>(null);

  return (
    <div className="admin-categories-container">
      <div className="categories-header">
        <h2 className="categories-title">Categories</h2>
        <button 
          onClick={() => setOpenAddModal(true)} 
          className="add-image-btn">
          <FaPlus className="btn-icon" />
          Add New Category
        </button>
      </div>
      <div className="categories-grid">
        {categories.map((category) => (
          <div className="category-card" key={category.id}>
            <div className="category-details">
              <h3 className="category-name">{category.categoryName}</h3>
            </div>
            <div className="category-actions">
              <button 
                onClick={() => {
                  setEditCategory(category);
                  setOpenAddModal(true);
                }}
                className="edit-btn">
                <FaEdit />
              </button>
              <button 
                onClick={() => {
                  setDeleteCatId(category.id);
                  setOpenDeleteModal(true);
                }}
                className="delete-btn">
                <FaTrash />
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