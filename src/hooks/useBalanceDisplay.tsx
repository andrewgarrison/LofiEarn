import { useState } from "react";
import CountUp from "react-countup";
import { WalletStatus } from "@terra-money/wallet-provider";
import { BalanceOutput } from "@anchor-protocol/anchor-earn";

export const useBalanceDisplay = (
  status: WalletStatus,
  data: BalanceOutput
) => {
  const [start, setStart] = useState<number>(0);

  switch (status) {
    case WalletStatus.INITIALIZING:
      return "Initializing Wallet...";
    case WalletStatus.WALLET_NOT_CONNECTED:
      return "Connect to Terra Station to view your earn balance and listen to lofi beats";
    case WalletStatus.WALLET_CONNECTED:
      return !data
        ? "Loading..."
        : data.balances.map((b) => (
            <div key={b.account_balance + b.deposit_balance}>
              <div className="text-gray-200 mb-2 text-balances text-center">
                Total Deposit
              </div>
              <h1 className="text-white text-3xl sm:text-5xl lg:text-[84px] font-semibold balance">
                <CountUp
                  start={start}
                  end={b.deposit_balance}
                  onEnd={() => setStart(Number(b.deposit_balance))}
                  decimals={6}
                  duration={1}
                  separator=","
                  useEasing
                />{" "}
                <span className="text-lg sm:text-2xl lg:text-4xl font-normal">UST</span>
              </h1>
            </div>
          ));
    default:
      return "Something went wrong. Refresh and try again";
  }
};
