import * as ReactDOM from "react-dom";
import { App } from "./App";
import { AppContextProvider } from "./contexts";
import { getChainOptions } from "@terra-money/wallet-provider";

getChainOptions().then((chainOptions) => {
  ReactDOM.render(
    <AppContextProvider chainOptions={chainOptions}>
      <App />
    </AppContextProvider>,
    document.getElementById("app")
  );
});
