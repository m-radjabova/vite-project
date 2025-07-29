import { useEffect, useState } from 'react'
import { ImageType } from '../page/types/Types'
import apiClient from '../apiClient/ApiClient'

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
  return {
    image
  }
}

export default useCarouselImg