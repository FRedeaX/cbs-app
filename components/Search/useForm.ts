/* eslint-disable no-console */
// import { InputBaseProps } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useForm = (inputRef?: HTMLInputElement) => {
  const [isSearch, setSearch] = useState<boolean>(false);
  const [isSuggest, setSuggest] = useState<boolean>(false);

  const { asPath } = useRouter();

  useEffect(() => {
    setSuggest(false);
  }, [asPath, setSuggest]);

  const hendleOpenForm = (): void => {
    if (inputRef === undefined) return;

    if (!isSearch) {
      setTimeout(() => {
        inputRef.focus();
      }, 0);
    }

    setSearch((prev) => {
      if (prev) {
        setSuggest(false);
        // eslint-disable-next-line no-param-reassign
        inputRef.value = "";

        return !prev;
      }
      setSuggest(true);
      return !prev;
    });
  };

  return {
    isSearch,
    setSearch,
    isSuggest,
    setSuggest,
    hendleOpenForm,
  };
};

export default useForm;
