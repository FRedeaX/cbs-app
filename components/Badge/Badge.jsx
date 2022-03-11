import CircularProgress from "@mui/material/CircularProgress";

import { captureException } from "@sentry/nextjs";
import classNames from "classnames";
import { useRouter } from "next/router";

import classes from "./Badge.module.css";

const Badge = ({ count, length, className, loading = false }) => {
  const router = useRouter();

  if (count)
    return (
      <div className={classNames(className, classes.wraper)}>
        {`${count}/${length}`}
      </div>
    );

  // eslint-disable-next-line no-console
  console.error({
    message: `count: ${count}`,
    path: { asPath: router.asPath, route: router.route },
  });
  captureException({
    message: `Badge. Count: ${count}`,
    path: { asPath: router.asPath, route: router.route },
  });
  return null;
};

export default Badge;

// {react.createElement(Badge, { className: [length], count: 4 }, null)}
// Badge={({ className, count }) => ()}
