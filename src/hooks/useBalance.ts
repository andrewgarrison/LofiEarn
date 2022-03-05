import { useQuery, UseQueryOptions } from "react-query";
import {
  DENOMS,
  BalanceOutput,
  OperationError,
  AnchorEarnOperations,
} from "@anchor-protocol/anchor-earn";
import { QUERY_KEYS } from "../constants";

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const getBalance = async (
  anchorEarn: AnchorEarnOperations
): Promise<BalanceOutput> => {
  const result = await anchorEarn.balance({
    currencies: [DENOMS.UST],
  });

  return result;
};

export const useBalance = <TData = BalanceOutput>(
  anchorEarn: AnchorEarnOperations,
  options?: UseQueryOptions<BalanceOutput, OperationError, TData>
) => {
  return useQuery(QUERY_KEYS.EARN, () => getBalance(anchorEarn), {
    refetchInterval: randomIntFromInterval(2000, 8000),
    refetchOnWindowFocus: false,
    ...options,
  });
};
