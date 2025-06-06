import { FaArrowLeft, FaUpload, FaUtensils, FaWeight, FaDollarSign, FaInfoCircle, FaListAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useContextPro from "../../hooks/useContextPro";
import { useForm } from "react-hook-form";
import useCategories from "../../hooks/useCategories";
import apiClient from "../../apiClient/ApiClient";
import { toast } from "react-toastify";
import { useEffect } from "react";

const productSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    compound: z.string().min(1, "Compound is required"),
    price: z.number().min(1, "Price must be greater than 0"),
    imageUrl: z.string().url("Invalid URL format").min(1, "Image URL is required"),
    categoryId: z.string().min(1, "Category is required"),
    weight: z.number().min(1, "Weight must be greater than 0")
});

type ProductForm = z.infer<typeof productSchema>;

function AdminProductForm() {
    const { state: { user } } = useContextPro();
    const categories = useCategories();
    const navigate = useNavigate();
    const { id } = useParams();

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<ProductForm>({
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
                    className="btn-orange"
                >
                    <FaArrowLeft className="me-2" />
                    Back
                </button>
                <h2 className="mb-0 text-orange fw-bold border-orange">
                    {id ? "Update Product" : "Add Product"}
                </h2>
            </div>

            {/* Product Form */}
            <div className="card shadow-sm border-0">
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row g-4">
                            {/* Name */}
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="name" className="form-label fw-medium text-muted">
                                        <FaUtensils className="me-2 text-orange" />
                                        Product Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                        placeholder="e.g. Spicy Chicken Burger"
                                        {...register('name')}
                                    />
                                    {errors.name && (
                                        <div className="invalid-feedback">
                                            {errors.name.message as string}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Category */}
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="category" className="form-label fw-medium text-muted">
                                        <FaListAlt className="me-2 text-orange" />
                                        Category
                                    </label>
                                    <select
                                        id="category"
                                        className={`form-select ${errors.categoryId ? 'is-invalid' : ''}`}
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
                                        <div className="invalid-feedback">
                                            {errors.categoryId.message as string}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="col-12">
                                <div className="form-group">
                                    <label htmlFor="description" className="form-label fw-medium text-muted">
                                        <FaInfoCircle className="me-2 text-orange" />
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                        rows={3}
                                        placeholder="Describe the product in detail..."
                                        {...register('description')}
                                    />
                                    {errors.description && (
                                        <div className="invalid-feedback">
                                            {errors.description.message as string}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Compound */}
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="compound" className="form-label fw-medium text-muted">
                                        <FaListAlt className="me-2 text-orange" />
                                        Ingredients
                                    </label>
                                    <input
                                        type="text"
                                        id="compound"
                                        className={`form-control ${errors.compound ? 'is-invalid' : ''}`}
                                        placeholder="e.g. Chicken, Spices, Lettuce"
                                        {...register('compound')}
                                    />
                                    {errors.compound && (
                                        <div className="invalid-feedback">
                                            {errors.compound.message as string}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Price */}
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label htmlFor="price" className="form-label fw-medium text-muted">
                                        <FaDollarSign className="me-2 text-orange" />
                                        Price ($)
                                    </label>
                                    <input
                                        type="number"
                                        id="price"
                                        className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                                        placeholder="0.00"
                                        {...register('price', { valueAsNumber: true })}
                                    />
                                    {errors.price && (
                                        <div className="invalid-feedback">
                                            {errors.price.message as string}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Weight */}
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label htmlFor="weight" className="form-label fw-medium text-muted">
                                        <FaWeight className="me-2 text-orange" />
                                        Weight (g)
                                    </label>
                                    <input
                                        type="number"
                                        id="weight"
                                        className={`form-control ${errors.weight ? 'is-invalid' : ''}`}
                                        placeholder="0"
                                        {...register('weight', { valueAsNumber: true })}
                                    />
                                    {errors.weight && (
                                        <div className="invalid-feedback">
                                            {errors.weight.message as string}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Image URL */}
                            <div className="col-12">
                                <div className="form-group">
                                    <label htmlFor="imageUrl" className="form-label fw-medium text-muted">
                                        <FaUpload className="me-2 text-orange" />
                                        Image URL
                                    </label>
                                    <input
                                        type="text"
                                        id="imageUrl"
                                        className={`form-control ${errors.imageUrl ? 'is-invalid' : ''}`}
                                        placeholder="https://example.com/image.jpg"
                                        {...register('imageUrl')}
                                    />
                                    {errors.imageUrl && (
                                        <div className="invalid-feedback">
                                            {errors.imageUrl.message as string}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="col-12">
                                <button
                                    type="submit"
                                    className="btn btn-orange px-4 py-2 fw-medium"
                                >
                                    {id ? 'Update Product' : 'Add Product'}
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