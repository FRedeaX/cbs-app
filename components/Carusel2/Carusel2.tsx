import classNames from "classnames";
import {
  Children,
  cloneElement,
  FC,
  memo,
  ReactNode,
  useCallback,
  useRef,
  useState,
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
  isScrollSnap = false,
  isButtonsOnSides = true,
}) => {
  const childrenListRef = useRef<Array<ReactNode>>([]);
  // const [isSetChildrenRef, setChildrenRef] = useState<boolean>(false);
  const [scrolledRef, nodeListRef, { onClickHendler, onWellHendler }] =
    useCarusel2({
      itemWidth,
      itemCountOfScreen,
    });

  const [test, settest] = useState(true);

  // срабатывает на каждое нажатие влево/вправо, кроме события скролл
  const setRefs = useCallback(
    (node: ReactNode, index: number): void => {
      if (node === null) return;

      childrenListRef.current[index] = node;
      if (index === Children.count(children) - 1 && test) {
        nodeListRef(childrenListRef.current);
        console.log("@@@");
        settest(false);
      }

      // ref.current = node;
    },
    [children, nodeListRef, test],
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
                // nodeListRef.current[index] = ref;
                setRefs(ref, index);
              },
            }),
          )}
        </div>
      </div>

      {/* <Box
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
      </Box> */}
      {/* <div
        className={classNames(
          classes.buttonWrapper,
          classes[`buttonWrapper_sides_${isButtonsOnSides}`],
          {
            [classes.buttonWrapper_right]: isButtonsOnSides,
          },
        )}>
        <Button
          className={classNames(classes.button, classes.button_bg)}
          icon={
            <span className={classes.button_icon}>
              <Icon weight="medium" direction="right" />
            </span>
          }
          onClick={onClickRightHendler}
        />
      </div> */}
    </div>
  );
};

function areEqual(prevProps: any, nextProps: any) {
  return (
    prevProps.children.length === nextProps.children.length
    // prevProps.children.isOpen === nextProps.children.isOpen
  );
}

export default memo(Carusel2, areEqual);
