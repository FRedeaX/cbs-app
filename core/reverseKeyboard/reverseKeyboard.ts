import * as keyboardMapping from "./keyboardMapping";

type ReverseDirections = "EngToRus" | "RusToEng";

export const reverseKeyboard = (
  text: string,
  directions: ReverseDirections,
): string =>
  text
    .split("")
    .map((letter) => keyboardMapping[directions][`${letter}`] ?? letter)
    .join("");
