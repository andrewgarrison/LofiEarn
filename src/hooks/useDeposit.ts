import { useMutation, UseMutationOptions } from "react-query";
import {
  useConnectedWallet,
  TxResult,
  ConnectedWallet,
} from "@terra-money/wallet-provider";
import { MsgExecuteContract, Coins, Coin, Fee } from "@terra-money/terra.js";
import { Big } from "big.js";
import { getNetwork } from "../utils/getters";
import { formatTokenInput } from "../utils/formatters";
import { CONTRACT_ADDRESS, GAS } from "../constants";
import { UST, u } from "../types";
import { useGasPrice } from "./useGasPrice";

const createDeposit = async (
  value: UST,
  connectedWallet: ConnectedWallet,
  gasPrice: u<UST<Big>>
) => {
  if (!connectedWallet.availablePost) {
    throw new Error("Can not post!");
  }

  return await connectedWallet.post({
    msgs: [
      new MsgExecuteContract(
        connectedWallet.walletAddress,
        CONTRACT_ADDRESS[getNetwork(connectedWallet.network)],
        { deposit_stable: {} },
        new Coins([new Coin("uusd", formatTokenInput(value))])
      ),
    ],
    fee: new Fee(GAS.gasWanted, formatTokenInput(gasPrice) + "uusd"),
    gasAdjustment: GAS.gasAdjustment,
  });
};

export const useDeposit = (
  value: UST,
  options?: UseMutationOptions<TxResult, Error>
) => {
  const connectedWallet = useConnectedWallet();
  const { data } = useGasPrice();

  return useMutation(() => createDeposit(value, connectedWallet, data.uusd), {
    ...options,
  });
};
