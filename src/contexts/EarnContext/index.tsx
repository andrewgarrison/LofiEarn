import { useEffect, useState, useContext, createContext } from "react";
import {
  AnchorEarn,
  AnchorEarnOperations,
  NETWORKS,
  CHAINS,
} from "@anchor-protocol/anchor-earn";
import { useWallet, WalletStatus } from "@terra-money/wallet-provider";

interface EarnContextProviderProps {
  children: React.ReactNode;
}

interface TEarnContext {
  earn: AnchorEarnOperations;
  isLoaded: boolean;
}

const defaultValue: TEarnContext = {
  earn: {
    balance: () => null,
    deposit: () => null,
    market: () => null,
    send: () => null,
    withdraw: () => null,
  },
  isLoaded: false,
};

export const EarnContext = createContext<TEarnContext>(defaultValue);
export const useEarnContext = () => useContext(EarnContext);

export const EarnContextProvider = (props: EarnContextProviderProps) => {
  const { children } = props;
  const { wallets, status, network } = useWallet();
  const [earn, setEarn] = useState<AnchorEarnOperations>(defaultValue.earn);
  const [isLoaded, setIsLoaded] = useState(defaultValue.isLoaded);

  useEffect(() => {
    let address = "";

    if (status === WalletStatus.WALLET_CONNECTED) {
      (wallets || []).map((wallet) => {
        address = wallet.terraAddress;
      });

      if (address) {
        const anchorEarn = new AnchorEarn({
          chain: CHAINS.TERRA,
          network:
            network.name === "testnet"
              ? NETWORKS.BOMBAY_12
              : NETWORKS.COLUMBUS_5,
          address,
        });

        setEarn(anchorEarn);
        setIsLoaded(true);
      }
    }
  }, [status, wallets]);

  return (
    <EarnContext.Provider value={{ earn, isLoaded }}>
      {children}
    </EarnContext.Provider>
  );
};
