/* eslint-disable no-param-reassign */
import classNamesBind from "classnames/bind";
import { memo } from "react";

// eslint-disable-next-line import/no-cycle
import NavItems from "../NavItems/NavItems";
import classes from "./Nav-list.module.css";

const NavList = ({
  id,
  data,
  isRight = false,
  headerLabel = false,
  subList = false,
  subLvl = 1,
  isSubListReset,
  className,
}) => {
  if (subList && subLvl === 4) subLvl = 1;
  if (subList && isSubListReset) subLvl = 2;

  const cx = classNamesBind.bind(classes);
  const classNameList = cx(
    {
      body: true,
      body_right: subList && isRight,
      body_margin_right: subList === 1 && isRight,
      body_row: !subList,

      subMenu: subList,

      "subMenu--lvl1": subLvl === 1 && isRight,
      "subMenu--lvl2": subLvl === 2,
      "subMenu--lvl3": subLvl === 3,
    },
    className,
  );

  const listOpenHendler = (event, isBack = false) => {
    event.stopPropagation();
    const { target } = event;
    if (isBack) {
      target.parentNode.parentNode.classList.remove(
        `${classes["subMenu-mobile--active"]}`,
      );
    } else {
      target.nextSibling.classList.add(`${classes["subMenu-mobile--active"]}`);
    }
  };

  const closeAllHendler = (event) => {
    event.stopPropagation();
    if (event.target.nodeName === "UL")
      document
        .querySelectorAll(`.${classes.subMenu}`)
        .forEach((node) =>
          node.classList.remove(`${classes["subMenu-mobile--active"]}`),
        );
  };

  return (
    <ul
      className={classNameList}
      onClick={closeAllHendler}
      onKeyPress={closeAllHendler}
      role="presentation">
      <NavItems
        data={data.nodes}
        subItem={subList}
        subLvl={subLvl}
        parentIdList={id}
        isRight={isRight}
        headerLabel={headerLabel}
        onClick={listOpenHendler}
      />
    </ul>
  );
};

export default memo(NavList);
