import classNames from "classnames";

export const convertClassNameToArray = (
  className?: string | classNames.ArgumentArray,
): classNames.ArgumentArray => {
  if (className === undefined) return [];

  if (typeof className === "string") {
    return className.split(" ");
  }

  return className;
};
