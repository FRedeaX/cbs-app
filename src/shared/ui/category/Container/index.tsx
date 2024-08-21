import { ReactElement } from "react";

import { Scroller } from "@/components/Scroller/Scroller";

import classes from "./Category.Container.module.css";

type CategoryContainerProps<T> = {
  items: T[];
  renderItem: (params: T, index: number) => ReactElement;
};

export const Container = <T extends object>({
  items,
  renderItem,
}: CategoryContainerProps<T>) => (
  <div className={classes.block}>
    <Scroller>{items.map((item, index) => renderItem(item, index))}</Scroller>
  </div>
);
