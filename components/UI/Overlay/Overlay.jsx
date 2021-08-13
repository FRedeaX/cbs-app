import { useQuery } from "@apollo/client";
import classnames from "classnames";
import { memo, useEffect, useRef } from "react";
import { scrollbarWidth } from "~/helpers";
import { GET_OVERLAY, overlayVar } from "~/store/variables/overlay";
import classes from "./Overlay.module.css";

const Overlay = ({ isTouch = false }) => {
  const {
    data: {
      overlay: { isOpen, zIndex, opacity, color, isOverflow },
    },
  } = useQuery(GET_OVERLAY);

  useEffect(() => {
    if (isOpen) addStyle();
    else removeStyle();
  }, [isOpen]);

  const addStyle = () => {
    if (isOverflow) document.body.style.overflow = "hidden";
    if (scrollbarWidth !== 0)
      document.body.style.marginRight = `${scrollbarWidth}px`;
  };
  const removeStyle = () => {
    document.body.style.overflow = "";
    document.body.style.marginRight = "";
  };

  const _overlay = useRef();
  useEffect(() => {
    _overlay.current = { zIndex, color };
  }, [isOpen, zIndex, color]);

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
    />
  );
};

export default memo(Overlay);
