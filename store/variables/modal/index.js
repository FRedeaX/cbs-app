import { gql, makeVar } from "@apollo/client";

export const modalVar = makeVar(null);

export const MODAL_FRAGMENT = "modal @client";
export const MODAL = gql`
  query GetModal {
    ${MODAL_FRAGMENT}
  }
`;
