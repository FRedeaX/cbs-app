import FocusTrap from "@mui/base/FocusTrap";
import { Backdrop } from "@mui/material";
import classNames from "classnames";
import { FC } from "react";

import { KeyDownAwayListener } from "../../base";
import { usePreventScroll, useToggle } from "../../helpers/frontend/hooks";
import { CSSProperties, Maybe } from "../../helpers/typings/utility-types";
import Logo from "../Logo/Logo";
import { HeaderSearch } from "./Header.Search/Header.Search";
import classes from "./Header.module.css";
import HeaderSocial from "./HeaderSocial/HeaderSocial";
import NavList from "./NavList/NavList";
import { HeaderScroll } from "./components/Header.Scroll/Header.Scroll";
import { HeaderToggle } from "./components/Header.Toggle/Header.Toggle";

const sxBackdrop: CSSProperties = { zIndex: "calc(var(--header-z-index) - 1)" };

type MenuItems = {
  menuItems: {
    nodes: [
      {
        childItems: {
          nodes: MenuItems[];
        };
        id: string;
        label: string;
        path: string;
        parentId: boolean;
      },
    ];
  };
};

type HeaderProps = {
  menus: Maybe<MenuItems[]>;
};

const Header: FC<HeaderProps> = ({ menus }) => {
  const [isOpen, setIsOpen, { setFalse: setClose }] = useToggle();
  usePreventScroll({ enabled: isOpen });

  if (!menus) return null;
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
                <nav className={classes.primary}>
                  {menus[0]?.menuItems && <NavList data={menus[0].menuItems} />}
                </nav>
                <div className={classNames(classes.secondary)}>
                  <div className={classes.search}>
                    <HeaderSearch />
                  </div>
                  <HeaderSocial className={classes.Social_desktope} />
                  {menus[1]?.menuItems && (
                    <NavList data={menus[1].menuItems} isRight />
                  )}
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

// function areEqual(prevProps, nextProps) {
//   // console.log(prevProps.location, nextProps.location);
//   console.log(prevProps.isHeaderHidden);
//   if (prevProps.isHeaderHidden !== nextProps.isHeaderHidden) {
//     console.log("changeProps");
//     return false;
//   } else return true;
//   /*
//   возвращает true, если nextProps рендерит
//   тот же результат что и prevProps,
//   иначе возвращает false
//   */
// }

export default Header;
