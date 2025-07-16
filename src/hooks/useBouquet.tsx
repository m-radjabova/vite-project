import { useEffect, useState } from "react";
import { BouqetType } from "../page/types/Types";
import apiClient from "../apiClient/ApiClient";

function useBouquet() {
  const [bouquet, setBouquet] = useState<BouqetType[]>([]);

  useEffect(() => {
    getBouquet();
  }, []);

  const getBouquet = async () => {
    try {
      const res = await apiClient.get<BouqetType[]>("/bouquets");
      setBouquet(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleLike = async (id: string) => {
    setBouquet(prev =>
      prev.map(b => {
        if (b.id === id) {
          return { ...b, isLiked: !b.isLiked };
        }
        return b;
      })
    );

    try {
      const liked = bouquet.find(b => b.id === id)?.isLiked;
      await apiClient.patch(`/bouquets/${id}`, {
        isLiked: !liked,
      });
    } catch (err) {
      console.error("Like error:", err);
    }
  };

  return { bouquet, toggleLike };
}

export default useBouquet;
