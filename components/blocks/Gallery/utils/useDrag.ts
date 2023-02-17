/* eslint-disable no-multi-assign */
import { Touch, TouchEvent, useCallback, useRef } from "react";

/**
 * Вектор, выраженный двумя координатами
 */
type Vector = { x: number; y: number };

/**
 * Объект состояния касания, передается единственным аргументом в колбэк
 */
type TouchState<T> = {
  /**
   * Координаты пальца пользователя в момент предыдущего срабатывания функции
   */
  previousPosition: Vector;

  /**
   * Координаты пальца пользователя в данный момент
   */
  currentPosition: Vector;

  /**
   * Координаты начала жеста
   */
  initialPosition: Vector;

  /**
   * Сдвиг по каждой из осей с момента начала жеста
   */
  movement: Vector;

  /**
   * Расстояние, пройденное с момента предыдущего вызова функции
   */
  delta: Vector;

  /**
   * Скорость движения пальца по каждой из осей
   */
  velocity: Vector;

  /**
   * Время начала жеста (timestamp)
   */
  startTime: number;

  /**
   * Длительность жеста
   */
  elapsedTime: number;

  /**
   * Исходный объект события
   */
  event: TouchEvent;

  /**
   * Признак начала жеста
   */
  first: boolean;

  /**
   * Признак окончания жеста
   */
  last: boolean;

  /**
   * Пользовательские данные
   */
  data: T;
};

type Callbackfn<T> = (arg: Readonly<TouchState<T>>) => void;

export const useDrag = <T>(callbackfn: Callbackfn<T>) => {
  const touchStateRef = useRef<TouchState<T>>();
  const callbackfnRef = useRef<Callbackfn<T>>(callbackfn);

  const handler = useCallback((event: TouchEvent) => {
    // event.stopPropagation();

    let state = touchStateRef.current;
    const touch: Touch = event.changedTouches[0];

    if (state === undefined && event.type === "touchstart") {
      touchStateRef.current = state = {
        first: true,
        last: false,
        startTime: event.timeStamp,
        initialPosition: { x: touch.clientX, y: touch.clientY },
        data: {},
      } as TouchState<T>;
    }

    if (state !== undefined) {
      state.event = event;

      // сохраняет координаты предыдущего вызова функции
      if (event.type === "touchmove") {
        state.first = false;
        state.previousPosition = state.currentPosition;
      }

      if (event.type === "touchstart" || event.type === "touchmove") {
        state.currentPosition = {
          x: touch.clientX,
          y: touch.clientY,
        };
        state.movement = {
          x: state.currentPosition.x - state.initialPosition.x,
          y: state.currentPosition.y - state.initialPosition.y,
        };
        state.delta = {
          x:
            state.currentPosition.x -
            (state.previousPosition || state.initialPosition).x,
          y:
            state.currentPosition.y -
            (state.previousPosition || state.initialPosition).y,
        };
        state.velocity = {
          x:
            state.delta.x /
              (event.timeStamp - state.startTime - state.elapsedTime) || 0,
          y:
            state.delta.y /
              (event.timeStamp - state.startTime - state.elapsedTime) || 0,
        };
        state.elapsedTime = event.timeStamp - state.startTime;
      }

      // жест завершен пользователем или был прекращен системой
      if (event.type === "touchend" || event.type === "touchcancel") {
        state.first = false;
        state.last = true;
        touchStateRef.current = undefined;
      }

      callbackfnRef.current(state);
    }
  }, []);

  callbackfnRef.current = callbackfn;

  const dragProps = {
    onTouchStart: handler,
    onTouchMove: handler,
    onTouchEnd: handler,
    onTouchCancel: handler,
  };

  return {
    dragProps,
  };
};
