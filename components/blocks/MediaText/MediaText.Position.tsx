import { FC, FunctionComponent } from "react";

interface IMediaTextPosition {
  mediaPosition: mediaPositionType;
  Media: FunctionComponent;
  Text: FunctionComponent;
}

const MediaTextPosition: FC<IMediaTextPosition> = ({
  mediaPosition,
  Media,
  Text,
}) => {
  if (mediaPosition === "left") {
    return (
      <>
        <Media />
        <Text />
      </>
    );
  }

  return (
    <>
      <Text />
      <Media />
    </>
  );
};

export default MediaTextPosition;
