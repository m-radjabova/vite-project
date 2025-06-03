import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import useCategories from "../../hooks/useCategories";

function AdminCategories() {
  const categories = useCategories();
  return (
    <div className="container">
      <div className="category-header">
        <h2 className="category-title">Categories</h2>
        <button className="add-button">
          <FiPlus /> Add Category
        </button>
      </div>

      <ul className="category-admin-list">
        {categories.map((category) => (
          <li className="category-admin-item" key={category.id}>
            <span className="category-admin-name">{category.name}</span>
            <div className="category-actions">
              <button 
                className="action-button edit-button"
                onClick={() => {}}
              >
                <FiEdit2 />
              </button>
              <button 
                className="action-button delete-button"
                onClick={() => {}}
              >
                <FiTrash2 />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AdminCategories