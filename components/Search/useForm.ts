/* eslint-disable no-console */
// import { InputBaseProps } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useForm = (inputRef: any) => {
  const [isForm, setForm] = useState<boolean>(false);

  const { asPath } = useRouter();
  useEffect(() => {
    setForm(false);
  }, [asPath]);

  const hendleOpenForm = () => {
    if (isForm === false) {
      setTimeout(() => {
        inputRef?.current?.children[1]?.focus();
      }, 0);
    }
    setForm((prev) => !prev);
  };

  return { isForm, hendleOpenForm };
};

export default useForm;
