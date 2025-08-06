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
    <div className="add-bouquet-page">
      <div className="admin-bouquets-header">
        <div>
          <h1 className="admin-bouquets-title">
            <GiFlowerPot className="title-icon" />
            Add New Bouquet
          </h1>
          <p className="bouquet-subtitle">Fill in the details to add a new bouquet to your store !!</p>
        </div>
        <button className="bouquet-back-btn" onClick={() => navigate("/admin/flowers/all")}>
          <ArrowLeft className="btn-icon" />
          Back to Bouquet List
        </button>
      </div>
      
      <div className="admin-divider"></div>
      
      <div className="bouquet-form-wrapper">
        <form onSubmit={handleSubmit(onSubmit)} className="bouquet-form">
          <div className="form-layout">
            {/* Bouquet Name */}
            <div className={`input-field ${errors.name ? 'has-error' : ''}`}>
              <label htmlFor="name" className="field-label">
                <FaPlus className="label-icon" />
                Bouquet Name
              </label>
              <input 
                type="text" 
                id="name" 
                className="text-input"
                placeholder="Romantic Roses"
                {...register("name", { required: "Bouquet name is required" })} 
              />
              {errors.name && <span className="error-text"><FaInfoCircle /> {errors.name.message as string}</span>}
            </div>

            {/* Price */}
            <div className={`input-field ${errors.price ? 'has-error' : ''}`}>
              <label htmlFor="price" className="field-label">
                <MdAttachMoney className="label-icon" />
                Price
              </label>
              <input 
                type="number" 
                id="price" 
                className="text-input"
                placeholder="49.99"
                step="0.01"
                {...register("price", { required: "Price is required" })} 
              />
              {errors.price && <span className="error-text"><FaInfoCircle /> {errors.price.message as string}</span>}
            </div>

            {/* Old Price */}
            <div className={`input-field ${errors.oldPrice ? 'has-error' : ''}`}>
              <label htmlFor="oldPrice" className="field-label">
                <MdOutlineDiscount className="label-icon" />
                Old Price
              </label>
              <input 
                type="number" 
                id="oldPrice" 
                className="text-input"
                placeholder="59.99"
                step="0.01"
                {...register("oldPrice", { required: "Old Price is required" })} 
              />
              {errors.oldPrice && <span className="error-text"><FaInfoCircle /> {errors.oldPrice.message as string}</span>}
            </div>

            {/* Status */}
            <div className={`input-field ${errors.status ? 'has-error' : ''}`}>
              <label htmlFor="status" className="field-label">
                <FaTag className="label-icon" />
                Status
              </label>
              <input 
                type="text" 
                id="status" 
                className="text-input"
                placeholder="Акция, Новинка, С водой можно"
                {...register("status", { required: "Status is required" })} 
              />
              {errors.status && <span className="error-text"><FaInfoCircle /> {errors.status.message as string}</span>}
            </div>

            {/* Compound */}
            <div className={`input-field ${errors.compound ? 'has-error' : ''}`}>
              <label htmlFor="compound" className="field-label">
                <GiFlowerPot className="label-icon" />
                Compound
              </label>
              <textarea
                id="compound" 
                className="text-area"
                placeholder="5 red roses, 3 white lilies, greenery"
                rows={3}
                {...register("compound", { required: "Compound is required" })} 
              />
              {errors.compound && <span className="error-text"><FaInfoCircle /> {errors.compound.message as string}</span>}
            </div>

            {/* Image */}
            <div className={`input-field ${errors.image ? 'has-error' : ''}`}>
              <label htmlFor="image" className="field-label">
                <FaImage className="label-icon" />
                Image URL
              </label>
              <input 
                type="text" 
                id="image" 
                className="text-input"
                placeholder="https://example.com/image.jpg"
                {...register("image", { required: "Image is required" })} 
              />
              {errors.image && <span className="error-text"><FaInfoCircle /> {errors.image.message as string}</span>}
            </div>

            {/* Size */}
            <div className={`input-field ${errors.size ? 'has-error' : ''}`}>
              <label htmlFor="size" className="field-label">
                <IoMdResize className="label-icon" />
                Size
              </label>
              <input 
                type="text" 
                id="size" 
                className="text-input"
                placeholder="30x40 cm"
                {...register("size", { required: "Size is required" })} 
              />
              {errors.size && <span className="error-text"><FaInfoCircle /> {errors.size.message as string}</span>}
            </div>

            {/* Category */}
            <div className={`input-field ${errors.category ? 'has-error' : ''}`}>
              <label htmlFor="category" className="field-label">
                <MdCategory className="label-icon" />
                Category
              </label>
              {isLoading ? (
                <div className="loading-spinner">
                  <FaSpinner className="spinning-icon" /> Loading categories...
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
                      className="custom-select"
                      classNamePrefix="select"
                      options={category.map(cat => ({ value: cat.id, label: cat.title }))}
                      isMulti
                      placeholder="Select categories..."
                      onChange={field.onChange}
                      value={field.value || []}
                    />
                  )}
                />
              )}
              {errors.category && <span className="error-text"><FaInfoCircle /> {errors.category.message as string}</span>}
            </div>
          </div>

          <button
            type="submit"
            className="form-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="spinning-icon" /> Processing...
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