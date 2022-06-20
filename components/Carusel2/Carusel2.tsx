/* eslint-disable no-console */
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import classNames from "classnames";
import { Children, FC, memo, ReactNode } from "react";
import CaruselButton from "./Carusel.Button/Carusel.Button";
import CaruselList from "./Carusel.List";
import classes from "./Carusel2.module.css";
import useCarusel2 from "./useCarusel2";

interface Carusel2Props {
  children: ReactNode;
  itemWidth?: number;
  itemCountOfScreen?: number;
  isScrollSnap?: boolean;
  isButtonsOnSides?: boolean;
}

const Carusel2: FC<Carusel2Props> = ({
  children,
  length,
  itemWidth,
  itemCountOfScreen,
  isScrollSnap = false,
  isButtonsOnSides = true,
}) => {
  const [
    nodeListRefCallback,
    {
      onClickHendler,
      onKeyDownHendler,
      onWellHendler,
      rootRefCallback,
      isPrev,
      isNext,
    },
  ] = useCarusel2({
    length: length ?? Children.count(children),
    itemWidth,
    itemCountOfScreen,
  });

  // useEffect(() => {
  //   rootRefCallback(scrolledRef.current);
  // }, [rootRefCallback]);

  // useEffect(() => {
  //   const selector = children[0].props.className.split(" ")[0];
  //   const childrenList = document.querySelectorAll(`.${selector}`);

  //   const root = scrolledRef.current;
  //   const options = { root, rootMargin: "0px", threshold: [0.95] };

  //   const observer = new IntersectionObserver((entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         console.log(entry.target.dataset.idx, entry.target.offsetLeft);
  //       }
  //     });
  //   }, options);

  //   childrenList.forEach((element: any) => observer.observe(element));
  // }, [children]);
  console.log({ isPrev, isNext });

  return (
    <div className={classes.root}>
      <div
        ref={rootRefCallback}
        role="presentation"
        // onKeyDown={onKeyDownHendler}
        // onWheelCapture={onWellHendler}
        className={classNames(classes.scrolled, {
          [classes.scrolled_scrollSnap]: isScrollSnap,
        })}>
        <div className={classes.itemList}>
          <CaruselList nodeListRefCallback={nodeListRefCallback}>
            {children}
          </CaruselList>
        </div>
      </div>

      <CaruselButton
        direction="prev"
        isActive={isPrev}
        isButtonsOnSides={isButtonsOnSides}
        onClick={onClickHendler}>
        <ArrowBackIosRoundedIcon />
      </CaruselButton>
      <CaruselButton
        direction="next"
        isActive={isNext}
        isButtonsOnSides={isButtonsOnSides}
        onClick={onClickHendler}>
        <ArrowForwardIosRoundedIcon />
      </CaruselButton>
    </div>
  );
};

function areEqual(prevProps: Carusel2Props, nextProps: Carusel2Props) {
  return (
    Children.count(prevProps.children) === Children.count(nextProps.children)
    // prevProps.children.isOpen === nextProps.children.isOpen
  );
}

export default memo(Carusel2, areEqual);
