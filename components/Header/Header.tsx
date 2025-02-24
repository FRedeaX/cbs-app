"use client";

import { FocusTrap } from "@mui/base/FocusTrap";
import { Backdrop } from "@mui/material";
import classNames from "classnames";
import { FC } from "react";

import { usePreventScroll, useToggle } from "@/helpers/frontend/hooks";
import { CSSProperties, Nullable } from "@/helpers/typings/utility-types";
import { Logo } from "@/components/Logo/Logo";
import { KeyDownAwayListener } from "@/base";
import { Banner } from "src/entities/Banner";

import { HeaderSearch } from "./Header.Search/Header.Search";
import classes from "./Header.module.css";
import HeaderSocial from "./HeaderSocial/HeaderSocial";
import NavList from "./NavList/NavList";
import { HeaderScroll } from "./components/Header.Scroll/Header.Scroll";
import { HeaderToggle } from "./components/Header.Toggle/Header.Toggle";
import { Menu } from "./type";

const sxBackdrop: CSSProperties = { zIndex: "calc(var(--header-z-index) - 1)" };

export type HeaderProps = {
  primary: Nullable<Menu>;
  secondary: Nullable<Menu>;
};

export const Header: FC<HeaderProps> = ({ primary, secondary }) => {
  const [isOpen, setIsOpen, { setFalse: setClose }] = useToggle();
  usePreventScroll({ enabled: isOpen });

  return (
    <>
      <header
        style={{
          paddingRight: isOpen ? `var(--scrollbar-width)` : "0",
        }}
        className={classNames(classes.block, classes.block_fixed)}>
        <HeaderScroll />
        <KeyDownAwayListener onKeyDownAway={setClose} keyboardCode={["Escape"]}>
          <FocusTrap open={isOpen}>
            <div className={classes.wrapper}>
              <div className={classes.logo}>
                <Logo />
              </div>
              <div className={classes.mobile}>
                <div className={classes.search}>
                  <HeaderSearch />
                </div>
                <HeaderSocial />
                <HeaderToggle isOpen={isOpen} onClick={setIsOpen} />
              </div>

              <div
                className={classNames(classes.menu, {
                  [classes.menu_mobile_active]: isOpen,
                })}>
                {primary?.length && (
                  <nav className={classes.primary}>
                    <NavList data={primary} />
                    <div className={classes.banner}>
                      <Banner width={346} height={36} />
                    </div>
                  </nav>
                )}
                <div className={classNames(classes.secondary)}>
                  <div className={classes.search}>
                    <HeaderSearch />
                  </div>
                  <HeaderSocial className={classes.Social_desktope} />
                  {secondary?.length && <NavList data={secondary} isRight />}
                </div>
              </div>
            </div>
          </FocusTrap>
        </KeyDownAwayListener>
      </header>
      <Backdrop sx={sxBackdrop} open={isOpen} onClick={setClose} />
    </>
  );
};
