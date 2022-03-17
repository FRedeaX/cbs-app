import classNames from "classnames";
import { Key } from "react";
import LibraryButton from "../LibraryButton/LibraryButton";
import classes from "./ScheduleList.module.css";

interface IButtonList {
  data: Array<{
    id: string;
    shortName: string;
  }>;

  schedule: string;
  holiday: string;
  currentFilial: string;
}

const ButtonList = ({
  data,
  schedule,
  holiday,
  currentFilial,
}: IButtonList): JSX.Element[] | null => {
  if (data === undefined || data === null) return null;

  return data.map((item) => (
    <LibraryButton
      key={item.id}
      href={{
        pathname: "/biblioteki",
        query: {
          lib: item.id,
          schedule: schedule || "default",
          holiday: holiday || "false",
        },
      }}
      isActive={currentFilial === item.id}>
      {item.shortName}
    </LibraryButton>
  ));
};

export default ButtonList;
