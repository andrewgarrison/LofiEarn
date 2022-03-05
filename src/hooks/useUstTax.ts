import { useConnectedWallet } from "@terra-money/wallet-provider";
import { DENOMS } from "@anchor-protocol/anchor-earn";
import { useMaxTax } from "./useMaxTax";
import { useTaxRate } from "./useTaxRate";
import { Rate, u, Token } from "../types";

export interface UseUstTaxOptions {
  taxRate: Rate<string>;
  maxTax: u<Token<string>>;
}

export const useUstTax = () => {
  const { network } = useConnectedWallet();
  const { data: taxRate } = useTaxRate(network.lcd);
  const { data: maxTax } = useMaxTax(DENOMS.UST, network.lcd);

  return { taxRate, maxTax };
};
