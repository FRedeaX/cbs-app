"use client";

import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { FormHelperText } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FC, useCallback } from "react";
import { object, string } from "yup";

import { useUpdatePost } from "../api/updatePostGQL";

import classes from "./EditTitleAndExcerpt.module.css";
import { ErrorAlert } from "./ErrorAlert";
import { InputExcerpt } from "./InputExcerpt";
import { InputTitle } from "./InputTitle";

const Schema = object().shape({
  title: string().required("Заголовок - обязательное поле"),
  excerpt: string(),
});

type EditTitleAndExcerptProps = {
  id: string | number;
  title: string;
  excerpt: string;
  buttonProps?: Pick<LoadingButtonProps, "sx">;
};

export const EditTitleAndExcerpt: FC<EditTitleAndExcerptProps> = ({
  id,
  title,
  excerpt,
  buttonProps,
}) => {
  const { error, trigger } = useUpdatePost();

  const onSubmit = useCallback(
    async (value: Pick<EditTitleAndExcerptProps, "title" | "excerpt">) => {
      await trigger({
        id,
        title: value.title,
        excerpt: value.excerpt,
      });
    },
    [id, trigger],
  );

  return (
    <>
      <Formik
        initialValues={{ title, excerpt }}
        validationSchema={Schema}
        onSubmit={onSubmit}>
        {({ errors, isSubmitting }) => (
          <Form className={classes.root}>
            <Field name="title" as={InputTitle} />
            <ErrorMessage name="title">
              {(msg) => <FormHelperText error>{msg}</FormHelperText>}
            </ErrorMessage>
            <Field name="excerpt" as={InputExcerpt} />
            <div sx={{ marginTop: "auto" }}>
              <LoadingButton
                type="submit"
                loading={isSubmitting}
                disabled={!!errors.title}
                fullWidth
                size="small"
                variant="outlined"
                color={error ? "error" : "primary"}
                sx={{ marginTop: 1, ...buttonProps?.sx }}>
                <span>{error ? "Ошибка. Повторить" : "Сохранить"}</span>
              </LoadingButton>
            </div>
          </Form>
        )}
      </Formik>
      {error && <ErrorAlert error={error} />}
    </>
  );
};
