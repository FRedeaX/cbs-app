import classNames from "classnames";
import { forwardRef, memo } from "react";
import classes from "./Button.module.css";

const Button = forwardRef(
  (
    {
      className,
      href,
      onClick,
      type = "button",
      view = "default",
      target = "",
      isDisabled = false,
      isHidden = false,
      checked = false,
      isTextCenter = false,
      theme = undefined,
      width,
      iconLeft,
      icon,
      iconRight,
      children,
      ariaLabel,
      title,
    },
    ref
  ) => {
    switch (view) {
      case "link":
        return (
          <a
            className={classNames(
              classes.button,
              classes.link,
              {
                [classes[`theme_${theme}`]]: theme !== undefined,
                [classes["theme_gray_active"]]: checked,

                [classes["width_max"]]: width === "max",
                [classes["padding"]]: children,

                [classes["padding_icon_left"]]: iconLeft && !isTextCenter,
                [classes["padding_icon_right"]]: iconRight && !isTextCenter,
              },
              className
            )}
            href={href}
            target={target}
            aria-label={ariaLabel}
            title={title}
            onClick={onClick}
            ref={ref}
          >
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
                [classes["padding"]]: children,
                [classes["icon"]]: icon,
              },
              className
            )}
            href={href}
            aria-label={ariaLabel}
            download=""
          >
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
                [classes["width_max"]]: width === "max",
                [classes["padding_icon_left"]]: iconLeft && !isTextCenter,
                [classes["padding_icon_right"]]: iconRight && !isTextCenter,
                [classes["hidden"]]: isHidden,
                [classes["icon"]]: icon,
              },
              className
            )}
            type={type}
            onClick={onClick}
            disabled={isDisabled}
            aria-label={ariaLabel}
            title={title}
            ref={ref}
          >
            {iconLeft && iconLeft}
            {icon && icon}
            {children}
            {iconRight && iconRight}
          </button>
        );
    }
  }
);

export default memo(Button);
