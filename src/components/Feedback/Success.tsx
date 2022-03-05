import { useGasPrice } from "../../hooks";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { UST } from "../../types";

interface Props {
  value: UST;
  txHash: string;
}

export const Success = ({ value, txHash }: Props) => {
  const { network } = useConnectedWallet();
  const { data: gasPrice } = useGasPrice();

  return (
    <div className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8">
      <svg
        className="w-12 h-12 text-green-400 mx-auto mb-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h3 className="text-2xl font-semibold text-center !mt-3">Complete!</h3>
      <div className="flex justify-between !mt-8">
        <div className="text-gray-500 dark:text-gray-300">Send Amount:</div>
        <div>{parseFloat(Number(value).toFixed(3))} UST</div>
      </div>
      {txHash && (
        <div className="flex justify-between !mt-3">
          <div className="text-gray-500 dark:text-gray-300">Tx Hash:</div>
          <div>
            <a
              className="underline"
              href={`https://finder.terra.money/${network.chainID}/tx/${txHash}`}
              target="_blank"
              rel="noreferrer"
            >
              {txHash.slice(0, 6)}...{txHash.slice(-6)}
            </a>
          </div>
        </div>
      )}
      <div className="flex justify-between !mt-3">
        <div className="text-gray-500 dark:text-gray-300">Tx Fee:</div>
        <div>{gasPrice?.uusd} UST</div>
      </div>
    </div>
  );
};
