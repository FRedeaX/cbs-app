import classNames from "classnames";
import { useRouter } from "next/router";
import classes from "./Badge.module.css";
export const Badge = ({ count, length, className }) => {
  if (count)
    return (
      <div
        className={classNames(className, classes.wraper)}
      >{`${count}/${length}`}</div>
    );
  else {
    const router = useRouter();
    console.error({
      message: `count: ${count}`,
      path: { asPath: router.asPath, route: router.route },
    });
    return null;
  }
};

// {react.createElement(Badge, { className: [length], count: 4 }, null)}
// Badge={({ className, count }) => ()}
