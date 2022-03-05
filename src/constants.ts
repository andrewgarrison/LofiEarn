import { NETWORKS } from "@anchor-protocol/anchor-earn";
import { Gas, Rate } from "./types";

export const CONTRACT_ADDRESS: Record<NETWORKS, string> = {
  [NETWORKS.COLUMBUS_5]: "terra1sepfj7s0aeg5967uxnfk4thzlerrsktkpelm5s",
  [NETWORKS.BOMBAY_12]: "terra15dwd5mj8v59wpj0wvt233mf5efdff808c5tkal",
};
export const LOFI_EARN_ADDRESS = "terra1x4yaaevwjw7kzccuw20d84c8jf3tmwwgja2eja";
export const GAS = {
  gasWanted: 1_000_000 as Gas,
  fixedGas: 1_671_053 as Gas,
  gasAdjustment: 1.6 as Rate<number>,
};
export const soundcloudTracks: string[] = [
  "417474360",
  "1035841942",
  "966761764",
  "859871056",
  "301457242",
  "371286476",
];
export const backgroundImages: string[] = [
  // commented out images are ideal, but we don't have permission to use.
  "https://images.unsplash.com/photo-1627307346808-eb441d0d1076?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2728&q=80",
  // "https://cdnb.artstation.com/p/assets/images/images/029/320/295/original/bogdan-mb0sco-coffeeanim.gif?1601147277",
  // "https://wallpaperaccess.com/full/6502071.gif",
  // "https://cdna.artstation.com/p/assets/images/images/022/521/258/original/bogdan-mb0sco-coffee-shop-animationfullhd.gif?1575731432",
  // "https://cdna.artstation.com/p/assets/images/images/032/575/904/large/bogdan-mb0sco-room-night-16x9-hd.jpg?1606845109",
];
export const QUERY_KEYS = {
  EARN: "earnBalance",
  GAS: "gasPrice",
  MARKET: "marketData",
  MAX_TAX: "lcdMaxTax",
  TAX_RATE: "lcdTaxRate",
  TX: "tx",
  TIP: "tip",
};
