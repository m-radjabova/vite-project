import { useEffect, useState } from "react";
import apiClient from "../apiClient/ApiClient";
import { toast } from "react-toastify";
import { OrderType } from "../page/types/Types";

const useOrder = () => {
 const [orders, setOrders] = useState<OrderType[]>([]);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = () => {
    apiClient.get("/orders").then((res) => {
      setOrders(res.data);
    }).catch((err) => {
      toast.error("Error fetching orders");
      console.log(err);
    })
  }

  return { orders };
};

export default useOrder;