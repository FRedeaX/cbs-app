import { gql, makeVar } from "@apollo/client";

export const isHeaderPosResetVar = makeVar(false);

export const IS_HEADER_POS_RESET_FRAGMENT = "isHeaderPosReset @client";
export const IS_HEADER_POS_RESET = gql`
  query GetWidth {
    ${IS_HEADER_POS_RESET_FRAGMENT}
  }
`;
