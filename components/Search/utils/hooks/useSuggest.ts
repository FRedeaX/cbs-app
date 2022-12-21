import { KeyboardEvent, useCallback } from "react";

export type InputValue = string;
export type HendleSetValue = (value: string) => void;

export const useSuggest = () => {
  const hendleSetValue = useCallback<HendleSetValue>((inputValue) => {}, []);

  return { hendleSetValue };
};
