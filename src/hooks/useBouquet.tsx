import { useEffect, useState } from "react";
import { BouqetType, FavoriteType, OrderType } from "../page/types/Types";
import apiClient from "../apiClient/ApiClient";
import useContextPro from "./useContextPro";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";

function useBouquet() {
  const [bouquet, setBouquet] = useState<BouqetType[]>([]);
  const {state: {user}} = useContextPro();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedBouquet, setSelectedBouquet] = useState<BouqetType | null>(null);
  const [cart, setCart] = useState<BouqetType[]>([]);
  const [orders, setOrders] = useState<OrderType[]>([]);

  useEffect(() => {
    getBouquet();
    getFavorites();
    getCart();
    getOrders();
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
    try {
      const res = await apiClient.get<{ id: string; bouquetId: string, userId: string, userName: string }[]>("/favorites");
      const userFavorites = res.data.filter(fav => user && fav.userId === user.id.toString());
      setFavorites(userFavorites.map(fav => fav.bouquetId));
    } catch (err) {
      console.error("Error fetching favorites:", err);
    }
  };



  const selectBouquet = (id: string) => {
    const found = bouquet.find(b => b.id === id) || null;
    setSelectedBouquet(found);
  };


  const toggleFavorite = async (bouquetId: string) => {
    try {
      if (favorites.includes(bouquetId)) {
        const res = await apiClient.get<FavoriteType[]>("/favorites");
        const favoriteToDelete = res.data.find(f => f.bouquetId === bouquetId && f.userId === user?.id.toString());

        if (!favoriteToDelete) throw new Error("Favorite not found for deletion");

        await apiClient.delete(`/favorites/${favoriteToDelete.id}`);
        setFavorites(prev => prev.filter(favId => favId !== bouquetId));
      } else {
        await apiClient.post("/favorites", {
          bouquetId,
          userId: user?.id,
          userName: user?.username,
        });
        setFavorites(prev => [...prev, bouquetId]);
      }
    } catch (err) {
      console.error("toggleFavorite error:", err);
      toast.error("Favorite o‘zgartirishda xatolik");
    }
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
      const bouq = bouquet.find(b => b.id === id);
      if (!bouq) throw new Error("Bouquet not found");
      const updatedBouquet = {
        ...bouq,
        reviews: [...(bouq.reviews || []), review]
      };
      const res = await apiClient.put(`/bouquets/${id}`, updatedBouquet);
      setBouquet(bouquet.map(b =>
        b.id === id ? res.data : b
      ));
      toast.success("Отзыв успешно добавлен! Спасибо за ваш отзыв! 💕");
    } catch (err) {
      console.error("Review error:", err);
      toast.error("Error adding review");
    }
  }

  const getCart = async () => {
    try {
      const res = await apiClient.get<BouqetType[]>("/cart");
      setCart(res.data);
      return res.data;
    }
    catch (err) {
      console.error("Error fetching cart:", err);
      return [];
    }
  }

  const addToCart = (item: BouqetType, count: number, userId?: string, userName?: string) => {
    const cartItem = {
      ...item,
      count,
      userId,
      userName
    };

    apiClient.post("/cart", cartItem)
      .then(() => {
        setCart(prev => [...prev, cartItem]);
        toast.success("Букет добавлен в корзину");
      })
      .catch(err => {
        console.error("Error adding to cart:", err);
        toast.error("Ошибка при добавлении букета в корзину");
      });
  };

  const deleteBouquetFromCart = async (id: string) => {
    try {
      await apiClient.delete(`/cart/${id}`);
      setCart(cart.filter(item => item.id !== id));
      toast.success("Букет удален из корзины");
    } catch (err) {
      console.error("Error removing bouquet from cart:", err);
      toast.error("Error removing bouquet from cart");
    }
  }

  const updateItemCount = (id: string, count: number) => {
    const updatedCart = cart.map(item => {
      if (item.id === id) {
        return { ...item, count };
      }
      return item;
    });
    setCart(updatedCart);
  }

  const addOrder = async (orderData: FieldValues) => {
    try {
      const res = await apiClient.post("/orders", orderData);
      setOrders(prev => [...prev, res.data]);
      return res.data;
    } catch (err) {
      console.error("Error adding order:", err);
      return null;
    }
  }
  
  const clearCart = async () => {
    try {
      const res = await apiClient.get("/cart");
      const userCart = res.data.filter((item: { userId: string }) => String(item.userId) === String(user?.id));

      await Promise.all(
        userCart.map((item: { id: string }) =>
          apiClient.delete(`/cart/${item.id}`)
        )
      );

      setCart([]); 
    } catch (err) {
      console.error("Ошибка при очистке корзины:", err);
      toast.error("Ошибка при очистке корзины");
    }
  };

  const getOrders = async () => {
    try {
      const res = await apiClient.get<OrderType[]>("/orders");
      setOrders(res.data);
      return res.data;
    } catch (err) {
      console.error("Error fetching orders:", err);
      return [];
    }
  }


  return { bouquet, favorites, toggleFavorite, addBouquet, updateBouquet, deleteBouquet,  getBouquet,
    selectedBouquet,
    selectBouquet,
    addReviews, addToCart, cart, deleteBouquetFromCart, updateItemCount, getCart, addOrder, orders, setOrders, clearCart
  };
}

export default useBouquet;
