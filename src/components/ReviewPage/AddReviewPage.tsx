import { Controller, FieldValues, useForm } from "react-hook-form";
import useContextPro from "../../hooks/useContextPro";
import useLoading from "../../hooks/useLoading";
import { useNavigate } from "react-router-dom";
import IsLoading from "../IsLoading";
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled } from "@mui/material";
import { toast } from 'react-toastify';
import './AddReviewPage.css';
import { useBouquetContext } from "../../context/BouquetProvider";
import { IoIosArrowForward } from "react-icons/io";
import { v4 as uuidv4 } from 'uuid';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

function AddReviewPage() {
  const { register, handleSubmit, formState: { errors }, control } = useForm();
  const {bouquet, selectedBouquet, selectBouquet,addReviews} = useBouquetContext();
  const { state: { user } } = useContextPro();
  const { loading } = useLoading();
  const navigate = useNavigate();

  if (!user) {
    toast.error("You must be logged in to add a review");
    navigate('/login');
    return null;
  }

  if (loading) {
    return <IsLoading />;
  }

  const onSubmit = (data: FieldValues) => {
    if (!selectedBouquet) {
      toast.error("Пожалуйста, выберите букет для отзыва");
      return;
    }
    
    const now = new Date();
    const date = now.toLocaleDateString("ru-RU");
    const time = now.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });

    const reviewData = {
      id: uuidv4(),
      ...data,
      bouquetId: selectedBouquet.id,
      userId: user.id,
      userName: user.username,
      date,
      time,
    };
    addReviews(selectedBouquet.id, reviewData);
    navigate("/reviews");
  };

  return (
    <div className="add-review">
      <div className="container">
        <div className="catalog-title">
            <span className="catalog-link catalog-bold" onClick={() => navigate("/")}>Главная <IoIosArrowForward className="arrow-icon" /> </span>
            <span className="catalog-link">Отзывы <IoIosArrowForward className="arrow-icon" /></span>
            <span className="catalog-link">Добавить отзыв</span> 
        </div>
        <div className="add-review-container">
          <h1 className="add-review__title">Оставить отзыв 💕</h1>

          {bouquet.length > 1 && (
            <div className="bouquet-selection">
              <h3>Выберите букет для отзыва 👇</h3>
              <div className="bouquet-options">
                {bouquet.map(bouquet => (
                  <div 
                    key={bouquet.id}
                    className={`bouquet-option ${selectedBouquet?.id === bouquet.id ? 'selected' : ''}`}
                    onClick={() => selectBouquet(bouquet.id)}
                  >
                    <img src={bouquet.image} alt={bouquet.name} />
                    <p>{bouquet.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {selectedBouquet && (
            <form onSubmit={handleSubmit(onSubmit)} className="review-form">
              <div className="form-group">
                <label htmlFor="author" className="form-label">
                  Автор
                </label>
                <input
                  type="text"
                  id="author"
                  className={`form-input ${errors.author ? 'error' : ''}`}
                  defaultValue={user.username}
                  {...register("author", { required: "Ism talab qilinadi" })}
                />
                {errors.author && <span className="error-message">{errors.author.message as string}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="location" className="form-label">
                  Местоположение
                </label>
                <input
                  type="text"
                  id="location"
                  className={`form-input ${errors.location ? 'error' : ''}`}
                  {...register("location", { required: "Manzil talab qilinadi" })}
                />
                {errors.location && <span className="error-message">{errors.location.message as string}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Рейтинг</label>
                <Controller
                  control={control}
                  name="rating"
                  rules={{ required: "Рейтинг обязательный" }}
                  defaultValue={0}
                  render={({ field }) => (
                    <StyledRating
                      {...field}
                      value={field.value}
                      onChange={(_, value) => field.onChange(value)}
                      max={5}
                      getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
                      icon={<FavoriteIcon fontSize="inherit" />}
                      emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                    />
                  )}
                />
                {errors.rating && <span className="error-message">{errors.rating.message as string}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="text" className="form-label">
                  Отзыв
                </label>
                <textarea
                  id="text"
                  className={`form-textarea ${errors.text ? 'error' : ''}`}
                  {...register("text", { required: "Отзыв обязательный" })}
                  rows={5}
                ></textarea>
                {errors.text && <span className="error-message">{errors.text.message as string}</span>}
              </div>

              <button type="submit" className="submit-button">
                отправить отзыв
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default AddReviewPage;