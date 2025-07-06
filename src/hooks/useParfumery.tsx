import{ useEffect, useState } from 'react'
import apiClient from '../apiClient/ApiClient'
import { ParfumeryType } from '../page/types/Types'

function useParfumery() {
    const [parfumery, setParfumery] = useState<ParfumeryType[]>([])

    useEffect(() => {
        getParfumery()
    }, [])

    const getParfumery = async () => {
        try {
            const response = await apiClient.get('/parfumery')
            const data = response.data
            setParfumery(data)
        } catch (error) {
            console.error('Error fetching brands:', error);
        }
    }
  return { parfumery }
}

export default useParfumery