import classNames from "classnames";
import { forwardRef, memo, ReactNode } from "react";

import classes from "./Button.module.css";

interface IButton {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  view: string;
  target: string;
  isDisabled: boolean;
  isHidden: boolean;
  checked: boolean;
  theme?: string;
  width?: string;
  iconLeft?: JSX.Element;
  icon?: JSX.Element;
  iconRight?: JSX.Element;
  ariaLabel?: string;
  title?: string;
}

// interface ReactLinkElement extends HTMLLinkElement {
//   ref: LegacyRef<HTMLButtonElement> | undefined;
// }

const Button = forwardRef<HTMLButtonElement | any, IButton>(
  (
    {
      children,
      className,
      href,
      onClick,
      // type = "button",
      view = "default",
      target = "",
      isDisabled = false,
      isHidden = false,
      checked = false,
      theme,
      width,
      iconLeft,
      icon,
      iconRight,
      ariaLabel,
      title,
    },
    ref,
  ) => {
    switch (view) {
      case "link":
        return (
          <a
            className={classNames(
              classes.button,
              classes.link,
              {
                [classes[`theme_${theme}`]]:
                  theme !== undefined && theme !== null,
                [classes.theme_gray_active]: checked,

                [classes.width_max]: width === "max",
                [classes.padding]: children,

                // [classes["padding_icon_left"]]: iconLeft && !isTextCenter,
                // [classes["padding_icon_right"]]: iconRight && !isTextCenter,
              },
              className,
            )}
            href={href}
            target={target}
            aria-label={ariaLabel}
            title={title}
            onClick={onClick}
            ref={ref}>
            {iconLeft && iconLeft}
            {children}
            {iconRight && iconRight}
          </a>
        );

      case "download":
        return (
          <a
            className={classNames(
              classes.button,
              classes.link,
              {
                [classes.padding]: children,
                [classes.icon]: icon,
              },
              className,
            )}
            href={href}
            aria-label={ariaLabel}
            download
            target="_blank"
            rel="noreferrer">
            {iconLeft && iconLeft}
            {icon && icon}
            {children}
            {iconRight && iconRight}
          </a>
        );

      default:
        return (
          <button
            className={classNames(
              classes.button,
              {
                [classes[`theme_${theme}`]]:
                  theme !== undefined && theme !== null,
                [classes.width_max]: width === "max",
                [classes.padding]: children,
                // [classes["padding_icon_left"]]: iconLeft && !isTextCenter,
                // [classes["padding_icon_right"]]: iconRight && !isTextCenter,
                [classes.hidden]: isHidden,
                [classes.icon]: icon,
              },
              className,
            )}
            type="button"
            onClick={onClick}
            disabled={isDisabled}
            aria-label={ariaLabel}
            data-href={href}
            title={title}
            ref={ref}>
            {iconLeft && iconLeft}
            {icon && icon}
            {children}
            {iconRight && iconRight}
          </button>
        );
    }
  },
);

Button.displayName = "Button";
export default memo(Button);
