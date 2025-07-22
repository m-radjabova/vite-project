import { Controller, FieldValues, useForm } from "react-hook-form";
import useCategories from "../../../hooks/useCategories";
import Select from 'react-select';
import { FaPlus, FaSpinner, FaImage, FaTag, FaInfoCircle } from 'react-icons/fa';
import { MdAttachMoney, MdOutlineDiscount, MdCategory } from 'react-icons/md';
import { GiFlowerPot } from 'react-icons/gi';
import { IoMdResize } from 'react-icons/io';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "@mui/icons-material";
import { useBouquetContext } from "../../../context/BouquetProvider";

function AddNewBouquets() {
  const { id } = useParams();
  const { bouquet, addBouquet, updateBouquet } = useBouquetContext();
  const { category, isLoading } = useCategories();
  const { register, handleSubmit, formState: { errors, isSubmitting }, control, reset } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    populateFormData();
  }, [id, bouquet, category, reset]);

  const populateFormData = () => {
    if (!id) return;
    const current = bouquet.find(b => b.id === id);
    if (!current) return;
    reset({
      ...current,
      category: current.category?.map(catId => {
        const cat = category.find(c => c.id === catId);
        return cat ? { value: cat.id, label: cat.title } : null;
      }).filter(Boolean) || []
    });
  };

  const onSubmit = async (formData: FieldValues) => {
    const processedData = {
      ...formData,
      category: formData.category?.map((c: { value: string }) => c.value) || [],
      isLiked: false,
      size: formData.size + " см",
      reviews: []
    };

    if (id) {
      updateBouquet(id, processedData);
    } else {
      addBouquet(processedData);
    }
    navigate("/admin/flowers/all");
  };

  return (
    <div className="add-new-bouquets-container">
      <div className="admin-bouquets-hdr">
        <div>
          <h1 className="admin-bouquets-title">
            <GiFlowerPot className="icon-title" />
            Add New Bouquet
          </h1>
          <p className="admin-bouquets-subtitle">Fill in the details to add a new bouquet to your store !!</p>
        </div>
        <button className="back-to-list-btn" onClick={() => navigate("/admin/flowers/all")}>
          <ArrowLeft className="admin-btn-icon" />
          Back to Bouquet List
        </button>
      </div>
      
      <div className="admin-divider"></div>
      
      <div className="admin-bouquets-form-container">
        <form onSubmit={handleSubmit(onSubmit)} className="bouquet-form">
          <div className="form-grid">
            {/* Bouquet Name */}
            <div className={`form-group ${errors.name ? 'error' : ''}`}>
              <label htmlFor="name" className="form-label">
                <FaPlus className="input-icon" />
                Bouquet Name
              </label>
              <input 
                type="text" 
                id="name" 
                className="form-input"
                placeholder="Romantic Roses"
                {...register("name", { required: "Bouquet name is required" })} 
              />
              {errors.name && <span className="error-message"><FaInfoCircle /> {errors.name.message as string}</span>}
            </div>

            {/* Price */}
            <div className={`form-group ${errors.price ? 'error' : ''}`}>
              <label htmlFor="price" className="form-label">
                <MdAttachMoney className="input-icon" />
                Price
              </label>
              <input 
                type="number" 
                id="price" 
                className="form-input"
                placeholder="49.99"
                step="0.01"
                {...register("price", { required: "Price is required" })} 
              />
              {errors.price && <span className="error-message"><FaInfoCircle /> {errors.price.message as string}</span>}
            </div>

            {/* Old Price */}
            <div className={`form-group ${errors.oldPrice ? 'error' : ''}`}>
              <label htmlFor="oldPrice" className="form-label">
                <MdOutlineDiscount className="input-icon" />
                Old Price
              </label>
              <input 
                type="number" 
                id="oldPrice" 
                className="form-input"
                placeholder="59.99"
                step="0.01"
                {...register("oldPrice", { required: "Old Price is required" })} 
              />
              {errors.oldPrice && <span className="error-message"><FaInfoCircle /> {errors.oldPrice.message as string}</span>}
            </div>

            {/* Status */}
            <div className={`form-group ${errors.status ? 'error' : ''}`}>
              <label htmlFor="status" className="form-label">
                <FaTag className="input-icon" />
                Status
              </label>
              <input 
                type="text" 
                id="status" 
                className="form-input"
                placeholder="Акция, Новинка, С водой можно"
                {...register("status", { required: "Status is required" })} 
              />
              {errors.status && <span className="error-message"><FaInfoCircle /> {errors.status.message as string}</span>}
            </div>

            {/* Compound */}
            <div className={`form-group ${errors.compound ? 'error' : ''}`}>
              <label htmlFor="compound" className="form-label">
                <GiFlowerPot className="input-icon" />
                Compound
              </label>
              <textarea
                id="compound" 
                className="form-input"
                placeholder="5 red roses, 3 white lilies, greenery"
                rows={3}
                {...register("compound", { required: "Compound is required" })} 
              />
              {errors.compound && <span className="error-message"><FaInfoCircle /> {errors.compound.message as string}</span>}
            </div>

            {/* Image */}
            <div className={`form-group ${errors.image ? 'error' : ''}`}>
              <label htmlFor="image" className="form-label">
                <FaImage className="input-icon" />
                Image URL
              </label>
              <input 
                type="text" 
                id="image" 
                className="form-input"
                placeholder="https://example.com/image.jpg"
                {...register("image", { required: "Image is required" })} 
              />
              {errors.image && <span className="error-message"><FaInfoCircle /> {errors.image.message as string}</span>}
            </div>

            {/* Size */}
            <div className={`form-group ${errors.size ? 'error' : ''}`}>
              <label htmlFor="size" className="form-label">
                <IoMdResize className="input-icon" />
                Size
              </label>
              <input 
                type="text" 
                id="size" 
                className="form-input"
                placeholder="30x40 cm"
                {...register("size", { required: "Size is required" })} 
              />
              {errors.size && <span className="error-message"><FaInfoCircle /> {errors.size.message as string}</span>}
            </div>

            {/* Category */}
            <div className={`form-group ${errors.category ? 'error' : ''}`}>
              <label htmlFor="category" className="form-label">
                <MdCategory className="input-icon" />
                Category
              </label>
              {isLoading ? (
                <div className="loading-categories">
                  <FaSpinner className="spinner" /> Loading categories...
                </div>
              ) : (
                <Controller
                  control={control}
                  name="category"
                  rules={{ required: "Category is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      inputId="category"
                      className="react-select-container"
                      classNamePrefix="react-select"
                      options={category.map(cat => ({ value: cat.id, label: cat.title }))}
                      isMulti
                      placeholder="Select categories..."
                      onChange={field.onChange}
                      value={field.value || []}
                    />
                  )}
                />
              )}
              {errors.category && <span className="error-message"><FaInfoCircle /> {errors.category.message as string}</span>}
            </div>
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="spinner" /> Processing...
              </>
            ) : (
              <>
                <FaPlus /> {id ? "Update Bouquet" : "Add Bouquet"}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddNewBouquets;