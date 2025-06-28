import { useEffect, useState } from "react";
import apiClient from "../apiClient/ApiClient";
import { toast } from "react-toastify";
import { CarouselImg } from "../page/types/Types";
import { FieldValues } from "react-hook-form";

const useImageCarousel = () => {
 const [carouselImg, setCarouselImg] = useState<CarouselImg[]>([]);

  useEffect(() => {
    getCarouselImages();
  }, []);

  const getCarouselImages = () => {
    apiClient.get("/carouselImg").then((res) => {
      setCarouselImg(res.data);
    }).catch((err) => {
      toast.error("Error fetching carousel images");
      console.log(err);
    })
  }

  const addImage = (data: FieldValues) => {
    apiClient.post("/carouselImg", data).then((res) => {
      setCarouselImg(prev => [...prev, res.data]);
      toast.success("Image added successfully");
    }).catch((err) => {
      toast.error("Error adding image");
      console.log(err);
    });
  }

  const deleteImage = (id: string) => {
    apiClient.delete(`/carouselImg/${id}`).then(() => {
      setCarouselImg(carouselImg.filter((img) => img.id !== id));
      toast.success("Image deleted successfully");
    }).catch((err) => {
      toast.error("Error deleting image");
      console.log(err);
    });
  }

  const updateImage = (id: string, data: FieldValues) => {
    apiClient.put(`/carouselImg/${id}`, data).then((res) => {
      setCarouselImg(carouselImg.map((img) => (img.id === id ? res.data : img)));
      toast.success("Image updated successfully");
    }).catch((err) => {
      toast.error("Error updating image");
      console.log(err);
    });
  }


  return { carouselImg, addImage, deleteImage, updateImage };
};

export default useImageCarousel;