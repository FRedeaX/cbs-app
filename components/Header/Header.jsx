import { gql, useQuery } from "@apollo/client";
// import '@yandex/ui/esm/Button/Button.css';
import classNames from "classnames";
import { memo, useEffect, useRef, useState } from "react";

import { IS_HEADER_POS_RESET_FRAGMENT } from "../../store/variables/header";
import {
  GET_OVERLAY_FRAGMENT,
  overlayVar,
} from "../../store/variables/overlay";
import { SCROLLY_FRAGMENT } from "../../store/variables/scrollY";
import { GET_WIDTH_FRAGMENT } from "../../store/variables/windowWidth";
// import { isMobile as isMobileDevice } from "react-device-detect";
import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import SearchMobile from "../Search/mobile/Search.Mobile";
import Button from "../UI/Button/Button";
// import { scrollbarWidth } from 'helpers';
import classes from "./Header.module.css";
import HeaderSocial from "./HeaderSocial/HeaderSocial";
import NavList, { MenuGQL } from "./NavList/NavList";

export const FETCH_MENU = gql`
  query FetchMenu {
    menus {
      nodes {
        ...MenuGQL
      }
    }
  }
  ${MenuGQL.fragments}
`;

const Header = ({ menus }) => {
  const {
    data: state,
    // data: { windowWidth, overlay, scrollY, isHeaderPosReset },
  } = useQuery(gql`
    query {
      ${GET_WIDTH_FRAGMENT}
      ${GET_OVERLAY_FRAGMENT}
      ${IS_HEADER_POS_RESET_FRAGMENT}
      ${SCROLLY_FRAGMENT}
    }
  `);

  // const [isMobile, setMobile] = useState(false);

  const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    if (!state.overlay.isOpen) setOpen(false);
  }, [state?.overlay.isOpen]);

  const prevScrollYRef = useRef(0);
  const [isHeaderHidden, setHeaderHidden] = useState(false);
  useEffect(() => {
    if (
      state.scrollY > 80 &&
      prevScrollYRef.current !== 0 &&
      prevScrollYRef.current < state.scrollY &&
      !state.isHeaderHidden
    ) {
      setHeaderHidden(true);
    } else if (
      (state.scrollY === 0 || prevScrollYRef.current > state.scrollY) &&
      isHeaderHidden
    ) {
      setHeaderHidden(false);
    }
    prevScrollYRef.current = state.scrollY;
  }, [state?.scrollY, state?.isHeaderHidden, isHeaderHidden]);

  // console.log(isHeaderHidden);
  if (!menus) return null;
  return (
    <header
      style={{ right: state?.isHeaderPosReset ? `var(--scrollbarWidth)` : "0" }}
      className={classNames(classes.block, classes.position, {
        [classes["position--hidden"]]: isHeaderHidden,
      })}>
      {/* {console.log("H_Render")} */}
      <div className={classes.wrapper}>
        <div className={classes.logo}>
          <Logo />
        </div>
        <div
          className={classNames(classes.menu, {
            [classes.menu_mobile_active]: isOpen,
          })}>
          <nav className={classes.primary}>
            {menus && menus[0]?.menuItems && (
              <NavList data={menus[0].menuItems} />
            )}
          </nav>
          <div className={classNames(classes.secondary)}>
            <div className={classes.search}>
              <Search />
            </div>
            <HeaderSocial className={classes.Social_desktope} />
            {menus && menus[1]?.menuItems && (
              <NavList data={menus[1].menuItems} isRight />
            )}
          </div>
        </div>
        <div className={classes.mobile}>
          <div className={classes.search}>
            <SearchMobile />
          </div>
          <HeaderSocial />
          <Button
            className={classNames(classes.controls_button, {
              [classes["controls_button--active"]]: isOpen,
            })}
            onClick={() => {
              overlayVar({ isOpen: !isOpen, zIndex: 2, isOverflow: true });
              setOpen(!isOpen);
            }}>
            <span className={classes.inner} />
          </Button>
        </div>
      </div>
    </header>
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

export default memo(Header);
