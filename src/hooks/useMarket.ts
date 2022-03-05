import { useQuery, UseQueryOptions } from "react-query";
import {
  DENOMS,
  OperationError,
  AnchorEarnOperations,
  MarketOutput,
} from "@anchor-protocol/anchor-earn";
import { QUERY_KEYS } from "../constants";

const getMarketData = async (
  anchorEarn: AnchorEarnOperations
): Promise<MarketOutput> => {
  const result = await anchorEarn.market({
    currencies: [DENOMS.UST],
  });

  return result;
};

export const useMarket = <TData = MarketOutput>(
  anchorEarn: AnchorEarnOperations,
  options?: UseQueryOptions<MarketOutput, OperationError, TData>
) => {
  return useQuery(QUERY_KEYS.MARKET, () => getMarketData(anchorEarn), {
    refetchOnWindowFocus: false,
    ...options,
  });
};
