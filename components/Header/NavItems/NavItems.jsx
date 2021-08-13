import { gql } from "@apollo/client";
import classNamesBind from "classnames/bind";
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
  isMobile,
  headerLabel,
  onClick,
}) => {
  const cx = classNamesBind.bind(classes);
  // const Button = compose(
  //   withSizeM,
  //   withViewDefault,
  //   withWidthMax
  // )(ButtonDesktop);
  // const Icon = compose(withTypeArrow)(IconDesktop);

  // console.log("I_Render");
  return (
    <>
      {headerLabel && (
        <li
          style={{
            marginBottom: isMobile ? "6px" : "",
            marginLeft: "6px",
            "--button-text-align": "center",
          }}
        >
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

      {data.map(({ id, parentId, label, url, childItems }) => {
        const { host, pathname } = new URL(url || "https://cbsbaikonur.ru/");
        if (!!childItems?.nodes.length && subItem) subLvl++;

        return (
          <li
            key={id}
            className={cx({
              li: true,
              li_overlay:
                !!childItems?.nodes.length &&
                parentId === parentIdList &&
                !isMobile,
              li_radius: isRight,
            })}
          >
            {!!childItems?.nodes.length && isMobile ? (
              <Button
                width="max"
                iconRight={
                  <Icon
                    type="arrow"
                    size="xs"
                    side="right"
                    direction="right"
                    weight="small"
                    // className={classes["icon_width"]}
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
            ) : (
              <>
                {host === "37.230.203.238" ? (
                  <a href={url} className={classes.link}>
                    <span className={classes.text}>{label}</span>
                  </a>
                ) : (
                  <ActiveLink
                    activeClassName={classes.link_active}
                    href={pathname}
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
                isMobile={isMobile}
                headerLabel={!!childItems?.nodes.length && isMobile && label}
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
      url
      parentId
    }
  `,
};
