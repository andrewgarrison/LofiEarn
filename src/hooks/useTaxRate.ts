import axios from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import { QUERY_KEYS } from "../constants";
import { Rate, LcdFetchError } from "../types";

const getTaxRate = async (lcd: string): Promise<Rate> => {
  const { data } = await axios.get(`${lcd}/treasury/tax_rate`);

  return data.result;
};

export const useTaxRate = <TData = Rate>(
  lcd: string,
  options?: UseQueryOptions<Rate, LcdFetchError, TData>
) => {
  return useQuery(QUERY_KEYS.TAX_RATE, () => getTaxRate(lcd), {
    refetchOnWindowFocus: false,
    ...options,
  });
};
