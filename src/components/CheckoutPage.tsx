import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useProducts from "../hooks/useProduct";
import { FieldValues, useForm } from "react-hook-form";
import { FiShoppingBag, FiTruck, FiCreditCard, FiCheckCircle } from "react-icons/fi";
import { FaIceCream } from "react-icons/fa";

function CheckoutPage() {
    const { id } = useParams();
    const { products } = useProducts();
    const [loading, setLoading] = useState(true);
    const [orderComplete, setOrderComplete] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        if (products.length > 0) {
            setLoading(false);
        }
    }, [products]);

    const product = products.find((p) => String(p.id) === String(id));

    const onSubmit = (data: FieldValues) => {
        console.log(data);
        setOrderComplete(true);
    };

    if (loading) return (
        <div className="loading-screen">
            <FaIceCream className="spinner" />
            <p>Loading your delicious treat...</p>
        </div>
    );

    if (orderComplete) return (
        <div className="order-complete">
            <FiCheckCircle className="success-icon" />
            <h2>Order Confirmed!</h2>
            <p>Your ice cream is on its way to you.</p>
            <p>Thank you for your purchase!</p>
        </div>
    );

    return (
        <div className="checkout-container">
            <div className="checkout-header">
                <h1><FaIceCream /> Ice Cream Delights</h1>
                <div className="checkout-steps">
                    <div className="step active">
                        <FiShoppingBag />
                        <span>Order</span>
                    </div>
                    <div className="step">
                        <FiTruck />
                        <span>Delivery</span>
                    </div>
                    <div className="step">
                        <FiCreditCard />
                        <span>Payment</span>
                    </div>
                </div>
            </div>

            <div className="checkout-grid">
                <div className="checkout-product-card">
                    <h2 className="section-title">
                        <FiShoppingBag /> Your Selection
                    </h2>
                    {product ? (
                        <div className="product-details">
                            <div className="product-image-container">
                                <img src={product.image} alt={product.name} className="product-image" />
                                <div className="product-badge">Best Seller</div>
                            </div>
                            <div className="product-info">
                                <h3>{product.name}</h3>
                                <p className="product-description">{product.description}</p>
                                <div className="product-pricing">
                                    <span className="current-price">${product.price}</span>
                                    {product.oldPrice && (
                                        <span className="old-price">${product.oldPrice}</span>
                                    )}
                                </div>
                                <div className="quantity-selector">
                                    <label>Quantity:</label>
                                    <select>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="product-not-found">
                            <p>Oops! We couldn't find that flavor.</p>
                        </div>
                    )}
                </div>

                <div className="checkout-form-card">
                    <h2 className="section-title">
                        <FiTruck /> Delivery Information
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={`form-group ${errors.name ? 'error' : ''}`}>
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Enter your full name"
                                {...register("name", { required: "Name is required" })}
                            />
                            {errors.name && <span className="error-message">name is required</span>}
                        </div>
                        
                        <div className={`form-group ${errors.email ? 'error' : ''}`}>
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                {...register("email", { 
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                            />
                            {errors.email && <span className="error-message">email is required</span>}
                        </div>
                        
                        <div className={`form-group ${errors.phone ? 'error' : ''}`}>
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                placeholder="Enter your phone number"
                                {...register("phone", { 
                                    required: "Phone number is required",
                                    pattern: {
                                        value: /^[0-9+\-() ]+$/,
                                        message: "Invalid phone number"
                                    }
                                })}
                            />
                            {errors.phone && <span className="error-message">phone is required</span>}
                        </div>
                        
                        <div className={`form-group ${errors.address ? 'error' : ''}`}>
                            <label htmlFor="address">Delivery Address</label>
                            <textarea
                                id="address"
                                placeholder="Enter your full address"
                                {...register("address", { required: "Address is required" })}
                            ></textarea>
                            {errors.address && <span className="error-message">address is required</span>}
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="notes">Delivery Notes (Optional)</label>
                            <textarea
                                id="notes"
                                placeholder="Any special instructions?"
                                {...register("notes")}
                            ></textarea>
                        </div>
                        
                        <button type="submit" className="submit-order-btn">
                            Place Order
                        </button>
                    </form>
                </div>

                <div className="order-summary-card">
                    <h2 className="section-title">
                        <FiCreditCard /> Order Summary
                    </h2>
                    <div className="summary-details">
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>${product?.price || '0.00'}</span>
                        </div>
                        <div className="summary-row">
                            <span>Delivery</span>
                            <span>$2.99</span>
                        </div>
                        <div className="summary-row discount">
                            <span>Summer Discount</span>
                            <span>-$1.00</span>
                        </div>
                        <div className="summary-row total">
                            <span>Total</span>
                            <span>${product ? (parseFloat(String(product.price)) + 1.99).toFixed(2) : '0.00'}</span>
                        </div>
                    </div>
                    
                    <div className="payment-methods">
                        <h3>Payment Method</h3>
                        <div className="payment-options">
                            <label className="payment-option">
                                <input type="radio" name="payment" defaultChecked />
                                <span>Credit/Debit Card</span>
                            </label>
                            <label className="payment-option">
                                <input type="radio" name="payment" />
                                <span>PayPal</span>
                            </label>
                            <label className="payment-option">
                                <input type="radio" name="payment" />
                                <span>Cash on Delivery</span>
                            </label>
                        </div>
                    </div>
                    
                    <div className="delivery-time">
                        <FiTruck className="delivery-icon" />
                        <div>
                            <h3>Estimated Delivery</h3>
                            <p>30-45 minutes</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;