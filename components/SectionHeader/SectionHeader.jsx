import classNames from "classnames";
import Link from "next/link";
import { memo } from "react";

import Title from "../Title/Title";
import Button from "../UI/Button/Button";
import classes from "./Section-header.module.css";

const SectionHeader = ({ children, url, cls }) => (
  <div className={classNames(classes.block, cls)}>
    {url ? (
      <Title HtmlTeg="h2">
        <Link href={url} prefetch={false} passHref>
          <Button
            view="link"
            className={classes.link}
            // iconRight={<Icon weight="small" size="xs" direction="right" />}
          >
            {children}
          </Button>
        </Link>
      </Title>
    ) : (
      <Title HtmlTeg="h2" cls={classes.title}>
        {children}
      </Title>
    )}
  </div>
);

export default memo(SectionHeader);
