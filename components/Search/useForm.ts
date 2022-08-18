/* eslint-disable no-console */
// import { InputBaseProps } from "@mui/material";
import { InputBaseComponentProps } from "@mui/material";
import { useRouter } from "next/router";
import {
  FocusEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
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

/*
 * 1. При (меньшем || 0) значении из-за анимации visibility фокус не будет установлен.
 */
const DELAY_CSS_TRANSITION_50_PERCENT = 250 / 2;

const useForm = () => {
  const inputRef = useRef<InputBaseComponentProps>();

  const [isSearch, setSearch] = useState<boolean>(false);
  const [isSuggest, setSuggest] = useState<boolean>(false);

  const { asPath } = useRouter();

  useEffect(() => {
    setSuggest(false);
  }, [asPath, setSuggest]);

  const setFocus = useCallback(() => {
    /* 1. */
    delay(DELAY_CSS_TRANSITION_50_PERCENT).then(() => {
      if (inputRef.current === undefined) return;

      inputRef.current.focus();
    });
  }, [inputRef]);

  const resetInput = useCallback(() => {
    if (inputRef.current === undefined) return;

    inputRef.current.value = "";
    setFocus();
  }, [inputRef, setFocus]);

  const toggleForm = useCallback(() => {
    if (inputRef.current === undefined) {
      setSearch(false);
      setSuggest(false);
      return;
    }

    setSearch((prev) => {
      if (prev) {
        setSuggest(!prev);
        return !prev;
      }
      setSuggest(!prev);
      return !prev;
    });
  }, []);

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
    inputRef,
    isSearch,
    isSuggest,
    setFocus,
    resetInput,
    toggleForm,
    onKeyDownHendler,
    onFocusHendler,
    onBlurHendler,
  };
};

export default useForm;
