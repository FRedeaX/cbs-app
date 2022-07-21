type focalPointType = { x: number; y: number };

interface IObjectPosition {
  focalPoint: string | null;
}

export const objectPosition = ({
  focalPoint,
}: IObjectPosition): string | undefined => {
  if (focalPoint !== null) {
    const { x, y }: focalPointType = JSON.parse(focalPoint);
    if (x && y) return `${x * 100}% ${y * 100}%`;
  }

  return undefined;
};
