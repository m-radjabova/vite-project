import { FaPlus, FaEdit, FaTrash, FaFolder } from 'react-icons/fa';
import useCategories from "../../hooks/useCategories";

function AdminCategories() {
  const { categories } = useCategories();

  return (
    <div className="admin-categories-container">
      <div className="categories-header">
        <h2 className="categories-title">Categories</h2>
        <button className="add-image-btn">
          <FaPlus className="btn-icon" />
          Add New Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="categories-grid">
        {categories.map((category) => (
          <div className="category-card" key={category.id}>
            <div className="category-icon">
              <FaFolder />
            </div>
            
            <div className="category-details">
              <h3 className="category-name">{category.categoryName}</h3>
            </div>
            
            {/* Action Buttons */}
            <div className="category-actions">
              <button className="edit-btn">
                <FaEdit />
              </button>
              <button className="delete-btn">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminCategories;