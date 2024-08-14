import { FC } from "react";

import { Link, LinkProps } from "@/components/UI/Link/Link";

export const PaginationLink: FC<LinkProps> = (props) => (
  <Link {...props} prefetch={false} />
);
