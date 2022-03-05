import { useMutation, UseMutationOptions } from "react-query";
import {
  useConnectedWallet,
  TxResult,
  ConnectedWallet,
} from "@terra-money/wallet-provider";
import { MsgSend, Fee } from "@terra-money/terra.js";
import { Big } from "big.js";
import { formatTokenInput } from "../utils/formatters";
import { GAS, LOFI_EARN_ADDRESS } from "../constants";
import { UST, u } from "../types";
import { useGasPrice } from "./useGasPrice";

const createTip = async (
  value: UST,
  connectedWallet: ConnectedWallet,
  gasPrice: u<UST<Big>>
) => {
  if (!connectedWallet.availablePost) {
    throw new Error("Can not post!");
  }

  return await connectedWallet.post({
    msgs: [
      new MsgSend(connectedWallet.walletAddress, LOFI_EARN_ADDRESS, {
        uusd: formatTokenInput(value),
      }),
    ],
    fee: new Fee(GAS.gasWanted, formatTokenInput(gasPrice) + "uusd"),
    gasAdjustment: GAS.gasAdjustment,
  });
};

export const useTip = (
  value: UST,
  options?: UseMutationOptions<TxResult, Error>
) => {
  const connectedWallet = useConnectedWallet();
  const { data } = useGasPrice();

  return useMutation(() => createTip(value, connectedWallet, data.uusd), {
    ...options,
  });
};
