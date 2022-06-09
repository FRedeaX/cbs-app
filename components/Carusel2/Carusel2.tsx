import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { Box, IconButton } from "@mui/material";
import classNames from "classnames";
import {
  Children,
  cloneElement,
  FC,
  memo,
  ReactNode,
  useCallback,
  useRef,
} from "react";
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
  itemWidth,
  itemCountOfScreen,
  isScrollSnap,
  isButtonsOnSides,
}) => {
  const childrenListRef = useRef<Array<ReactNode>>([]);
  // const [isSetChildrenRef, setChildrenRef] = useState<boolean>(false);
  const [scrolledRef, childrenRef, { onClickHendler, onWellHendler }] =
    useCarusel2({
      itemWidth,
      itemCountOfScreen,
    });

  const setRefs = useCallback(
    (node: ReactNode, index: number): void => {
      if (node === null) return;

      childrenListRef.current[index] = node;
      if (index === Children.count(children) - 1) {
        childrenRef(childrenListRef.current);
        console.log("@@@");
      }

      // ref.current = node;
    },
    [children, childrenRef],
  );

  const onClickLeftHendler = useCallback(() => {
    onClickHendler("prev");
  }, [onClickHendler]);
  const onClickRightHendler = useCallback(() => {
    onClickHendler("next");
  }, [onClickHendler]);

  return (
    <div className={classes.root}>
      <div
        ref={scrolledRef}
        onWheelCapture={onWellHendler}
        className={classNames(classes.scrolled, {
          [classes.scrolled_scrollSnap]: isScrollSnap,
        })}>
        <div className={classes.itemList}>
          {Children.map(children, (child, index: number) =>
            cloneElement(child, {
              ref: (ref: never) => {
                // childrenRef.current[index] = ref;
                setRefs(ref, index);
              },
            }),
          )}
        </div>
      </div>

      <Box
        className={classNames(
          classes.buttonWrapper,
          classes[`buttonWrapper_sides_${isButtonsOnSides}`],
          {
            [classes.buttonWrapper_left]: isButtonsOnSides,
          },
        )}>
        <IconButton
          className={classNames(classes.button, classes.button_bg)}
          onClick={onClickLeftHendler}>
          <ArrowBackIosRoundedIcon />
        </IconButton>
      </Box>
      <Box
        className={classNames(
          classes.buttonWrapper,
          classes[`buttonWrapper_sides_${isButtonsOnSides}`],
          {
            [classes.buttonWrapper_right]: isButtonsOnSides,
          },
        )}>
        <IconButton
          className={classNames(classes.button, classes.button_bg)}
          onClick={onClickRightHendler}>
          <ArrowForwardIosRoundedIcon />
        </IconButton>
      </Box>
    </div>
  );
};

Carusel2.defaultProps = {
  // children: undefined,
  itemWidth: undefined,
  itemCountOfScreen: undefined,
  isScrollSnap: false,
  isButtonsOnSides: true,
};

function areEqual(prevProps: any, nextProps: any) {
  return (
    prevProps.children.length === nextProps.children.length
    // prevProps.children.isOpen === nextProps.children.isOpen
  );
}

export default memo(Carusel2, areEqual);
