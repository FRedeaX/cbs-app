/* eslint-disable jsx-a11y/media-has-caption */
import classNames from "classnames";
import { FC } from "react";

import { Figure, FigureFigcaption } from "../../Figure";
import classes from "./Video.module.css";

export type VideoProps = {
  /**
   * HTML-якорь.
   */
  anchor?: string;
  /**
   * Подпись.
   */
  caption?: string;
  /**
   * Атрибут `autoplay`.
   * @default false
   */
  autoplay?: boolean;
  /**
   * Атрибут `controls`.
   * @default true
   */
  controls?: boolean;
  /**
   * Атрибут `loop`.
   * @default false
   */
  loop?: boolean;
  /**
   * Атрибут `muted`.
   * @default false
   */
  muted?: boolean;
  /**
   * Атрибут `playsInline`.
   * @default false
   */
  playsInline?: boolean;
  /**
   * Атрибут `poster`.
   */
  poster?: string;
  /**
   * Атрибут `preload`.
   * @default "metadata"
   */
  preload?: "none" | "metadata" | "auto";
  /**
   * Атрибут `src`.
   */
  src: string;
  /**
   * Дополнительный класс.
   */
  className: string | classNames.ArgumentArray;
};

export const Video: FC<VideoProps> = ({
  anchor,
  caption,
  autoplay = false,
  controls = true,
  loop = false,
  muted = false,
  playsInline = false,
  poster,
  preload = "metadata",
  src,
  className,
}) => (
  <div id={anchor || undefined} className={classNames(className)}>
    <Figure>
      <div
        className={classNames(
          classes.wrapper,
          classes[`wrapper_aspectRatio_16-9`],
        )}>
        <video
          className={classes.player}
          autoPlay={autoplay}
          controls={controls}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          poster={poster}
          preload={preload}
          src={src}
        />
      </div>
      {caption && <FigureFigcaption text={caption} />}
    </Figure>
  </div>
);
