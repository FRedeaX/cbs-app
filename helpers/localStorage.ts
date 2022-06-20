export async function get<T extends object>(key: string): Promise<T | null> {
  try {
    const storage = window.localStorage.getItem(key);
    if (storage) return JSON.parse(storage);
    return null;
  } catch (error) {
    // captureException({ ...error, cstMessage: "getLocalStorage" });
    console.warn(error);
    return null;
  }
}

export const set = (key: string, value: object) =>
  window.localStorage.setItem(key, JSON.stringify(value));
