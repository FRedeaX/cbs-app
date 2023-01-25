import { FC, KeyboardEvent, ReactNode, useCallback } from "react";

type OnKeyDownAway = (event: KeyboardEvent) => void;
type KeyDownAwayListenerProps = {
  children: ReactNode;

  /**
   * Массив с кодом клавиш для отслеживания.
   */
  keyboardCode: string[];

  /**
   * Обработчик, вызывающийся при совподении с одним из значений `keyboardCode`.
   */
  onKeyDownAway: OnKeyDownAway;
};

/**
 * Компонент прослушивателя вызывает функцию,
 * когда событие клавиши совпадает с одним из значений `keyboardCode`.
 *
 * @example
 * <KeyDownAwayListener
 *    onKeyDownAway={setIsOpen}
 *    keyboardCode={["Escape"]}>
 * ...
 * </KeyDownAwayListener>
 */
export const KeyDownAwayListener: FC<KeyDownAwayListenerProps> = ({
  children,
  keyboardCode,
  onKeyDownAway,
}) => {
  const onKeyDown = useCallback<OnKeyDownAway>(
    (event) => {
      if (keyboardCode.indexOf(event.code) >= 0) {
        onKeyDownAway(event);
      }
    },
    [keyboardCode, onKeyDownAway],
  );

  return (
    <div onKeyDown={onKeyDown} role="presentation">
      {children}
    </div>
  );
};
