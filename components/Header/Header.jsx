import { gql, useQuery } from "@apollo/client";
import classNames from "classnames";
import { useCallback, useEffect, useRef, useState } from "react";

import { useClientScroll, useToggle } from "../../helpers/frontend/hooks";
import {
  GET_OVERLAY_FRAGMENT,
  overlayVar,
} from "../../store/variables/overlay";
import Logo from "../Logo/Logo";
import Button from "../UI/Button/Button";
import { HeaderSearch } from "./Header.Search/Header.Search";
import classes from "./Header.module.css";
import { MenuGQL } from "./Header.utils/menuGQL";
import HeaderSocial from "./HeaderSocial/HeaderSocial";
import NavList from "./NavList/NavList";

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
    // data: { overlay },
  } = useQuery(gql`
    query {
      ${GET_OVERLAY_FRAGMENT}
    }
  `);
  // const [] = useToggle();

  const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    if (!state.overlay.isOpen) setOpen(false);
  }, [state?.overlay.isOpen]);

  const currentScroll = useClientScroll();
  const prevScrollYRef = useRef(0);
  const [isHeaderHidden, setIsHeaderHidden] = useToggle();
  useEffect(() => {
    if (
      currentScroll > 80 &&
      prevScrollYRef.current !== 0 &&
      prevScrollYRef.current < currentScroll &&
      !isHeaderHidden
    ) {
      // Скрываем
      setIsHeaderHidden();
    } else if (
      (currentScroll === 0 || prevScrollYRef.current > currentScroll) &&
      isHeaderHidden
    ) {
      // Показываем
      setIsHeaderHidden();
    }
    prevScrollYRef.current = currentScroll;
  }, [currentScroll, isHeaderHidden, setIsHeaderHidden]);

  const hendleOpenMenu = useCallback(() => {
    overlayVar({ isOpen: !isOpen, zIndex: 2, isOverflow: true });
    setOpen(!isOpen);
  }, [isOpen]);

  if (!menus) return null;
  return (
    <header
      style={{
        paddingRight: isOpen ? `var(--scrollbar-width)` : "0",
      }}
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
              <HeaderSearch />
            </div>
            <HeaderSocial className={classes.Social_desktope} />
            {menus && menus[1]?.menuItems && (
              <NavList data={menus[1].menuItems} isRight />
            )}
          </div>
        </div>
        <div className={classes.mobile}>
          <div className={classes.search}>
            <HeaderSearch />
          </div>
          <HeaderSocial />
          <Button
            className={classNames(classes.controls_button, {
              [classes["controls_button--active"]]: isOpen,
            })}
            onClick={hendleOpenMenu}>
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

export default Header;
