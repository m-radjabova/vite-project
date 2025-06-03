import { useEffect, useState } from "react";
import apiClient from "../../apiClient/ApiClient";
import { CarouselImg } from "../../components/ProductCarousel";

function AdminClients() {
  const [carouselImg, setCarouselImg] = useState<CarouselImg[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");

  useEffect(() => {
    getCarouselImg();
  }, []);
  
  const getCarouselImg = () => {
    apiClient.get<CarouselImg[]>("/productcarousel").then((res) => {
      setCarouselImg(res.data);
    });
  }

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      apiClient.post("/productcarousel", { imgUrl: newImageUrl })
        .then(() => {
          getCarouselImg();
          setNewImageUrl("");
        });
    }
  }

  const handleDeleteImage = (id: number) => {
    apiClient.delete(`/productcarousel/${id}`)
      .then(() => {
        getCarouselImg();
      });
  }


  return (
    <div className="admin-clients">
      <div className="add-section">
        <input
          type="text"
          value={newImageUrl}
          onChange={(e) => setNewImageUrl(e.target.value)}
          placeholder="Enter image URL"
        />
        <button onClick={handleAddImage} className="add-button">
          Add Image
        </button>
      </div>
      
      <div className="image-list">
        {carouselImg.map((image) => (
          <div key={image.id} className="image-item">
            <img src={image.imgUrl} alt={image.imgUrl} />
            <button 
              onClick={() => handleDeleteImage(image.id)} 
              className="delete-button"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}


export default AdminClients;