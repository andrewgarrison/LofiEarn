import { NETWORKS } from "@anchor-protocol/anchor-earn";
import {
  NetworkInfo,
  CreateTxFailed,
  Timeout,
  TxFailed,
  TxUnspecifiedError,
  UserDenied,
} from "@terra-money/wallet-provider";

export const getNetwork = (network: NetworkInfo) => {
  if (network.name === "testnet") return NETWORKS.BOMBAY_12;
  return NETWORKS.COLUMBUS_5;
};

export const getRandomFromArray = <T>(array: T[]) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const getErrorMessage = (error: Error): string => {
  if (error instanceof UserDenied) {
    return "UserDenied";
  } else if (error instanceof CreateTxFailed) {
    return `Create Tx Failed: ${error.message}`;
  } else if (error instanceof TxFailed) {
    return `Tx Failed: ${error.message}`;
  } else if (error instanceof Timeout) {
    return "Timeout";
  } else if (error instanceof TxUnspecifiedError) {
    return `Unspecified Error: ${error.message}`;
  } else {
    return `Unknown Error: ${
      error instanceof Error ? error.message : String(error)
    }`;
  }
};
