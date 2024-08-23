import { forwardRef } from "react";

import { Link, LinkProps } from "@/components/UI/Link/Link";

export const PaginationLink = forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => <Link {...props} ref={ref} prefetch={false} />,
);
