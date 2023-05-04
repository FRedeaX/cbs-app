import { FC } from "react";

type SpacerProps = {
  /**
   * HTML-якорь.
   */
  anchor?: string;
  height: string;
};

export const Spacer: FC<SpacerProps> = ({ anchor, height }) => (
  <div is={anchor || undefined} style={{ height }} aria-hidden="true" />
);
