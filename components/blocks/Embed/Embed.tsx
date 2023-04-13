import classNames from "classnames";
import { FC } from "react";

import { createMarkup } from "../../../helpers";
import { Nullable } from "../../../helpers/typings/utility-types";
import { Figure, FigureFigcaption } from "../../Figure";
import classes from "./Embed.module.css";

type EmbedProps = {
  /**
   * HTML-якорь.
   */
  anchor?: string;
  aspectRatio: string;
  url: string;
  html?: Nullable<string>;
  /**
   * Подпись.
   */
  caption?: string;
  className?: string | classNames.ArgumentArray;
};

export const Embed: FC<EmbedProps> = ({
  anchor,
  aspectRatio,
  url,
  html,
  caption,
  className,
}) => (
  <div id={anchor || undefined} className={classNames(className)}>
    <Figure>
      <div
        className={classNames(
          classes.wrapper,
          classes[`wrapper_aspectRatio_${aspectRatio}`],
        )}
        dangerouslySetInnerHTML={createMarkup(html)}>
        {html ? null : (
          <iframe
            loading="lazy"
            width="560"
            height="315"
            src={url}
            title="Видеоплеер"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
      {caption && <FigureFigcaption text={caption} />}
    </Figure>
  </div>
);
