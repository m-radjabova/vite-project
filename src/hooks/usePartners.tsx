import{ useEffect, useState } from 'react'
import apiClient from '../apiClient/ApiClient'

interface PartnerType {
    id: string;
    brandLogo: string;
}

function usePartners() {
    const [partner, setPartner] = useState<PartnerType[]>([]);

    useEffect(() => {
        getPartner()
    }, [])

    const getPartner = async () => {
        try {
            const response = await apiClient.get('/partners')
            const data = response.data
            setPartner(data)
        } catch (error) {
            console.error('Error fetching brands:', error);
        }
    }
  return { partner }
}

export default usePartners