import classNames from "classnames";
import Link from "next/link";
import { ReactNode } from "react";
import Button from "../../../UI/Button/Button";
import classes from "./LibraryButton.module.css";

interface ILibraryButton {
  children: ReactNode;
  href: string | object;
  isActive: boolean;
  className?: string;
}

const LibraryButton = ({
  children,
  href,
  isActive,
  className,
}: ILibraryButton): JSX.Element => (
  <Link href={href} passHref replace scroll={false} shallow legacyBehavior>
    <Button
      view="link"
      className={classNames(
        classes.link,
        {
          [classes.active]: isActive,
        },
        className,
      )}>
      {children}
    </Button>
  </Link>
);

export default LibraryButton;
