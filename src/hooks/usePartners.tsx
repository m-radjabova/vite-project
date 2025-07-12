import { useEffect, useState } from 'react'
import { PartnerType } from '../page/types/Types';
import apiClient from '../apiClient/ApiClient';

function usePartners() {
    const [partners, setPartners] = useState<PartnerType[]>([]);

    useEffect(() => {
      getReviews();
    }, []);
    
    const getReviews = async () => {
        apiClient.get<PartnerType[]>(`/partners`).then((res) => {
            setPartners(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

  return { partners }
}

export default usePartners