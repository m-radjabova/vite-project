import { useEffect, useState } from "react";
import { CategoryType, ProductType } from "../page/types/Types";
import { useNavigate } from "react-router-dom";

interface Props {
    categories: CategoryType[];
    products: ProductType[];
}

function OurProducts({ categories, products }: Props) {
    const navigate = useNavigate();
    const [activeId, setActiveId] = useState(
        categories.length > 0 ? categories[0].id : null
    );

    useEffect(() => {
        if (categories.length > 0) {
        setActiveId(categories[0].id);
        }
    }, [categories]);
    
    return (
        <div>
            <div className="our-products" id="product">
                <h1>Our Products</h1>
                <div className="products-categories">
                    {categories.map((category) => (
                        <div className="categories-item" key={category.id}>
                            <h5
                                className={activeId === category.id ? "active" : ""}
                                onClick={() => setActiveId(category.id)}
                            >
                                {category.categoryName}
                            </h5>
                        </div>
                    ))}
                </div>
                <div className="products-list" data-aos="fade-right">
                {products
                    .filter((product) => product.categoryId === activeId)
                    .map((product, index) => (
                    <div
                        className={`product-item${index % 2 === 1 ? " reverse" : ""}`}
                        key={product.id}
                    >
                        <div className="product-img">
                            <img src={product.image} alt={product.name} />
                        </div>
                        <div className="product-info">
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                        <h5 className="product-price">
                            
                            ${product.price}
                            {product.oldPrice && (
                            <span className="old-price">${product.oldPrice}</span>
                            )}
                        </h5>
                        <button onClick={() => navigate(`/checkout-product/${product.id}`)} >Buy Now</button>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default OurProducts;