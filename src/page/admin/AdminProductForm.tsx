import { FaArrowLeft, FaUpload, FaUtensils, FaWeight, FaDollarSign, FaInfoCircle, FaListAlt, FaExclamationCircle, FaLink, FaSave, FaPlusCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useContextPro from "../../hooks/useContextPro";
import { useForm } from "react-hook-form";
import useCategories from "../../hooks/useCategories";
import apiClient from "../../apiClient/ApiClient";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { productSchema } from "../types/Types";

type ProductForm = z.infer<typeof productSchema>;

function AdminProductForm() {
    const { state: { user } } = useContextPro();
    const { categories } = useCategories();
    const navigate = useNavigate();
    const { id } = useParams();

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setValue } = useForm<ProductForm>({
        resolver: zodResolver(productSchema)
    });

    useEffect(() => {
        if (id) {
            apiClient.get(`/products/${id}`)
                .then((res) => {
                    const product = res.data;
                    setValue('name', product.name);
                    setValue('description', product.description);
                    setValue('compound', product.compound);
                    setValue('price', product.price);
                    setValue('imageUrl', product.imageUrl);
                    setValue('categoryId', product.categoryId);
                    setValue('weight', product.weight);
                })
                .catch(error => {
                    toast.error("Failed to load product", error);
                    navigate("/admin/product");
                });
        }
    }, [id, setValue, navigate]);

    const onSubmit = (data: ProductForm) => {
        const formData = {
            ...data,
            userId: user?.id
        };

        if (id) {
            apiClient.put(`/products/${id}`, formData)
                .then((res) => {
                    console.log(res.data)
                    toast.success("Product updated successfully 🍔");
                    navigate("/admin/product");
                    reset();
                })
                .catch(error => {
                    toast.error("Failed to update product", error);
                });
        } else {
            apiClient.post("/products", formData)
                .then((res) => {
                    console.log(res.data)
                    toast.success("Product added successfully 🍔");
                    navigate("/admin/product");
                    reset();
                })
                .catch(error => {
                    toast.error("Failed to submit product", error);
                });
        }
    };


    return (
        <div className="container py-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
                <button
                    onClick={() => navigate(-1)} 
                    className="btn btn-outline-orange d-flex align-items-center px-3 py-2 rounded-pill btn-back"
                    style={{
                        border: '1px solid rgba(255, 140, 0, 0.3)',
                        color: '#ff8c00',
                        fontWeight: 500,
                        transition: 'all 0.3s ease'
                    }}
                >
                    <FaArrowLeft className="me-2" />
                    Back
                </button>
                <h2 className="mb-0 fw-bold h2-menu" style={{
                    color: '#ff8c00',
                    position: 'relative',
                    paddingBottom: '8px',
                }}>
                    {id ? "Update Menu Item" : "Add New Menu Item"}
                </h2>
            </div>
            <div className="card shadow-lg border-0 overflow-hidden" style={{
                borderRadius: '12px',
                border: '1px solid rgba(0,0,0,0.03)',
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(5px)'
            }}>
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row g-4">
                            {/* Name */}
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="name" className="form-label fw-medium d-flex align-items-center" style={{
                                        color: '#6b7280',
                                        marginBottom: '8px'
                                    }}>
                                        <div className="form-icon">
                                            <FaUtensils size={14} />
                                        </div>
                                        Product Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                        style={{
                                            borderRadius: '8px',
                                            padding: '12px 16px',
                                            border: '1px solid rgba(0,0,0,0.1)',
                                            transition: 'all 0.3s ease',
                                        }}
                                        placeholder="e.g. Spicy Chicken Burger"
                                        {...register('name')}
                                    />
                                    {errors.name && (
                                        <div className="invalid-feedback d-flex align-items-center mt-2" style={{
                                            fontSize: '13px'
                                        }}>
                                            <FaExclamationCircle className="me-2" />
                                            {errors.name.message as string}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="category" className="form-label fw-medium d-flex align-items-center" style={{
                                        color: '#6b7280',
                                        marginBottom: '8px'
                                    }}>
                                        <div className="form-icon">
                                            <FaListAlt size={14} />
                                        </div>
                                        Category
                                    </label>
                                    <select
                                        id="category"
                                        className={`form-select ${errors.categoryId ? 'is-invalid' : ''}`}
                                        style={{
                                            borderRadius: '8px',
                                            padding: '12px 16px',
                                            border: '1px solid rgba(0,0,0,0.1)',
                                            transition: 'all 0.3s ease',
                                            appearance: 'none',
                                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='%23ff8c00' d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3e%3c/svg%3e")`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: 'right 16px center',
                                            backgroundSize: '16px 12px'
                                        }}
                                        {...register('categoryId')}
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.categoryId && (
                                        <div className="invalid-feedback d-flex align-items-center mt-2" style={{
                                            fontSize: '13px'
                                        }}>
                                            <FaExclamationCircle className="me-2" />
                                            {errors.categoryId.message as string}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <label htmlFor="description" className="form-label fw-medium d-flex align-items-center" style={{
                                        color: '#6b7280',
                                        marginBottom: '8px'
                                    }}>
                                        <div className="form-icon">
                                            <FaInfoCircle size={14} />
                                        </div>
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                        style={{
                                            borderRadius: '8px',
                                            padding: '12px 16px',
                                            border: '1px solid rgba(0,0,0,0.1)',
                                            transition: 'all 0.3s ease',
                                            minHeight: '100px'
                                        }}
                                        placeholder="Describe the product in detail..."
                                        {...register('description')}
                                    />
                                    {errors.description && (
                                        <div className="invalid-feedback d-flex align-items-center mt-2" style={{
                                            fontSize: '13px'
                                        }}>
                                            <FaExclamationCircle className="me-2" />
                                            {errors.description.message as string}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="compound" className="form-label fw-medium d-flex align-items-center" style={{
                                        color: '#6b7280',
                                        marginBottom: '8px'
                                    }}>
                                        <div className="form-icon">
                                            <FaListAlt size={14} />
                                        </div>
                                        Ingredients
                                    </label>
                                    <input
                                        type="text"
                                        id="compound"
                                        className={`form-control ${errors.compound ? 'is-invalid' : ''}`}
                                        style={{
                                            borderRadius: '8px',
                                            padding: '12px 16px',
                                            border: '1px solid rgba(0,0,0,0.1)',
                                            transition: 'all 0.3s ease'
                                        }}
                                        placeholder="e.g. Chicken, Spices, Lettuce, Mayo"
                                        {...register('compound')}
                                    />
                                    {errors.compound && (
                                        <div className="invalid-feedback d-flex align-items-center mt-2" style={{
                                            fontSize: '13px'
                                        }}>
                                            <FaExclamationCircle className="me-2" />
                                            {errors.compound.message as string}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label htmlFor="price" className="form-label fw-medium d-flex align-items-center" style={{
                                        color: '#6b7280',
                                        marginBottom: '8px'
                                    }}>
                                        <div className="form-icon">
                                            <FaDollarSign size={14} />
                                        </div>
                                        Price ($)
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text" >$</span>
                                        <input
                                            type="number"
                                            id="price"
                                            className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                                            style={{
                                                borderTopLeftRadius: '0',
                                                borderBottomLeftRadius: '0',
                                                padding: '12px 16px',
                                                border: '1px solid rgba(0,0,0,0.1)',
                                                transition: 'all 0.3s ease',
                                            }}
                                            placeholder="0.00"
                                            step="0.01"
                                            {...register('price', { valueAsNumber: true })}
                                        />
                                    </div>
                                    {errors.price && (
                                        <div className="invalid-feedback d-flex align-items-center mt-2" style={{
                                            fontSize: '13px'
                                        }}>
                                            <FaExclamationCircle className="me-2" />
                                            {errors.price.message as string}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label htmlFor="weight" className="form-label fw-medium d-flex align-items-center" style={{
                                        color: '#6b7280',
                                        marginBottom: '8px'
                                    }}>
                                        <div className="form-icon">
                                            <FaWeight size={14} />
                                        </div>
                                        Weight (g)
                                    </label>
                                    <div className="input-group">
                                        <input
                                            type="number"
                                            id="weight"
                                            className={`form-control ${errors.weight ? 'is-invalid' : ''}`}
                                            style={{
                                                borderTopRightRadius: '0',
                                                borderBottomRightRadius: '0',
                                                padding: '12px 16px',
                                                border: '1px solid rgba(0,0,0,0.1)',
                                                transition: 'all 0.3s ease'
                                            }}
                                            placeholder="0"
                                            {...register('weight', { valueAsNumber: true })}
                                        />
                                        <span className="input-group-text2 ">g</span>
                                    </div>
                                    {errors.weight && (
                                        <div className="invalid-feedback d-flex align-items-center mt-2" style={{
                                            fontSize: '13px'
                                        }}>
                                            <FaExclamationCircle className="me-2" />
                                            {errors.weight.message as string}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <label htmlFor="imageUrl" className="form-label fw-medium d-flex align-items-center" style={{
                                        color: '#6b7280',
                                        marginBottom: '8px'
                                    }}>
                                        <div className="form-icon">
                                            <FaUpload size={14} />
                                        </div>
                                        Image URL
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text" style={{
                                            background: 'rgba(255, 140, 0, 0.05)',
                                            border: '1px solid rgba(0,0,0,0.1)',
                                            borderRight: 'none',
                                            color: '#ff8c00'
                                        }}>
                                            <FaLink size={12} />
                                        </span>
                                        <input
                                            type="text"
                                            id="imageUrl"
                                            className={`form-control ${errors.imageUrl ? 'is-invalid' : ''}`}
                                            style={{
                                                padding: '12px 16px',
                                                border: '1px solid rgba(0,0,0,0.1)',
                                                transition: 'all 0.3s ease'
                                            }}
                                            placeholder="https://example.com/image.jpg"
                                            {...register('imageUrl')}
                                        />
                                    </div>
                                    {errors.imageUrl && (
                                        <div className="invalid-feedback d-flex align-items-center mt-2" style={{
                                            fontSize: '13px'
                                        }}>
                                            <FaExclamationCircle className="me-2" />
                                            {errors.imageUrl.message as string}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-12 mt-4">
                                <button
                                    type="submit"
                                    className="btn w-100 py-3 fw-bold rounded-pill d-flex align-items-center justify-content-center position-relative overflow-hidden btn-submit"
                                    style={{
                                        background: 'linear-gradient(90deg, #ff8c00, #ffaa00)',
                                        color: 'white',
                                        border: 'none',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 4px 15px rgba(255, 140, 0, 0.3)',
                                        zIndex: 1
                                    }}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            {id ? 'Updating...' : 'Adding...'}
                                        </>
                                    ) : (
                                        <>
                                            {id ? (
                                                <>
                                                    <FaSave className="me-2" />
                                                    Update Menu Item
                                                </>
                                            ) : (
                                                <>
                                                    <FaPlusCircle className="me-2" />
                                                    Add New Menu Item
                                                </>
                                            )}
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AdminProductForm;