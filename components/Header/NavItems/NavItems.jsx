import { gql } from "@apollo/client";
import classNamesBind from "classnames/bind";
import classNames from "classnames";
import { memo } from "react";
import ActiveLink from "~/components/UI/ActiveLink/ActiveLink";
import Button from "~/components/UI/Button/Button";
import { Icon } from "~/components/UI/Icon/Icon";
import { createMarkup } from "~/helpers";
import { overlayVar } from "~/store/variables/overlay";
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
        <li className={classes["li_header"]}>
          <Button
            width="max"
            isTextCenter={true}
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
            onClick={(event) => onClick(event, true)}
          >
            <span
              style={{ width: "100%" }}
              className={classes.text}
              dangerouslySetInnerHTML={createMarkup(headerLabel)}
            />
          </Button>
        </li>
      )}
      {data.map(({ id, parentId, label, path, childItems }) => {
        if (!!childItems?.nodes.length && subItem) subLvl++;

        return (
          <li
            key={id}
            className={classNames(classes.li, {
              [classes["li_right"]]: isRight,
              [classes.li_overlay]:
                !!childItems?.nodes.length && parentId === parentIdList,

              [classes[`li-left_lvl_${liLvl}`]]: subItem && !isRight,
              [classes["li-left_lvl_0"]]:
                !!childItems?.nodes.length && !subItem && !isRight,

              [classes["li-left_length_1"]]: data.length === 1 && !isRight,

              [classes[`li-right_lvl_${liLvl}`]]: subItem && isRight,
              [classes["li-right_lvl_0"]]:
                !!childItems?.nodes.length && !subItem && isRight,
            })}
          >
            {!!childItems?.nodes.length ? (
              <ActiveLink
                activeClassName={classes.link_active}
                href={path}
                isLink={false}
              >
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
                  onClick={onClick}
                >
                  <span
                    className={classes.text}
                    dangerouslySetInnerHTML={createMarkup(label)}
                  />
                </Button>
              </ActiveLink>
            ) : (
              <>
                {path === "/elcatalog/" ? (
                  <a href={path} className={classes.link} target="_blank">
                    <span className={classes.text}>{label}</span>
                  </a>
                ) : (
                  <ActiveLink
                    activeClassName={classes.link_active}
                    href={path}
                    prefetch={false}
                  >
                    <a
                      className={cx({
                        link: true,
                        "link--cursor": !!childItems?.nodes.length,
                      })}
                      onClick={() => overlayVar({ isOpen: false })}
                    >
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
                subList={true}
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
