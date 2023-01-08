import { useRouter } from "next/router";
import { useCallback, useState } from "react";

import { Maybe } from "../../../../helpers/typings/utility-types";

export type InputValue = string;
export type HendleSetValue = (value: string) => void;

const fill = (text: Maybe<string | string[]>): string =>
  typeof text === "string" ? text : "";

export const useInput = () => {
  const { query } = useRouter();
  const [value, setValue] = useState<InputValue>(fill(query.text));

  // useEffect(() => {
  //   // заполняет `input` при перемещении назад по истории сеансов `History.back()`
  // if (!inputValue) setValue(fill(query.text));
  //   /**
  //    * заполняет `input` при:
  //    * 1. перемещении вперед по истории сеансов `History.forward()`
  //    * 2. обращении к маршруту `/search` без `query` параметров
  //    */
  //    else if (!query.query) setValue("");
  // }, [inputValue, query.text]);

  const hendleSetValue = useCallback<HendleSetValue>((inputValue) => {
    setValue(inputValue);
  }, []);

  return { value, hendleSetValue };
};
