import axios from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import { QUERY_KEYS } from "../constants";
import { u, Token, LcdFetchError } from "../types";
import { DENOMS } from "@anchor-protocol/anchor-earn";

const getMaxTax = async <T extends Token>(
  denom: DENOMS,
  lcd: string
): Promise<u<T>> => {
  const { data } = await axios.get(`${lcd}/treasury/tax_cap/${denom}`);

  return data.result;
};

export const useMaxTax = <TData = u<Token>>(
  denom: DENOMS,
  lcd: string,
  options?: UseQueryOptions<u<Token>, LcdFetchError, TData>
) => {
  return useQuery(QUERY_KEYS.MAX_TAX, () => getMaxTax(denom, lcd), {
    refetchOnWindowFocus: false,
    ...options,
  });
};
