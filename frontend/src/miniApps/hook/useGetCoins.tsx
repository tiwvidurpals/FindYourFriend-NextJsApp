import axios from "axios";
import { useEffect, useState } from "react";
const coinRankingApi = axios.create({
  baseURL: "https://coinranking1.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Key": "4c50da5040mshf75aa74f17a1faap1bb575jsn94ac27ca284b",
    "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
  },
});
const useGetCoins = () => {
  const [coins, setCoins] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function getCoins() {
      try {
        setIsLoading(true);
        const response = await coinRankingApi.get("/coins", {
          params: {
            referenceCurrencyUuid: "yhjMzLPhuIDl",
            timePeriod: "24h",
            "tiers[0]": "1",
            orderBy: "marketCap",
            orderDirection: "desc",
            limit: "10",
            offset: (page - 1) * 10,
          },
        });
        setCoins(response.data.data);
        setIsLoading(false);
      } catch (e: any) {
        setError(e);
        setIsLoading(false);
      }
    }
    getCoins();
  }, [page]);
  return { coins, isLoading, error, setPage, page };
};
export { useGetCoins };