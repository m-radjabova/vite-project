import { useEffect, useState } from "react";
import apiClient from "../apiClient/ApiClient";

interface Category {
    id: string;
    name: string;
}

function Category() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = () => {
        apiClient.get<Category[]>("/categories")
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
        });
    };

    return (
        <div className="container">
            <ul className="category-list">
                {categories.map((category) => (
                    <li
                        className={`category-item${category.id === activeCategoryId ? " active" : ""}`}
                        key={category.id}
                        onClick={() => setActiveCategoryId(category.id)}
                    >
                        {category.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Category;