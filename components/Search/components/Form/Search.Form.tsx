import { ChangeEvent, FC, ReactNode } from "react";

import { useForm } from "../../Search.utils/hooks";
import classes from "./Search.Form.module.css";

interface ISearchFormProps {
  children: ReactNode;
}

export const SearchForm: FC<ISearchFormProps> = ({ children }) => {
  const [formRef, { hendleBlur, submit }] = useForm();

  const hendleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit();
  };

  return (
    <form
      ref={formRef}
      className={classes.root}
      action="/search/"
      tabIndex={-1}
      onSubmit={hendleSubmit}
      onBlur={hendleBlur}>
      {children}
    </form>
  );
};
