/* eslint-disable react/jsx-props-no-spreading */
import {
  useSpring,
  animated,
  easings,
  SpringConfig,
  config as configSpring,
} from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import classNames from "classnames";
import {
  Ref,
  FC,
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useRef,
  HTMLAttributes,
} from "react";

import { CSSProperties, Void } from "@/helpers/typings/utility-types";

import {
  clamp,
  getBox,
  getOffset,
  doubleTap,
  projection,
  gestureLocker,
} from "../../lib";

import classes from "./ImageViewer.Zoom.module.css";

type Vector = [number, number];

type PointerEvents = CSSProperties["pointerEvents"];

type Spring = {
  x: number;
  y: number;
  scale: number;
  pointerEvents: PointerEvents;
};

export type ImageViewerZoomImperativeRef = {
  /**
   * Статус масштабирования.
   */
  hasPinch: () => boolean;
  /**
   * Выходит ли смещение за пределы границ.
   *  1 при пересечении границы слева,
   * -1 при пересечении границы справа.
   */
  hasOverflow: () => number;
  /**
   * Отключает жест.
   */
  onDisable: Void;
  /**
   * Включает жест.
   */
  onEnable: Void;
  /**
   * Сбрасывает значения x, y, scale.
   */
  onReset: Void;
};

type ImageViewerZoomProps = {
  children: ReactNode;
  className?: string | classNames.ArgumentArray;
  ref?: Ref<ImageViewerZoomImperativeRef>;
} & Omit<HTMLAttributes<HTMLDivElement>, "className">;

const MIN_SCALE = 1;
const MAX_SCALE = 3;

const configEasing: SpringConfig = {
  duration: 50,
  easing: easings.easeOutSine,
};

const active = gestureLocker();
const locker = gestureLocker();
const disable = gestureLocker();
const isDoubleTap = doubleTap();

export const ImageViewerZoom: FC<ImageViewerZoomProps> = forwardRef(
  ({ children, className, ...props }, ref) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const animatedRef = useRef<HTMLDivElement>(null);
    // Значение xy при пересечении верхней границы масштабирования
    const memoXYRef = useRef<Vector>([0, 0]);
    const axisOverflow = useRef<number>(0);

    const [style, api] = useSpring<Spring>(() => ({
      x: 0,
      y: 0,
      scale: MIN_SCALE,
      pointerEvents: "initial",
      config: { clamp: true },
      onStart: () => {
        active.lock();
      },
      onRest: ({ value }) => {
        locker.unlock();
        active.set(value.scale !== MIN_SCALE);
      },
    }));

    useGesture(
      {
        onClick: (state) => {
          const root = rootRef.current;
          const target = animatedRef.current;
          if (root === null || target === null) return;

          const { timeStamp, clientX, clientY } = state.event;
          const scale = style.scale.get();

          // Увеличиваем масштаб, если
          // он равен нижней границе масштабирования или
          // возвращаем в исходное состояние если наоборот
          if (isDoubleTap(timeStamp, [clientX, clientY])) {
            locker.lock();
            const config = configSpring.gentle;

            if (scale === MIN_SCALE) {
              const { width, height, left, top } = getBox(target);

              const [offsetX, offsetY] = getOffset(MAX_SCALE, target, root);
              const x = (width / 2 + left - clientX) * MAX_SCALE;
              const y = (height / 2 + top - clientY) * MAX_SCALE;

              api.start({
                x: clamp(x, -offsetX, offsetX),
                y: clamp(y, -offsetY, offsetY),
                scale: MAX_SCALE,
                config,
              });
            } else {
              api.start({ x: 0, y: 0, scale: 1, config });
            }
          }
        },
        onDrag: (state) => {
          const {
            pinching,
            cancel,
            first,
            last,
            memo = [1, 1],
            offset: [ox, oy],
            overflow: [ofx, ofy],
            velocity: [vx, vy],
            direction: [dx, dy],
          } = state;

          // Сохраняем информацию о пересечении границы
          if (state.touches === 1) {
            axisOverflow.current = ofx;
          }

          // Ничего не делаем, когда происходит масштабирование
          if (pinching || locker.get()) {
            cancel();
            return memo;
          }

          // Жест начался, блокируем ость, если смещение равно 0
          if (first) {
            const root = rootRef.current;
            const target = animatedRef.current;
            if (root === null || target === null) return memo;

            const [offsetX, offsetY] = getOffset(
              style.scale.get(),
              target,
              root,
            );

            memo[0] = offsetX && 1;
            memo[1] = offsetY && 1;
          }

          let x = ox * memo[0];
          let y = oy * memo[1];
          let config = configEasing;

          // Жест завершен, добавляем инерцию, если
          // не достигли границы родительского элемента
          if (last) {
            const root = rootRef.current;
            const target = animatedRef.current;
            if (root === null || target === null) return memo;

            const overflowX = ofx === 0 ? 1 : 0;
            const overflowY = ofy === 0 ? 1 : 0;

            // Добавляем смещение на основании импульса
            x += projection(vx) * dx * overflowX;
            y += projection(vy) * dy * overflowY;

            const velocity = vx + vy;
            const [offsetX, offsetY] = getOffset(
              style.scale.get(),
              target,
              root,
            );

            x = clamp(x, -offsetX, offsetX);
            y = clamp(y, -offsetY, offsetY);
            config = { friction: 26 * (velocity + 1) };
          }

          api.start({ x, y, config });

          return memo;
        },
        onPinch: (state) => {
          const {
            // memo = [
            //   Vector[], - Значение xy при запуске жеста
            //   Vector[], - Расстояние от координат центра касаний до центра изображения
            // ];
            memo = [],
            first,
            last,
            cancel,
            movement: [mx],
            origin: [ox, oy],
            offset: [s],
          } = state;

          // Ничего не делаем, когда жест жест отключен
          if (disable.get()) {
            cancel();
            return memo;
          }

          if (first) {
            const target = animatedRef.current;
            if (target === null) return memo;

            const { width, height, left, top } = getBox(target);
            const x = ox - (left + width / 2);
            const y = oy - (top + height / 2);

            memo.push([style.x.get(), style.y.get()], [x, y]);
          }

          let x = memo[0][0] - (mx - 1) * memo[1][0];
          let y = memo[0][1] - (mx - 1) * memo[1][1];
          let scale = s;
          let config = configEasing;
          let pointerEvents: PointerEvents = "none";

          // Сохраняем положение xy, если
          // масштабирование меньше верхней границы
          if (scale <= MAX_SCALE) {
            memoXYRef.current = [x, y];
          }

          if (last) {
            const root = rootRef.current;
            const target = animatedRef.current;
            if (root === null || target === null) return memo;

            // Обновляем положение xy и масштаб, если
            // масштабирование больше верхней границы
            if (scale > MAX_SCALE) {
              [x, y] = memoXYRef.current;
              scale = MAX_SCALE;
              // TODO: Рассмотреть возможность не блокировать жест при превышении верхней границы
              locker.lock();
            }

            const [offsetX, offsetY] = getOffset(scale, target, root);
            x = clamp(x, -offsetX, offsetX);
            y = clamp(y, -offsetY, offsetY);
            config = configSpring.gentle;
            pointerEvents = scale > MIN_SCALE ? "none" : "initial";
          }

          api.start({ x, y, scale, pointerEvents, config });

          return memo;
        },
      },
      {
        target: rootRef,
        drag: {
          from: () => [style.x.get(), style.y.get()],
          bounds: (state) => {
            const root = rootRef.current;
            if (state === undefined || root === null) {
              return { top: 0, bottom: 0, left: 0, right: 0 };
            }

            const { target } = state;
            const [offsetX, offsetY] = getOffset(
              style.scale.get(),
              target,
              root,
            );

            return {
              top: -offsetY,
              bottom: offsetY,
              left: -offsetX,
              right: offsetX,
            };
          },
          rubberband: true,
          eventOptions: { passive: false },
        },

        pinch: {
          from: () => [style.scale.get(), 0],
          rubberband: true,
          scaleBounds: { min: MIN_SCALE },
          // TODO: mouse scroll
          modifierKey: null,
        },
      },
    );

    useImperativeHandle(
      ref,
      () => ({
        hasPinch: () => active.get(),
        hasOverflow: () => axisOverflow.current,
        onDisable: () => disable.lock(),
        onEnable: () => disable.unlock(),
        onReset: () => {
          api.start({
            x: 0,
            y: 0,
            scale: MIN_SCALE,
            config: configSpring.gentle,
          });
        },
      }),
      [api],
    );

    return (
      <div
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ref={rootRef}
        className={classNames(classes.root, className)}
        {...props}>
        <animated.div
          ref={animatedRef}
          style={style}
          className={classes.animated}>
          {children}
        </animated.div>
      </div>
    );
  },
);

ImageViewerZoom.displayName = "ImageViewerZoom";
