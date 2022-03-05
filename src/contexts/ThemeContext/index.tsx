import * as React from "react";
import { Theme, getTheme, applyTheme, saveTheme } from "../../utils/theme";

interface ThemeContextProviderProps {
  children: React.ReactNode;
}

interface IThemeContext {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

const defaultValue: IThemeContext = {
  theme: getTheme(),
  setTheme: () => {},
};

export const ThemeContext = React.createContext<IThemeContext>(defaultValue);
export const useThemeContext = () => React.useContext(ThemeContext);

export const ThemeContextProvider = (props: ThemeContextProviderProps) => {
  const { children } = props;
  const [theme, setTheme] = React.useState<Theme>(defaultValue.theme);

  React.useEffect(() => {
    applyTheme(theme);
    saveTheme(theme);
    setTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
