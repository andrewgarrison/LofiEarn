import axios, { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import { QUERY_KEYS } from "../constants";
import { GasPrice } from "../types";

const getGasPrice = async (): Promise<GasPrice> => {
  const { data } = await axios.get<GasPrice>(
    "https://fcd.terra.dev/v1/txs/gas_prices"
  );
  return data;
};

export const useGasPrice = <TData = GasPrice>(
  options?: UseQueryOptions<GasPrice, AxiosError, TData>
) => {
  return useQuery(QUERY_KEYS.GAS, getGasPrice, {
    refetchOnWindowFocus: false,
    ...options,
  });
};
