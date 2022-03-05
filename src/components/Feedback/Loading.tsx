import { useConnectedWallet } from "@terra-money/wallet-provider";
import { LoadingIcon } from "../../icons";

interface Props {
  txHash: string;
}

export const Loading = ({ txHash }: Props) => {
  const { network } = useConnectedWallet();

  return (
    <div className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8">
      <div className="w-full text-center">
        <LoadingIcon size="lg" variant="primary" className="mb-6" />
      </div>
      <h3 className="text-2xl font-semibold text-center !mt-3">
        Waiting for receipt...
      </h3>
      <p className="text-gray-600 dark:text-gray-200">
        Transaction broadcasted. There is no need to send another until it has
        been complete.
      </p>
      {txHash && (
        <div className="flex justify-between !mt-8">
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
    </div>
  );
};
