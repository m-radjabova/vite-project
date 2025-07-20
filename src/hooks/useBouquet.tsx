import { useEffect, useState } from "react";
import { BouqetType } from "../page/types/Types";
import apiClient from "../apiClient/ApiClient";
import useContextPro from "./useContextPro";

function useBouquet() {
  const [bouquet, setBouquet] = useState<BouqetType[]>([]);
  const {state: {user}} = useContextPro();
  const [favorites, setFavorites] = useState<string[]>([]);

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

  return { bouquet, favorites, toggleFavorite };
}

export default useBouquet;
