import { Product } from "../App";
import { FaCandyCane, FaIceCream, FaAppleAlt, FaCarrot, FaSeedling, FaCoffee, FaCookie, FaEdit, FaTrash } from "react-icons/fa";

interface Props {
  products: Product[];
  deleteProducts : (id: number) => void;
  editProduct : (product: Product) => void
}

function ProductList({ products, deleteProducts, editProduct}: Props) {
  const getIcon = (categoryId: number) => {
    switch (categoryId) {
      case 1: return <FaCandyCane size={20} color="red" />;
      case 2: return <FaCookie size={20} color="brown" />;
      case 3: return <FaCoffee size={20} color="orange" />;
      case 4: return <FaIceCream size={20} color="blue" />;
      case 5: return <FaSeedling size={20} color="green" />;
      case 6: return <FaAppleAlt size={20} color="red" />;
      case 7: return <FaCarrot size={20} color="orange" />;
      default: return null;
    }
  };

  return (
    <div className="row">
      {products.map((product) => (
        <div key={product.id} className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center mb-2">
                {getIcon(product.categoryId)}
                <h5 className="card-title ms-2">{product.title}</h5>
              </div>
              <p className="card-text">{product.description}</p>
            </div>
            <div className="card-footer d-flex justify-content-between align-items-center">
              <span className="badge bg-primary">Price: ${product.price}</span>
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-sm btn-outline-primary me-2"
                  onClick={() => editProduct(product)}
                >
                  <FaEdit /> 
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => deleteProducts(product.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;