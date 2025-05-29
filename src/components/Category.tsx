import { CategoryType } from "../page/types/Types";

interface CategoryProps {
    activeCategoryId: string | null;
    setActiveCategoryId: (id: string) => void;
    categories: CategoryType[];
}

function Category({ activeCategoryId, setActiveCategoryId, categories }: CategoryProps) {

    return (
        <div className="container">
            <ul className="category-list">
                {categories.map((category) => (
                    <li
                        className={`category-item${category.id === activeCategoryId ? " active" : ""}`}
                        key={category.id}
                        onClick={() => setActiveCategoryId(category.id)}
                        style={{
                            background: category.id === activeCategoryId ? "#FF7020" : "#fff",
                            color: category.id === activeCategoryId ? "#000" : "#000",
                            fontWeight: category.id === activeCategoryId ? 400 : 400,
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