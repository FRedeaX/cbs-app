import { Nullable } from "../../../../helpers/typings/utility-types";

type focalPointType = { x: number; y: number };

interface IObjectPosition {
  focalPoint?: Nullable<string>;
}

export const getObjectPosition = ({
  focalPoint,
}: IObjectPosition): string | undefined => {
  if (focalPoint !== null && focalPoint !== undefined) {
    const { x, y }: focalPointType = JSON.parse(focalPoint);
    if (x && y) return `${x * 100}% ${y * 100}%`;
  }
  return undefined;
};
