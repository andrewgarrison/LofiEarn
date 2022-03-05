import axios from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { QUERY_KEYS } from "../constants";

const getTx = async (txhash: string, lcd: string) => {
  const response = await axios.get(`${lcd}/txs/${txhash}`);

  return response.data;
};

export const useTx = (txhash: string, options?: UseQueryOptions) => {
  const { network } = useConnectedWallet();

  return useQuery([QUERY_KEYS.TX, txhash], () => getTx(txhash, network.lcd), {
    enabled: Boolean(txhash),
    retry: 20,
    refetchOnWindowFocus: false,
    ...options,
  });
};
