import { exceptionLog } from "./exceptionLog";

export async function get<T extends object>(key: string): Promise<T | null> {
  try {
    const storage = window.localStorage.getItem(key);
    if (storage) return JSON.parse(storage);
    return null;
  } catch (err) {
    exceptionLog({ err, cstMessage: "getLocalStorage" });
    return null;
  }
}

export const set = (key: string, value: object): void => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    exceptionLog({ err, cstMessage: "setLocalStorage" });
  }
};
