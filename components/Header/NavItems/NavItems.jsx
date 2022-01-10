/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import { gql } from "@apollo/client";
import classNames from "classnames";
import classNamesBind from "classnames/bind";
import { memo } from "react";

import { createMarkup } from "../../../helpers";
import { overlayVar } from "../../../store/variables/overlay";
import ActiveLink from "../../UI/ActiveLink/ActiveLink";
import Button from "../../UI/Button/Button";
import Icon from "../../UI/Icon/Icon";
// eslint-disable-next-line import/no-cycle
import NavList from "../NavList/NavList";
import classes from "./Nav-item.module.css";

const NavItems = ({
  data,
  subItem,
  subLvl,
  parentIdList,
  // className,
  isRight,
  headerLabel,
  onClick,
}) => {
  const cx = classNamesBind.bind(classes);
  const liLvl = subLvl;
  // console.log("I_Render");
  return (
    <>
      {headerLabel && (
        <li className={classes.li_header}>
          <Button
            width="max"
            isTextCenter
            iconLeft={
              <Icon
                type="arrow"
                size="xs"
                side="left"
                direction="left"
                weight="small"
                // className={classes["icon_width"]}
              />
            }
            // className={classes.button}
            onClick={(event) => onClick(event, true)}>
            <span
              style={{ width: "100%" }}
              className={classes.text}
              dangerouslySetInnerHTML={createMarkup(headerLabel)}
            />
          </Button>
        </li>
      )}
      {data.map(({ id, parentId, label, path, childItems }) => {
        // eslint-disable-next-line no-param-reassign
        if (!!childItems?.nodes.length && subItem) subLvl += 1;

        return (
          <li
            key={id}
            className={classNames(classes.li, {
              [classes.li_right]: isRight,
              [classes.li_overlay]:
                !!childItems?.nodes.length && parentId === parentIdList,

              [classes[`li-left_lvl_${liLvl}`]]: subItem && !isRight,
              [classes["li-left_lvl_0"]]:
                !!childItems?.nodes.length && !subItem && !isRight,

              [classes["li-left_length_1"]]: data.length === 1 && !isRight,

              [classes[`li-right_lvl_${liLvl}`]]: subItem && isRight,
              [classes["li-right_lvl_0"]]:
                !!childItems?.nodes.length && !subItem && isRight,
            })}>
            {childItems?.nodes.length > 0 ? (
              <ActiveLink
                activeClassName={classes.link_active}
                href={path}
                isLink={false}>
                <Button
                  width="max"
                  iconRight={
                    <Icon
                      type="arrow"
                      size="xs"
                      side="right"
                      direction="right"
                      weight="small"
                    />
                  }
                  className={classes.button}
                  onClick={onClick}>
                  <span
                    className={classes.text}
                    dangerouslySetInnerHTML={createMarkup(label)}
                  />
                </Button>
              </ActiveLink>
            ) : (
              <>
                {path === "/elcatalog/" ? (
                  <a
                    href={path}
                    className={classes.link}
                    target="_blank"
                    rel="noreferrer noopener">
                    <span className={classes.text}>{label}</span>
                  </a>
                ) : (
                  <ActiveLink
                    activeClassName={classes.link_active}
                    href={path}
                    prefetch={false}>
                    <a
                      className={cx({
                        link: true,
                        "link--cursor": !!childItems?.nodes.length,
                      })}
                      onClick={() => overlayVar({ isOpen: false })}>
                      <span
                        className={cx({ text: true, text_mb: subItem })}
                        dangerouslySetInnerHTML={createMarkup(label)}
                      />
                    </a>
                  </ActiveLink>
                )}
              </>
            )}
            {!!childItems?.nodes.length && (
              <NavList
                id={!parentIdList && id}
                data={childItems}
                direction="column"
                subList
                subLvl={subItem ? subLvl : 1}
                isSubListReset={parentIdList && parentIdList === parentId}
                isRight={isRight}
                headerLabel={!!childItems?.nodes.length && label}
              />
            )}
          </li>
        );
      })}
    </>
  );
};

export default memo(NavItems);

export const menuItemsGQL = {
  fragments: gql`
    fragment menuItemsGQL on MenuItem {
      id
      label
      path
      parentId
    }
  `,
};
