import { gql, makeVar } from "@apollo/client";

export const overlayVar = makeVar({
  isOpen: false,
  zIndex: undefined,
  opacity: undefined,
  color: "var(--overlay-color)",
  isOverflow: true,
});

export const GET_OVERLAY_FRAGMENT = "overlay @client";
export const GET_OVERLAY = gql`
  query GetOverlay {
    ${GET_OVERLAY_FRAGMENT}
  }
`;
