import { gql, makeVar } from "@apollo/client";
import { isFront } from "~/helpers";
import { delay } from "~/helpers/delay";

export const scrollYVar = isFront && makeVar(window.scrollY);

export const SCROLLY_FRAGMENT = isFront && "scrollY @client";
export const SCROLLY =
  isFront &&
  gql`
    query scrollY {
      ${SCROLLY_FRAGMENT}
    }
  `;

if (isFront) {
  let prevScrollY = 0;
  window.addEventListener("scroll", () => {
    delay(200).then(() => {
      const _scrollY = window.scrollY;
      if (prevScrollY !== _scrollY) {
        prevScrollY = _scrollY;
        scrollYVar(_scrollY);
      }
    });
  });
}
