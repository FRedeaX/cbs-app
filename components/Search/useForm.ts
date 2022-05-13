/* eslint-disable no-console */
// import { InputBaseProps } from "@mui/material";
import { InputBaseProps } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useForm = (inputRef: InputBaseProps) => {
  // const [isSearch, setSearch] = useState<{ input: boolean; suggest: boolean }>({
  //   input: false,
  //   suggest: false,
  // });
  const [isSearch, setSearch] = useState<boolean>(false);
  const [isSuggest, setSuggest] = useState<boolean>(false);

  const { asPath } = useRouter();
  // const suggestClose = useCallback(() => {
  //   setSearch((prev) => ({
  //     ...prev,
  //     suggest: false,
  //   }));
  // }, [setSearch]);

  // const suggestOpen = useCallback(() => {
  //   setSearch((prev) => ({
  //     ...prev,
  //     suggest: true,
  //   }));
  // }, [setSearch]);

  useEffect(() => {
    setSuggest(false);
  }, [asPath, setSuggest]);

  const hendleOpenForm = () => {
    if (!isSearch) {
      setTimeout(() => {
        inputRef.focus();
      }, 0);
    }
    setSearch((prev) => {
      if (prev) {
        setSuggest(false);
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
