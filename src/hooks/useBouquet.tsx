import { useEffect, useState } from "react";
import { BouqetType } from "../page/types/Types";
import apiClient from "../apiClient/ApiClient";

function useBouquet() {
    const [bouquet, setBouquet] = useState<BouqetType[]>([]);

    useEffect(() => {
        getBouqet();
    }, [])

    const getBouqet = async () => {
        apiClient.get<BouqetType[]>("/bouquets").then((res) => {
            setBouquet(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

  return {bouquet}
}

export default useBouquet;