import { useEffect, useState } from "react";
import { PointType } from "../page/types/Types";
import apiClient from "../apiClient/ApiClient";

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

  return {points}
}

export default usePoints;