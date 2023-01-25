import { Nullable } from "../../../helpers/typings/utility-types";

type ScrollBehavior = "auto" | "smooth";

type ScrollToOptions = {
  left: number;
  behavior: ScrollBehavior;
};

export const scrollTo = (
  node: Nullable<HTMLDivElement>,
  { left, behavior }: ScrollToOptions,
) => {
  if (node === null) return;

  node.scrollTo({ left, behavior });
};
