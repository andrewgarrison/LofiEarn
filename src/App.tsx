import { useState } from "react";
import { Navbar, Player, Button, DepositModal, TipModal } from "./components";
import { useEarnContext } from "./contexts";
import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import { useBalance, useBalanceDisplay, useBackground } from "./hooks";

enum ModalState {
  Deposit = "DEPOSIT",
  Tip = "TIP",
}

export function App() {
  const { earn, isLoaded } = useEarnContext();
  const { status } = useWallet();
  const { data: balanceData } = useBalance(earn, { enabled: isLoaded });
  const balanceDisplay = useBalanceDisplay(status, balanceData);
  const bgStyles = useBackground();
  const [modalState, setModalState] = useState<ModalState>(null);

  return (
    <div>
      <Navbar />
      <div style={bgStyles}>
        <div className="container mx-auto flex items-center justify-center h-[60vh] flex-col px-4">
          <div className="text-center">{balanceDisplay}</div>
          {status === WalletStatus.WALLET_CONNECTED && (
            <>
              <div className="flex gap-4 items-center mt-2">
                <Button
                  variant="primary"
                  className="mt-8"
                  onClick={() => setModalState(ModalState.Deposit)}
                >
                  Deposit
                </Button>
                <Button
                  variant="link"
                  className="mt-8"
                  onClick={() => setModalState(ModalState.Tip)}
                >
                  Tip
                </Button>
              </div>
              <DepositModal
                isOpen={modalState === ModalState.Deposit}
                onClose={() => setModalState(null)}
              />
              <TipModal
                isOpen={modalState === ModalState.Tip}
                onClose={() => setModalState(null)}
              />
              <Player />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
