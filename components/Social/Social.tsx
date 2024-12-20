import classNames from "classnames";
import { FC } from "react";

import classes from "./Social.module.css";

type SocialProps = {
  type: "youtube" | "vk" | "ok" | "fb" | "litres";
  url: string;
  cls?: string;
  clsLink?: string;
  clsSVG?: string;
  ariaLabel: string;
};

const Social: FC<SocialProps> = ({
  type,
  url,
  cls,
  clsLink,
  clsSVG,
  ariaLabel,
}) => (
  <a
    className={classNames(classes.link, cls, clsLink)}
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={ariaLabel}>
    {type !== "youtube" && type !== "litres" && (
      <svg
        className={classNames(classes.svg, classes[`svg--${type}`], clsSVG)}
        viewBox="0 0 28 28">
        {type === "fb" && (
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.5 25v-9.46H7v-4.176h3.5V8.422C10.5 5.596 11.808 3 15.985 3c1.691 0 2.948.163 2.948.163V7.01h-2.712c-1.171 0-1.627.9-1.627 1.991v2.364H19l-.564 4.176h-3.842V25H10.5z"
          />
        )}
        {type === "vk" && (
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M23.23 16.416c1.502 1.631 2.492 2.96 2.556 3.068.795 1.352-.88 1.455-.88 1.455l-3.204.048s-.69.14-1.596-.5c-1.202-.836-2.33-3.023-3.214-2.743-.89.291-.864 2.263-.864 2.263s.005.345-.195.57c-.222.238-.654.216-.654.216h-1.438s-3.167.27-5.954-2.698c-3.04-3.238-5.722-9.62-5.722-9.62s-.153-.405.01-.61c.19-.226.706-.236.706-.236l3.43-.016s.322.059.554.231c.19.14.3.41.3.41s.553 1.438 1.286 2.73c1.433 2.532 2.102 3.087 2.587 2.818.711-.399.495-3.577.495-3.577s.016-1.158-.358-1.675c-.285-.393-.822-.512-1.064-.544-.195-.027.126-.485.537-.69.616-.307 1.707-.328 2.993-.312 1 .01 1.29.075 1.68.172 1.186.291.785 1.417.785 4.12 0 .868-.152 2.085.459 2.49.263.172.906.026 2.508-2.764.764-1.325 1.333-2.876 1.333-2.876s.126-.28.321-.399c.2-.118.47-.08.47-.08l3.608-.028s1.08-.129 1.26.372c.184.523-.406 1.75-1.881 3.76-2.424 3.296-2.355 3.013-.853 4.645z"
          />
        )}
        {type === "ok" && (
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.956 15.133c-3.32-.011-6.042-2.76-6.023-6.08A6.08 6.08 0 0114.028 3c3.36.01 6.055 2.753 6.039 6.145-.018 3.314-2.758 6-6.111 5.988zm3.016-6.071a2.957 2.957 0 00-2.968-2.963 2.961 2.961 0 00-2.975 2.999 2.957 2.957 0 002.99 2.94 2.95 2.95 0 002.953-2.976zM8.02 18.179c.977.77 2.07 1.221 3.257 1.488l-2.7 2.725c-.275.276-.472.584-.491.988-.029.596.338 1.19.915 1.471.543.266 1.1.182 1.567-.283a203.4 203.4 0 003.097-3.134c.255-.265.394-.322.683-.018.667.704 1.352 1.39 2.038 2.077.334.335.668.67 1 1.007.264.268.562.46.944.486.602.042 1.216-.347 1.49-.938.252-.54.157-1.116-.3-1.581-.85-.867-1.705-1.73-2.56-2.593l-.239-.241c.496-.107 1.006-.235 1.357-.372.965-.377 1.833-.918 2.555-1.665.47-.487.475-1.099.093-1.726-.334-.55-.915-.78-1.538-.62-.32.084-.597.247-.855.447-2.61 1.77-6.183 1.72-8.783-.081a2.824 2.824 0 00-.4-.239c-.722-.343-1.415-.183-1.829.414-.483.698-.422 1.375.19 1.966.125.123.265.231.404.34l.105.082z"
          />
        )}
        {/* <use href={`#${type}--inline`} /> */}
      </svg>
    )}
    {type === "youtube" && (
      <svg
        className={classNames(clsSVG, classes[`svg--${type}`], classes.svg)}
        viewBox="0 0 18 18">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.105 3.507c.54.583.715 1.907.715 1.907S18 6.968 18 8.522v1.456c0 1.554-.18 3.108-.18 3.108s-.176 1.323-.715 1.905c-.618.689-1.302.76-1.688.8l-.116.014c-2.519.193-6.301.2-6.301.2s-4.68-.046-6.12-.194a3.816 3.816 0 00-.244-.036c-.456-.059-1.172-.15-1.74-.785-.54-.582-.716-1.905-.716-1.905S0 11.532 0 9.977V8.521c0-1.553.18-3.107.18-3.107S.356 4.09.895 3.507c.62-.691 1.418-.773 1.804-.812.04-.004-.034.004 0 0C5.217 2.5 8.995 2.5 8.995 2.5h.009s3.778 0 6.297.195l.112.012c.386.04 1.072.109 1.692.8zm-4.726 5.745l-5.627 3.376V5.876l5.627 3.376z"
        />
        {/* <use href={`#${type}--inline`} /> */}
      </svg>
    )}
    {type === "litres" && (
      <svg
        className={classNames(classes.svg, classes[`svg--${type}`], clsSVG)}
        viewBox="0 0 273.2 273.2">
        <rect
          x="-.4"
          width="273.2"
          height="273.2"
          rx="65.55"
          ry="65.55"
          fill="#fff"
        />
        <path
          d="m180.18 76.47-.43.55c-8.6 10.85-25.14 10.62-33.43-.46-.49-.66-1.53-.31-1.53.51v109.86c0 .3.13.6.35.8 10.05 9.16 25.34 9.37 35.64.51l.57-.49c.25-.21.39-.52.39-.85V77.03c0-.83-1.05-1.19-1.56-.54ZM128 76.47l-.43.55c-8.6 10.85-25.14 10.62-33.43-.46-.49-.66-1.53-.31-1.53.51v109.86c0 .3.13.6.35.8 10.04 9.16 25.34 9.37 35.64.51l.57-.49c.25-.21.39-.52.39-.85V77.03c0-.83-1.04-1.19-1.56-.54Z"
          fill="#f50"
        />
        <path
          d="m92.6 138.9.4.51c9.4 11.87 27.49 11.62 36.56-.51v49.92c0 .3-.13.6-.35.8-10.05 9.16-25.34 9.37-35.64.51l-.57-.49c-.25-.21-.39-.52-.39-.85v-49.88Z"
          fill="#3d3dc7"
        />
        <path
          d="m144.78 112.5.4.51c9.4 11.87 27.49 11.62 36.56-.51v76.82c0 .31-.13.6-.35.8-10.04 9.15-25.34 9.37-35.64.51l-.57-.49c-.25-.21-.39-.52-.39-.85v-76.78Z"
          fill="#0a1e78"
        />
        <path
          d="M214.05 114.64c-6.53-.69-12.31 1.38-17.35 6.19-.38.36-.58.87-.58 1.39v64.08c0 .52.2 1.02.58 1.38 8.85 8.5 23.02 8.45 31.81-.02.37-.36.57-.86.57-1.38v-7.1c5.08.07 12-2.04 12-8.11v-34.94c0-5.9-6.54-8.05-11.53-8.11 0-53-29.47-99.57-93.49-99.57S43.6 75.52 43.6 128.03c-4.87.2-11.01 2.36-11.01 8.08v34.97c0 5.9 6.54 8.04 11.52 8.1v7.12c0 .52.2 1.02.58 1.38 8.85 8.5 23.02 8.45 31.81-.02.37-.36.57-.86.57-1.38v-64.01c0-.52-.2-1.02-.58-1.38-5.08-4.88-10.9-6.95-17.46-6.23 1.04-36.15 30.04-74.08 77.02-74.08 49.57 0 77.99 38.43 77.99 74.07Z"
          fill="#f50"
        />
        <path
          d="M58.52 222.97c-.22 3.31-.47 6.47-1.83 7.84-.54.5-1.4.79-2.44.79h-.93v5.18c.58.04 1.76.07 2.77.07 2.16 0 3.81-.47 5.03-1.37 2.66-2.23 3.13-7.37 3.45-12.51.07-.93.22-4.89.32-6.9h10.86v20.53h6.4v-25.92H58.93c-.07 2.95-.29 9.67-.4 12.29ZM113.8 220.16h9.49v16.43h5.76v-16.43h9.49v-5.21H113.8v5.21zM93.35 214.99h-5.82v22.68l17.61-13.09v12.01h5.82v-22.68l-17.61 13.05v-11.97z"
          fill="#0a1e78"
        />
        <path
          d="M155.54 214.3c-3.59 0-6.43 1.04-8.27 4.39-.07.07-.14.04-.14-.04l-.11-3.7h-5.61v29.12h5.75v-10.89c0-.07.11-.11.14-.04 1.83 2.66 4.71 3.95 8.23 3.95 6.47 0 10.78-4.57 10.78-11.4s-4.31-11.4-10.78-11.4Zm-1.73 17.58c-3.95 0-6.65-2.52-6.65-6.18s2.7-6.15 6.65-6.15 6.47 2.26 6.47 6.15-2.41 6.18-6.47 6.18ZM181.78 214.3c-7.8 0-12.55 4.24-12.55 11.25 0 7.73 4.31 11.5 13.08 11.5 4.21 0 8.09-.65 10.96-1.8v-5.21c-2.44 1.15-7.12 2.05-10.93 2.05-4.46 0-6.82-1.52-7.36-4.67h18.86c.04-.32.07-.83.07-1.37 0-3.81-1.51-11.75-12.15-11.75Zm-.04 4.75c3.59 0 5.9 1.61 6.64 4.6h-13.36c.53-3.1 2.72-4.6 6.72-4.6ZM196.81 225.66c0 7.26 4.57 11.4 12.69 11.4 3.67 0 6.61-.54 9.56-1.62v-5.57c-3.02 1.33-6 1.87-9.56 1.87-4.39 0-6.65-2.01-6.65-6.08s2.26-6.08 6.65-6.08c3.63 0 7.12.75 9.6 1.91v-5.68c-2.84-.97-5.79-1.55-9.6-1.55-8.12 0-12.69 4.13-12.69 11.4Z"
          fill="#f50"
        />
      </svg>
    )}
  </a>
);
export default Social;
