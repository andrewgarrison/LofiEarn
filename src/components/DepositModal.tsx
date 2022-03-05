import { useState, useEffect, useMemo } from "react";
import { useQueryClient } from "react-query";
import { Modal, Props } from "./Modal";
import { useEarnContext } from "../contexts";
import {
  useBalance,
  useDeposit,
  useTx,
  useGasPrice,
  useMarket,
} from "../hooks";
import { LoadingIcon } from "../icons";
import { Button } from "./Button";
import { QUERY_KEYS } from "../constants";
import { UST, TxStage } from "../types";
import { getErrorMessage } from "../utils/getters";
import { Success, Error, Loading } from "./Feedback";

export const DepositModal = ({ isOpen, onClose }: Props) => {
  const queryClient = useQueryClient();
  const { earn, isLoaded } = useEarnContext();
  const [value, setValue] = useState<UST>("" as UST);
  const [txHash, setTxHash] = useState<string>(null);
  const [balance, setBalance] = useState(null);
  const [stage, setStage] = useState<TxStage>("INITIAL");
  const [txError, setTxError] = useState("");
  const { data: gasPrice } = useGasPrice();
  const { data: marketData } = useMarket(earn, { enabled: isLoaded });
  const { data, isLoading } = useBalance(earn, {
    enabled: isLoaded,
    refetchInterval: false,
  });
  const futureTxWarning = useMemo(
    () => !isLoading && Number(value) > balance - Number(gasPrice?.uusd),
    [isLoading, value, balance]
  );

  useEffect(() => {
    if (data) {
      data.balances.map((bal) =>
        setBalance(Number(bal.account_balance).toFixed(3))
      );
    }
  }, [data]);

  useTx(txHash, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(QUERY_KEYS.EARN);
      console.log(data);
      setStage("SUCCESS");
    },
    onError: () => setStage("ERROR"),
  });

  const mutation = useDeposit(value, {
    onMutate: () => setStage("IN_PROGRESS"),
    onSuccess: (data) => {
      setStage("QUERYING_BLOCK");
      setTxHash(data.result.txhash);
    },
    onError: (error) => {
      const errorMsg = getErrorMessage(error);

      if (errorMsg === "UserDenied") return setStage("DENIED");
      return setTxError(errorMsg);
    },
  });

  const handleClose = () => {
    setStage("INITIAL");
    setValue("" as UST);
    onClose();
  };

  switch (stage) {
    case "IN_PROGRESS":
      return (
        <Modal isOpen={isOpen} onClose={handleClose}>
          <div className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8">
            <LoadingIcon className="mr-4" /> Waiting for Terra Station...
          </div>
        </Modal>
      );
    case "QUERYING_BLOCK":
      return (
        <Modal isOpen={isOpen} onClose={handleClose}>
          <Loading txHash={txHash} />
        </Modal>
      );
    case "SUCCESS":
      return (
        <Modal isOpen={isOpen} onClose={handleClose}>
          <Success txHash={txHash} value={value} />
        </Modal>
      );
    case "DENIED":
      return (
        <Modal isOpen={isOpen} onClose={handleClose}>
          <Error title="User Denied" />
        </Modal>
      );
    case "ERROR":
      return (
        <Modal isOpen={isOpen} onClose={handleClose}>
          <Error message={txError} />
        </Modal>
      );
    default:
      return (
        <Modal isOpen={isOpen} onClose={handleClose}>
          <div className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Deposit
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              The current annualized deposit rate is{" "}
              <span className="text-green-300 font-bold">
                {parseFloat(
                  (Number(marketData?.markets?.[0].APY) * 100).toFixed(2)
                )}
                %
              </span>{" "}
              APY
            </p>
            <div>
              <label
                htmlFor="amount"
                className={`block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300`}
              >
                Amount
              </label>
              <input
                type="number"
                name="amount"
                id="amount"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
                value={value}
                placeholder="Amount"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setValue(e.target.value as UST);
                }}
              />
            </div>
            <div className="flex justify-between !mt-2">
              <div />
              <div className="text-sm text-gray-300">
                Max:{" "}
                {isLoading ? (
                  <LoadingIcon size="sm" />
                ) : (
                  <span
                    className="underline cursor-pointer"
                    onClick={() => setValue(balance as UST)}
                  >
                    {balance} UST
                  </span>
                )}
              </div>
            </div>
            {Number(value) > 0 && (
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                <div className="flex justify-between">
                  <div>Tx Fee:</div>
                  <div>{gasPrice?.uusd} UST</div>
                </div>
                <div className="flex justify-between mt-2">
                  <div> Send Amount:</div>
                  <div className="text-gray-600 dark:text-gray-200">
                    {parseFloat(
                      (Number(value) + Number(gasPrice?.uusd)).toFixed(3)
                    )}{" "}
                    UST
                  </div>
                </div>
              </div>
            )}
            {futureTxWarning && (
              <div className="text-sm font-medium text-red-500 dark:text-red-300">
                {Number(value) > Number(balance)
                  ? "You do not have enough UST in your account to complete the desired transaction."
                  : "Leaving less UST in your account may lead to insufficient transaction fees for future transactions."}
              </div>
            )}
            <Button
              disabled={
                !value || Number(value) > Number(balance) || Number(value) <= 0
              }
              className="w-full"
              variant={futureTxWarning ? "danger" : "primary"}
              onClick={() => mutation.mutate()}
            >
              Proceed
            </Button>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 text-center">
              Powered by{" "}
              <a
                className="text-purple-600 dark:text-purple-400 hover:underline"
                href="https://www.anchorprotocol.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Anchor Protocol
              </a>
            </p>
          </div>
        </Modal>
      );
  }
};
