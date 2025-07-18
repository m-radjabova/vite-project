import { useEffect, useState } from "react";
import { PointType } from "../page/types/Types";
import apiClient from "../apiClient/ApiClient";
import { toast } from "react-toastify";
import { FieldValues } from "react-hook-form";

function usePoints() {
    const [points, setPoints] = useState<PointType[]>([]);

    useEffect(() => {
        getPoints();
    }, [])

    const getPoints = async () => {
        apiClient.get<PointType[]>("/points").then((res) => {
            setPoints(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    const addPoint = async (data: FieldValues) => {
      try {
        const res = await apiClient.post("/points", data);
        setPoints(prev => [...prev, res.data]);
        toast.success("Point added successfully");
      } catch (err) {
        console.log(err);
        toast.error("Error adding point");
      }
    }

    const updatePoint = async (id: string, data: FieldValues) => {
      try {
        const res = await apiClient.put(`/points/${id}`, data);
        setPoints(points.map(point => point.id === id ? res.data : point));
        toast.success("Point updated successfully");
      } catch (err) {
        console.log(err);
        toast.error("Error updating point");
      }
    }

    const deletePoint = async (id: string) => {
      try {
        await apiClient.delete(`/points/${id}`);
        setPoints(points.filter(point => point.id !== id));
        toast.success("Point deleted successfully");
      } catch (err) {
        console.log(err);
      }
    };

  return {points, deletePoint, addPoint, updatePoint};
}

export default usePoints;