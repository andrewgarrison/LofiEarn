export type NominalType<T extends string> = { __type: T };

export type Gas<T = number> = T & NominalType<"gas">;
export type Rate<T = string> = T & NominalType<"ratio">;
export type Token<T = string> = T & NominalType<string>;
export type u<T = string> = T & { __micro: true };

export type TxStage =
  | "INITIAL"
  | "IN_PROGRESS"
  | "QUERYING_BLOCK"
  | "SUCCESS"
  | "ERROR"
  | "DENIED";

// Native currencies
export type UST<T = string> = T & NominalType<"ust">;
export type AUD<T = string> = T & NominalType<"aud">;
export type CAD<T = string> = T & NominalType<"cad">;
export type CHF<T = string> = T & NominalType<"chf">;
export type CNY<T = string> = T & NominalType<"cny">;
export type DKK<T = string> = T & NominalType<"dkk">;
export type EUR<T = string> = T & NominalType<"eur">;
export type GBP<T = string> = T & NominalType<"gbp">;
export type HKD<T = string> = T & NominalType<"hkd">;
export type IDR<T = string> = T & NominalType<"idr">;
export type INR<T = string> = T & NominalType<"inr">;
export type JPY<T = string> = T & NominalType<"jpy">;
export type KRW<T = string> = T & NominalType<"krw">;
export type MNT<T = string> = T & NominalType<"mnt">;
export type NOK<T = string> = T & NominalType<"nok">;
export type PHP<T = string> = T & NominalType<"php">;
export type SDR<T = string> = T & NominalType<"sdr">;
export type SEK<T = string> = T & NominalType<"sek">;
export type SGD<T = string> = T & NominalType<"sgd">;
export type THB<T = string> = T & NominalType<"thb">;
export type KRT<T = string> = T & NominalType<"krt">;
export type Luna<T = string> = T & NominalType<"luna">;

export interface GasPrice {
  uluna: u<Luna>;
  uaud: u<AUD>;
  ucad: u<CAD>;
  uchf: u<CHF>;
  ucny: u<CNY>;
  udkk: u<DKK>;
  ueur: u<EUR>;
  ugbp: u<GBP>;
  uhkd: u<HKD>;
  uidr: u<IDR>;
  uinr: u<INR>;
  ujpy: u<JPY>;
  ukrw: u<KRW>;
  umnt: u<MNT>;
  unok: u<NOK>;
  uphp: u<PHP>;
  usdr: u<SDR>;
  usek: u<SEK>;
  usgd: u<SGD>;
  uthb: u<THB>;
  uusd: u<UST>;
}

export class LcdFetchError extends Error {
  constructor(
    readonly code: number,
    readonly txhash: string,
    readonly raw_log: string
  ) {
    super(raw_log);
    this.name = "LcdFetchError";
  }

  toString = () => {
    return `[${this.name} code="${this.code}" txhash="${this.txhash}" raw_log="${this.raw_log}"]`;
  };
}
