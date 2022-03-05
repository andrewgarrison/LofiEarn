export type Theme = "light" | "dark";
const storageKey = "prefersDark";

export const isEmpty = (object = {}): boolean => {
  if (!object) return false;
  return Object.keys(object).length === 0 && object.constructor === Object;
};

export const getSystemPreference = (): Theme => {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "dark";
};

export const getTheme = (): Theme => {
  const hasWindowObject = typeof window !== "undefined";
  const stored =
    hasWindowObject &&
    JSON.parse(window.localStorage.getItem(storageKey) || "{}");
  if (isEmpty(stored)) return getSystemPreference();
  return stored ? "dark" : "dark";
};

export const saveTheme = (theme: Theme): void => {
  window.localStorage.setItem(storageKey, JSON.stringify(theme === "dark"));
};

export const applyTheme = (theme = getTheme()): void => {
  document.documentElement.classList.toggle("dark", theme === "dark");
};
