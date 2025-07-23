import { useEffect, useState } from "react";
import { BouqetType } from "../page/types/Types";
import apiClient from "../apiClient/ApiClient";
import useContextPro from "./useContextPro";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";

function useBouquet() {
  const [bouquet, setBouquet] = useState<BouqetType[]>([]);
  const {state: {user}} = useContextPro();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedBouquet, setSelectedBouquet] = useState<BouqetType | null>(null);

  useEffect(() => {
    getBouquet();
    getFavorites();
  }, []);

  const getBouquet = async () => {
    try {
      const res = await apiClient.get<BouqetType[]>("/bouquets");
      setBouquet(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getFavorites = async () => {
    const res = await apiClient.get<{ id: string; bouquetId: string }[]>("/favorites");
    setFavorites(res.data.map(fav => fav.bouquetId));
  };

  const selectBouquet = (id: string) => {
    const found = bouquet.find(b => b.id === id) || null;
    setSelectedBouquet(found);
  };


  const toggleFavorite = async (id: string) => {
    let updated;
    if (favorites.includes(id)) {
      await apiClient.delete(`/favorites/${id}`);
      updated = favorites.filter(favId => favId !== id);
    } else {
      await apiClient.post(`/favorites`, { bouquetId: id, userId: user?.id, userName: user?.username });
      updated = [...favorites, id];
    }
    setFavorites(updated);
  };

  const addBouquet = async (data: FieldValues) => {
    try {
      const res = await apiClient.post("/bouquets", data);
      setBouquet(prev => [...prev, res.data]);
      toast.success("Bouquet added successfully");
    } catch (err) {
      console.log(err);
      toast.error("Error adding bouquet");
    }
  }

  const updateBouquet = async (id: string, data: FieldValues) => {
    try {
      const res = await apiClient.put(`/bouquets/${id}`, data);
      setBouquet(bouquet.map(bouq => bouq.id === id ? res.data : bouq));
      toast.success("Bouquet updated successfully");
    } catch (err) {
      console.log(err);
      toast.error("Error updating bouquet");
    }
  };

  const deleteBouquet = async (id: string) => {
    try {
      await apiClient.delete(`/bouquets/${id}`);
      setBouquet(bouquet.filter(bouq => bouq.id !== id));
      toast.success("Bouquet deleted successfully");
    } catch (err) {
      console.log(err);
      toast.error("Error deleting bouquet");
    }
  };

  const addReviews = async (id: string, review: FieldValues) => {
    try {
      const res = await apiClient.post(`/bouquets/${id}/reviews`, review);
      setBouquet(bouquet.map(bouq =>
        bouq.id === id
          ? { ...bouq, reviews: [...(bouq.reviews || []), res.data] }
          : bouq
      ));
      toast.success("Review added successfully");
    } catch (err) {
      console.error("Review error:", err);
      toast.error("Error adding review");
    }
  }

  return { bouquet, favorites, toggleFavorite, addBouquet, updateBouquet, deleteBouquet,  getBouquet,
    selectedBouquet,
    selectBouquet,
    addReviews
  };
}

export default useBouquet;
