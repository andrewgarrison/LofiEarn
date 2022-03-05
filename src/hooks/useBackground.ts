import { useState, useEffect, CSSProperties } from "react";
import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import { backgroundImages } from "../constants";
import { getRandomFromArray } from "../utils/getters";

export const useBackground = (): CSSProperties => {
  const [image, setImage] = useState("");
  const { status } = useWallet();
  const connected = status === WalletStatus.WALLET_CONNECTED;

  useEffect(() => {
    setImage(getRandomFromArray(backgroundImages));
  }, []);

  return {
    backgroundImage: connected ? `url(${image}), linear-gradient(rgba(31,41,55,0.5),rgba(31,41,55,0.3))` : "",
    backgroundBlendMode: "overlay",
    height: "calc(100vh - 82px)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100%",
    backgroundSize: "cover",
  };
};
