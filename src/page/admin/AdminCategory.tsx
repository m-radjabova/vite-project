import { CategoryType } from "../types/Types";


interface Props {
    categories: CategoryType[]
    activeCategoryId: string | null;
    setActiveCategoryId: (id: string) => void;
}

function AdminCategory({ categories, activeCategoryId, setActiveCategoryId }: Props) {
  return (
    <div className="admin-category-container">
        <div className="container">
            <ul className="admin-category-list">
                {categories.map((category) => (
                    <li
                        className={`admin-category-item${category.id === activeCategoryId ? " active" : ""}`}
                        key={category.id}
                        onClick={() => setActiveCategoryId(category.id)}
                    >
                        {/* <span className="category-icon">📁</span> */}
                        {category.name}
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default AdminCategory;