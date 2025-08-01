import { useEffect, useState } from 'react'
import { ImageType } from '../page/types/Types'
import apiClient from '../apiClient/ApiClient'
import { toast } from 'react-toastify'
import { FieldValues } from 'react-hook-form'

function useCarouselImg() {
    const [image, setImg] = useState<ImageType[]>([])

    useEffect(() => {
        getImage();
    }, [])

    const getImage = async () => {
        apiClient.get<ImageType[]>(`/carouselImg`).then((res) => {
            setImg(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    const addImage = async (data: FieldValues) => {
        try {
            const res = await apiClient.post("/carouselImg", data);
            setImg(prev => [...prev, res.data]);
            toast.success("Image added successfully");
        } catch (err) {
            console.log(err);
            toast.error("Error adding image");
        }
    }

    const updateImage = async (id: string, data: FieldValues) => {
        try {
            const res = await apiClient.put(`/carouselImg/${id}`, data);
            setImg(image.map(img => img.id === id ? res.data : img));
            toast.success("Image updated successfully");
        } catch (err) {
            console.log(err);
            toast.error("Error updating image");
        }
    }

    const deleteImage = async (id: string) => {
        try {
            const res = await apiClient.delete(`/carouselImg/${id}`);
            console.log(res);
            setImg(image.filter(img => img.id !== id));
            toast.success("Image deleted successfully");
        } catch (err) {
            console.log(err);
            toast.error("Error deleting image");
        }
    }
  return {
    image,
    addImage,
    updateImage,
    deleteImage
  }
}

export default useCarouselImg