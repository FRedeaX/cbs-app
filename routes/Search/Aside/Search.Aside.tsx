import { FC, ReactNode } from "react";

import { UAPlatform } from "../../../helpers/backend";
import { UA } from "../../../helpers/backend/getUA/const";
import { Maybe } from "../../../helpers/typings/utility-types";

import { AsideTouch } from "./touch/Aside.Touch";

type SearchAsideProps = {
  children: ReactNode;
  className?: string;
  count: Maybe<number>;
  platform: UAPlatform;
};

export const SearchAside: FC<SearchAsideProps> = ({
  children,
  className,
  count,
  platform,
}) => (
  <aside className={className}>
    {platform === UA.desktope ? (
      children
    ) : (
      <AsideTouch count={count}>{children}</AsideTouch>
    )}
  </aside>
);
