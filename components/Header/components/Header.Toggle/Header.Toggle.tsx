import { IconButton } from "@mui/material";
import classNames from "classnames";
import { FC } from "react";

import { Void } from "../../../../helpers/typings/utility-types";
import classes from "./Header.Toggle.module.css";

type HeaderToggleProps = {
  isOpen: boolean;
  onClick: Void;
};

export const HeaderToggle: FC<HeaderToggleProps> = ({ isOpen, onClick }) => (
  <IconButton onClick={onClick}>
    <div
      className={classNames(classes.root, {
        [classes["root--active"]]: isOpen,
      })}>
      <span className={classes.inner} />
    </div>
  </IconButton>
);
