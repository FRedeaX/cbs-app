import classNames from "classnames";

import classes from "./Social.module.css";

const Social = ({ type, url, cls, clsLink, clsSVG, ariaLabel }) => (
  <a
    className={classNames(classes.link, cls, clsLink)}
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={ariaLabel}>
    {type !== "youtube" && (
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
  </a>
);
export default Social;
