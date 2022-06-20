import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { Fade } from "@mui/material";
import classNames from "classnames";
import { Children, FC, memo, ReactElement } from "react";
import CaruselButton from "./Carusel.Button/Carusel.Button";
import CaruselList from "./Carusel.List";
import CaruselShadow from "./Carusel.Shadow/Carusel.Shadow";
import classes from "./Carusel2.module.css";
import useCarusel2 from "./useCarusel2";

interface Carusel2Props {
  children: ReactElement[];
  length: number;
  itemWidth?: number;
  itemMargin?: number;
  isScrollSnap?: boolean;
  isButtonsOnSides?: boolean;
  isOffsetSides: boolean;
  isShadow: boolean;
  className: string;
  forceUpdate: string;
}

const Carusel2: FC<Carusel2Props> = ({
  children,
  length,
  itemWidth = 0,
  itemMargin = 0,
  isScrollSnap = false,
  isButtonsOnSides = true,
  isOffsetSides = false,
  isShadow = true,
  className,
  forceUpdate,
}) => {
  const [
    nodeListRefCallback,
    {
      onClickHendler,
      onKeyDownHendler,
      rootRefCallback,
      isPrev,
      isNext,
      isDisplayNavigation,
    },
  ] = useCarusel2({
    length: length ?? Children.count(children),
    itemWidth,
    itemMargin,
    isOffsetSides,
    id: children[0].key as string,
  });

  console.log("__Carusel2__", children[0].key, children[0].props.data.title);

  return (
    <div className={classes.root}>
      <div
        ref={rootRefCallback}
        role="presentation"
        onKeyDown={onKeyDownHendler}
        className={classNames(classes.scrolled, {
          [classes.scrolled_scrollSnap]: isScrollSnap,
        })}>
        <div
          className={classNames(classes.itemList, className)}
          style={{ position: "relative" }}>
          <div style={{ minWidth: `${itemMargin}px` }} />
          <CaruselList nodeListRefCallback={nodeListRefCallback}>
            {children}
          </CaruselList>
          <div style={{ minWidth: `${itemMargin}px` }} />
        </div>
      </div>

      <Fade in={isDisplayNavigation}>
        <div>
          <CaruselShadow
            isShadow={isShadow}
            direction="prev"
            isActive={isPrev}
          />
          <CaruselShadow
            isShadow={isShadow}
            direction="next"
            isActive={isNext}
          />
          <CaruselButton
            direction="prev"
            isActive={isPrev}
            isButtonsOnSides={isButtonsOnSides}
            onClick={onClickHendler}
            onKeyDown={onKeyDownHendler}>
            <ArrowBackIosRoundedIcon />
          </CaruselButton>
          <CaruselButton
            direction="next"
            isActive={isNext}
            isButtonsOnSides={isButtonsOnSides}
            onClick={onClickHendler}
            onKeyDown={onKeyDownHendler}>
            <ArrowForwardIosRoundedIcon />
          </CaruselButton>
        </div>
      </Fade>
    </div>
  );
};

function areEqual(prevProps: Carusel2Props, nextProps: Carusel2Props) {
  // console.log(
  //   "1. ",
  //   prevProps.children[0].key === nextProps.children[0].key &&
  //     Children.count(prevProps.children) === Children.count(nextProps.children),
  //   nextProps.children,
  // );

  return (
    prevProps.children[0].key === nextProps.children[0].key &&
    Children.count(prevProps.children) === Children.count(nextProps.children)
    // prevProps.children.isOpen === nextProps.children.isOpen
  );
}

export default memo(Carusel2, areEqual);
