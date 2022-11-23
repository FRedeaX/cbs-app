import { useRouter } from "next/router";
import { FocusEvent, useCallback, useRef } from "react";

import { omit } from "../../../../helpers/omit";
import { Nullable, Void } from "../../../../helpers/typings/utility-types";

export type HendleBlur = FocusEvent<HTMLFormElement>;
interface IFormElements {
  elements: {
    text: {
      value: string;
    };
  };
}

type FormRefNode = Nullable<{ current: HTMLFormElement & IFormElements }>;
type UseFormResult = [
  FormRefNode,
  {
    submit: Void;
    hendleBlur: (event: HendleBlur) => void;
  },
];

export const useForm = (): UseFormResult => {
  const { query, push: routerPush } = useRouter();
  const formRef = useRef<FormRefNode>(null);

  const submit = useCallback<Void>(() => {
    if (!formRef.current) return;
    const { value } = formRef.current.elements.text;

    routerPush({
      query: value ? { ...query, text: value } : omit(query, ["text"]),
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hendleBlur = useCallback(
    ({ target, currentTarget, relatedTarget }: HendleBlur) => {
      // console.log("before");
      // console.log({ target, currentTarget, relatedTarget });

      if (currentTarget.contains(target)) return;
      if (relatedTarget && currentTarget.contains(relatedTarget)) return;
      // console.log("after");
      submit();
    },
    [submit],
  );

  return [formRef, { submit, hendleBlur }];
};
