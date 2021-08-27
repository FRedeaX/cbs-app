import { gql, makeVar } from "@apollo/client";
import { isFront } from "~/helpers";
import { delay } from "~/helpers/delay";

export const windowWidthVar = isFront
  ? makeVar(window.innerWidth)
  : makeVar(1600);

export const GET_WIDTH_FRAGMENT = isFront && "windowWidth @client";
export const GET_WIDTH = gql`
    query GetWidth {
      ${GET_WIDTH_FRAGMENT}
    }
  `;

if (typeof window !== "undefined") {
  window.addEventListener(
    "resize",
    () => delay(350).then(() => windowWidthVar(window.innerWidth))
    // throttler(() => windowWidthVar(window.innerWidth), 350)
  );
}
