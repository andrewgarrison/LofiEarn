import { useState } from "react";
import { Button } from "./Button";
import { useThemeContext } from "../contexts";
import { SunIcon, MoonIcon } from "../icons";
import { useWallet, WalletStatus } from "@terra-money/wallet-provider";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useThemeContext();
  const isDark = theme === "dark";
  const { status, availableConnections, connect, disconnect } = useWallet();
  const terraStation = availableConnections[0];

  const handleWalletConnect = () => {
    status === WalletStatus.WALLET_NOT_CONNECTED
      ? connect(terraStation.type)
      : disconnect();
  };

  return (
    <nav className="bg-white border-b-gray-200 px-2 sm:px-4 py-5 dark:bg-gray-800">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <a href="#" className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 fill-[#714BD9] dark:fill-[#9781F9]"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
              clipRule="evenodd"
            />
          </svg>
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white ml-2">
            Lofi Earn
          </span>
        </a>
        <div className="flex md:order-2">
          <Button
            variant="secondary"
            className="hidden md:block"
            onClick={() => handleWalletConnect()}
          >
            <div className="flex items-center">
              <img
                src={terraStation?.icon}
                alt="Terra Station"
                className="h-4 mr-2 block"
              />
              <div>
                {status === WalletStatus.WALLET_NOT_CONNECTED
                  ? "Connect Wallet"
                  : "Disconnect"}
              </div>
            </div>
          </Button>
          {/* <Button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            size="sm"
            variant="ghost"
            iconOnly
            className="ml-4"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </Button> */}
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            className="md:hidden ml-2"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              className="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Button>
        </div>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } justify-between items-center w-full md:flex md:w-auto md:order-1`}
        >
          <Button
            variant="secondary"
            className="w-full mt-4 md:hidden"
            onClick={() => handleWalletConnect()}
          >
            <div className="flex items-center">
              <img
                src={terraStation?.icon}
                alt="Terra Station"
                className="h-4 mr-2 block"
              />
              <div>
                {status === WalletStatus.WALLET_NOT_CONNECTED
                  ? "Connect Wallet"
                  : "Disconnect"}
              </div>
            </div>
          </Button>
        </div>
      </div>
    </nav>
  );
};
