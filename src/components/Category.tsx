import { CategoryType } from "../page/types/Types";

interface CategoryProps {
    activeCategoryId: string | null;
    setActiveCategoryId: (id: string) => void;
    categories: CategoryType[];
}

function Category({ activeCategoryId, setActiveCategoryId, categories }: CategoryProps) {

    return (
        <div className="container">
            <ul className="category-list" style={{ display: "flex", gap: "16px" }}>
                {categories.map((category) => (
                    <li
                        className={`category-item${category.id === activeCategoryId ? " active" : ""}`}
                        key={category.id}
                        onClick={() => setActiveCategoryId(category.id)}
                        style={{
                            flex: "1",
                            cursor: "pointer",
                            padding: "8px 14px",
                            borderRadius: "50px",
                            background: category.id === activeCategoryId ? "#FF7020" : "#fff",
                            color: category.id === activeCategoryId ? "#000" : "#000",
                            fontWeight: category.id === activeCategoryId ? 400 : 400,
                            border: "none",
                            transition: "all 0.2s"
                        }}
                    >
                        {category.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Category;