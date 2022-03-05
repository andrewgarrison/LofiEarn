import { useState, useEffect, useMemo } from "react";
import { useEarnContext } from "../contexts";
import { useBalance, useGasPrice, useTip, useTx } from "../hooks";
import { Modal, Props } from "./Modal";
import { LoadingIcon } from "../icons";
import { Button } from "./Button";
import { UST, TxStage } from "../types";
import { getErrorMessage } from "../utils/getters";
import { Success, Error, Loading } from "./Feedback";

export const TipModal = ({ isOpen, onClose }: Props) => {
  const { earn, isLoaded } = useEarnContext();
  const [value, setValue] = useState<UST>("5" as UST);
  const [balance, setBalance] = useState(null);
  const [txHash, setTxHash] = useState<string>(null);
  const [stage, setStage] = useState<TxStage>("INITIAL");
  const [isCustom, setIsCustom] = useState(false);
  const [txError, setTxError] = useState("");
  const { data: gasPrice } = useGasPrice();
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
    onSuccess: () => setStage("SUCCESS"),
    onError: () => setStage("ERROR"),
  });

  const mutation = useTip(value, {
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
    setValue("5" as UST);
    setIsCustom(false);
    onClose();
  };

  const updateAmount = (amount: UST) => {
    setValue(amount);
    setIsCustom(false);
  };

  const activeStyles = (sendAmount: UST = "" as UST): string => {
    const activeStyles = "dark:text-purple-300 dark:bg-gray-600";

    if (isCustom && !sendAmount) return activeStyles;
    if (!isCustom && sendAmount === value) return activeStyles;
    return "dark:text-white dark:bg-gray-700";
  };

  const modalProps = { isOpen, onClose: handleClose };

  switch (stage) {
    case "IN_PROGRESS":
      return (
        <Modal {...modalProps}>
          <div className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8">
            <LoadingIcon className="mr-4" /> Waiting for Terra Station...
          </div>
        </Modal>
      );
    case "QUERYING_BLOCK":
      return (
        <Modal {...modalProps}>
          <Loading txHash={txHash} />
        </Modal>
      );
    case "SUCCESS":
      return (
        <Modal {...modalProps}>
          <Success txHash={txHash} value={value} />
        </Modal>
      );
    case "DENIED":
      return (
        <Modal {...modalProps}>
          <Error title="User Denied" />
        </Modal>
      );
    case "ERROR":
      return (
        <Modal {...modalProps}>
          <Error message={txError} />
        </Modal>
      );
    default:
      return (
        <Modal {...modalProps}>
          <div className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Tip
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Tips are not required, but they help tremendously to support the
              developer and artists.
            </p>
            <div className="my-4">
              <label
                htmlFor="amount-group"
                className={`block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300`}
              >
                Amount
              </label>
              <div
                className="inline-flex rounded-sm shadow-sm w-full"
                role="group"
                id="amount-group"
              >
                <button
                  type="button"
                  onClick={() => updateAmount("2.5" as UST)}
                  className={`w-1/4 py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-md border border-gray-200 hover:bg-gray-100 hover:text-purple-700 focus:z-10 focus:ring-2 focus:text-purple-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-0 ${activeStyles(
                    "2.5" as UST
                  )}`}
                >
                  2.5 UST
                </button>
                <button
                  type="button"
                  onClick={() => updateAmount("5" as UST)}
                  className={`w-1/4 py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-purple-700 focus:z-10 focus:ring-2 focus:text-purple-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-0 ${activeStyles(
                    "5" as UST
                  )}`}
                >
                  5 UST
                </button>
                <button
                  type="button"
                  onClick={() => updateAmount("10" as UST)}
                  className={`w-1/4 py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-purple-700 focus:z-10 focus:ring-2 focus:text-purple-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-0 ${activeStyles(
                    "10" as UST
                  )}`}
                >
                  10 UST
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsCustom(true);
                    setValue("" as UST);
                  }}
                  className={`w-1/4 py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-r-md border border-gray-200 hover:bg-gray-100 hover:text-purple-700 focus:z-10 focus:ring-2 focus:text-purple-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-0 ${activeStyles()}`}
                >
                  Custom
                </button>
              </div>
            </div>
            {isCustom && (
              <>
                <div>
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
              </>
            )}
            {Number(value) > 0 && (
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                <div className="flex justify-between">
                  <div>Tx Fee:</div>
                  <div>{gasPrice?.uusd} UST</div>
                </div>
                <div className="flex justify-between mt-2">
                  <div> Send Amount:</div>
                  <div className="text-gray-600 dark:text-gray-100">
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
          </div>
        </Modal>
      );
  }
};
