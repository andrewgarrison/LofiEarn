import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { EarnContextProvider } from "./EarnContext";
import { ThemeContextProvider } from "./ThemeContext";
import { WalletProvider } from "@terra-money/wallet-provider";

const queryClient = new QueryClient();

export const AppContextProvider = ({ children, chainOptions }) => {
  return (
    <WalletProvider {...chainOptions}>
      <ThemeContextProvider>
        <QueryClientProvider client={queryClient}>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          <EarnContextProvider>{children}</EarnContextProvider>
        </QueryClientProvider>
      </ThemeContextProvider>
    </WalletProvider>
  );
};

export * from "./ThemeContext";
export * from "./EarnContext";
