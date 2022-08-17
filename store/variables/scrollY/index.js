import { gql, makeVar } from "@apollo/client";

import { isFront } from "../../../helpers";

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
    const { scrollY } = window;
    if (prevScrollY !== scrollY) {
      prevScrollY = scrollY;
      scrollYVar(scrollY);
    }
  });
}
