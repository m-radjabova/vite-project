import{ useEffect, useState } from 'react'
import { BrandsType } from '../page/types/Types'
import apiClient from '../apiClient/ApiClient'

function useBrands() {
    const [brands, setBrands] = useState<BrandsType[]>([])

    useEffect(() => {
        getBrands()
    }, [])

    const getBrands = async () => {
        try {
            const response = await apiClient.get('/brands')
            const data = response.data
            setBrands(data)
        } catch (error) {
            console.error('Error fetching brands:', error);
        }
    }
  return { brands }
}

export default useBrands