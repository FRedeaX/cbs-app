/* eslint-disable no-console */
// import { InputBaseProps } from "@mui/material";
import { useRouter } from "next/router";
import {
  FocusEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { delay } from "../../helpers";

// interface IUseForm {
//   isSearch: boolean;
//   isSuggest: boolean;
//   setSuggest(isSuggest: boolean): void;
//   hendleOpenForm(): void;
//   onKeyDownHendler(event: KeyboardEvent<HTMLDivElement>): void;
//   onFocusHendler(): void;
//   onBlurHendler(): void;
// }

const useForm = (inputRef?: HTMLInputElement) => {
  const [isSearch, setSearch] = useState<boolean>(false);
  const [isSuggest, setSuggest] = useState<boolean>(false);

  const { asPath } = useRouter();

  useEffect(() => {
    setSuggest(false);
  }, [asPath, setSuggest]);

  const setFocus = useCallback(() => {
    if (inputRef === undefined) return;

    delay(0).then(() => {
      inputRef.focus();
    });
  }, [inputRef]);

  const resetInput = useCallback(() => {
    if (inputRef === undefined) return;
    // eslint-disable-next-line no-param-reassign
    inputRef.value = "";
    setFocus();
  }, [inputRef, setFocus]);

  const toggleForm = useCallback(() => {
    if (inputRef === undefined) {
      setSearch(false);
      setSuggest(false);
      return;
    }

    setSearch((prev) => {
      if (prev) {
        setSuggest(false);
        return !prev;
      }

      setFocus();
      setSuggest(true);
      return !prev;
    });
  }, [inputRef, setFocus]);

  const onKeyDownHendler = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Escape") {
        if (isSuggest) setSuggest(false);
        else if (isSearch) setSearch(false);
      }
    },
    [isSuggest, setSuggest, isSearch, setSearch],
  );

  const onFocusHendler = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      if (event.currentTarget === event.target) {
        setSuggest(true);
      }
    },
    [setSuggest],
  );

  const onBlurHendler = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      if (
        event.currentTarget === event.target &&
        event.currentTarget.contains(event.relatedTarget)
      ) {
        setSuggest(false);
      }
    },
    [setSuggest],
  );

  return {
    isSearch,
    isSuggest,
    resetInput,
    toggleForm,
    onKeyDownHendler,
    onFocusHendler,
    onBlurHendler,
  };
};

export default useForm;
