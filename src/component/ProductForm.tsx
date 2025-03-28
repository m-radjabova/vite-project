import { useEffect } from "react";
import { Category, Product } from "../App";
import { useForm } from "react-hook-form";

interface Props {
  categories: Category[];
  addProducts: (data: Product) => void;
  updateProduct: (data: Product) => void;
  editingProduct: Product | null;
}

interface FormData {
  title: string;
  description: string;
  price: number;
  categoryId: number;
}

function ProductForm({ categories, addProducts, updateProduct, editingProduct }: Props) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  useEffect(() => {
    if (editingProduct) {
      reset(editingProduct); 
    }
  }, [editingProduct, reset]);

  const onSubmit = (data: FormData) => {
    if (editingProduct) {
      updateProduct({ ...editingProduct, ...data });
    } else {
      addProducts({ ...data, id: 0 }); 
    }
    reset({ title: "", description: "", price: 0, categoryId: 0 }); 
  };


  return (
    <div className="card mb-5">
      <div className="card-header display-6">
        Add product
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input {...register("title", { required: true })} type="text" className="form-control" id="title" />
            {errors.title && <p className="text-danger">Title is required</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input {...register("description", { required: true })} type="text" className="form-control" id="description" />
            {errors.description && <p className="text-danger">Description is required</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input {...register("price", { required: true })} type="number" className="form-control" id="price" />
            {errors.price && <p className="text-danger">Price is required</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="categoryId" className="form-label">Category</label>
            <select {...register("categoryId", { required: true })} className="form-select" id="categoryId">
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            {errors.categoryId && <p className="text-danger">Category is required</p>}
          </div>
          <div className="d-flex justify-content-end">
            <button className="btn btn-outline-danger" style={{ width: '20%', fontSize: '20px' }}>Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;