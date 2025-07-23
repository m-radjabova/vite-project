import { useEffect, useState } from 'react'
import { PartnerType } from '../page/types/Types';
import apiClient from '../apiClient/ApiClient';
import { FieldValues } from 'react-hook-form';

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

    const deletePartner = async (id: string) => {
        try {
            await apiClient.delete(`/partners/${id}`);
            setPartners(prev => prev.filter(partner => partner.id !== id));
        } catch (error) {
            console.error("Failed to delete partner:", error);
        }
    };
    const updatePartner = async (id: string, data: FieldValues) => {
        try {
            const response = await apiClient.put(`/partners/${id}`, data);
            setPartners(prev => prev.map(partner => partner.id === id ? response.data : partner));
        } catch (error) {
            console.error("Failed to update partner:", error);
        }
    };
    
    const addPartner = async (data: FieldValues) => {
        try {
            const response = await apiClient.post('/partners', data);
            setPartners(prev => [...prev, response.data]);
        } catch (error) {
            console.error("Failed to add partner:", error);
        }
    };

  return { partners, deletePartner, updatePartner, addPartner }
}

export default usePartners