import { NextParsedUrlQuery } from "next/dist/server/request-meta";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

export type InputValue = string;
export type HendleSetValue = (value: string) => void;

const fill = (query: NextParsedUrlQuery): string =>
  typeof query.text === "string" ? query.text : "";

export const useInput = () => {
  const { query } = useRouter();
  const [inputValue, setValue] = useState<InputValue>(fill(query));

  // useEffect(() => {
  //   // заполняет `input` при перемещении назад по истории сеансов `History.back()`
  //   if (!inputValue) setValue(fill(query));
  //   /**
  //    * заполняет `input` при:
  //    * 1. перемещении вперед по истории сеансов `History.forward()`
  //    * 2. обращении к маршруту `/search` без `query` параметров
  //    */
  //    else if (!query.query) setValue("");
  // }, [inputValue, query]);

  const hendleSetValue = useCallback<HendleSetValue>((value) => {
    setValue(value);
  }, []);

  return { inputValue, hendleSetValue };
};
