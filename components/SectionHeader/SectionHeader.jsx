import classNames from "classnames";
import Link from "next/link";
import { memo } from "react";
import Title from "~/components/Title/Title";
import Button from "~/components/UI/Button/Button";
import { Icon } from "~/components/UI/Icon/Icon";
import classes from "./Section-header.module.css";

const SectionHeader = ({ children, url, cls }) => (
  <div className={classNames(classes.block, cls)}>
    {url ? (
      <Title HtmlTeg="h2">
        <Link href={url} prefetch={false}>
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
