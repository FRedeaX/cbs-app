import { useQuery } from "@apollo/client";
import classnames from "classnames";
import { useRouter } from "next/router";
import { memo, useCallback, useEffect, useRef } from "react";

import { GET_OVERLAY, overlayVar } from "../../../store/variables/overlay";
import classes from "./Overlay.module.css";

const Overlay = ({ isTouch = false }) => {
  const {
    data: {
      overlay: { isOpen, zIndex, opacity, color, isOverflow },
    },
  } = useQuery(GET_OVERLAY);
  const { asPath } = useRouter();

  const addStyle = useCallback(() => {
    if (isOverflow) {
      document.body.style.overflow = "hidden";
      document.body.style.marginRight = `var(--scrollbarWidth)`;
    }
  }, [isOverflow]);
  const removeStyle = useCallback(() => {
    document.body.style.overflow = "";
    document.body.style.marginRight = "";
  }, []);

  useEffect(() => {
    if (isOpen) addStyle();
    else removeStyle();
  }, [isOpen, addStyle, removeStyle]);

  // eslint-disable-next-line no-underscore-dangle
  const _overlay = useRef();
  useEffect(() => {
    _overlay.current = { zIndex, color };
  }, [isOpen, zIndex, color]);

  useEffect(() => {
    overlayVar({
      isOpen: false,
      zIndex: _overlay.current.zIndex,
      color: _overlay.current.color,
    });
  }, [asPath]);
  useEffect(() => {
    const keyEsc = (event) => {
      if (event.keyCode === 27) {
        overlayVar({
          isOpen: false,
          zIndex: _overlay.current.zIndex,
          color: _overlay.current.color,
        });
      }
    };
    window.addEventListener("keydown", keyEsc, false);
    return () => window.removeEventListener("keydown", keyEsc, false);
  }, []);

  // console.log("O_Render", { isOpen, zIndex, opacity, color });
  return (
    <div
      className={classnames(classes.overlay, {
        [classes["overlay--active"]]: isOpen,
        [classes[`opacity_${opacity}`]]: opacity !== undefined,
        // [classes[`color_${color}`]]:
        //   color !== undefined ? color : delay(300).then(() => color),
        [classes["touch--none"]]: isTouch,
      })}
      style={{
        zIndex,
        backgroundColor: color === undefined ? "var(--overlay-color)" : color,
      }}
      onClick={() =>
        overlayVar({
          isOpen: false,
          zIndex: _overlay.current.zIndex,
          color: _overlay.current.color,
        })
      }
      aria-hidden
    />
  );
};

export default memo(Overlay);
