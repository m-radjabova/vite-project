import useContextPro from "../hooks/useContextPro"
import { FaPhone, FaMapMarkerAlt, FaTrash, FaTrashAlt } from 'react-icons/fa';

function TipsList() {
    const { state: { tips }, dispatch } = useContextPro()

  return (
    <div className="container">
        <div className="row row-cols-1 row-cols-md-3 g-4">
            {tips.map((tip) => (
                <div key={tip.id} className="col">
                    <div className="card h-100 border-0 shadow-sm" style={{ 
                        background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
                        borderRadius: "15px",
                        overflow: "hidden"
                    }}>
                        <div className="card-body p-4">
                            <h5 className="card-title fw-bold text-white mb-3">
                                {tip.name}
                            </h5>
                            <p className="card-text mb-1">
                                <span className="text-white"> {tip.lastName}</span>
                            </p>
                            <hr className="border-light opacity-50" />
                            <div className="mb-3">
                                <p className="card-text mb-1">
                                    <FaPhone className="me-2 text-white-50" />
                                    <span className="text-white"> {tip.phone}</span>
                                </p>
                                <hr className="border-light opacity-50" />
                                <p className="card-text mb-1">
                                    <FaMapMarkerAlt className="me-2 text-white-50" />
                                    <span className="text-white"> {tip.address}</span>
                                </p>
                                <hr className="border-light opacity-50" />
                            </div>
                            <div className="d-flex justify-content-end align-items-center">
                                <button 
                                    className="btn btn-light btn-sm mt-2 fw-bold rounded-pill d-flex align-items-center" 
                                    style={{ color: "#ff6b88" }}
                                    onClick={() => dispatch({ type: "DELETE", payload: tip.id })}
                                >
                                    <FaTrash className="me-1" />
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <div className="d-flex justify-content-end align-items-center mt-4">
            <button 
                onClick={() => dispatch({type: "DELETE_ALL" })} 
                className="btn btn-danger btn-lg d-flex align-items-center"
            >
                <FaTrashAlt className="me-2" />
                Delete All
            </button>
        </div>
    </div>
    )
}

export default TipsList