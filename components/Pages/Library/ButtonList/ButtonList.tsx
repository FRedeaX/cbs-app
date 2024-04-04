import { FC } from "react";

import LibraryButton from "../LibraryButton/LibraryButton";

interface IButtonList {
  data: Array<{
    id: string;
    shortName: string;
  }>;

  schedule: string;
  holiday: string;
  currentFilial: string;
}

const ButtonList: FC<IButtonList> = ({
  data,
  schedule,
  holiday,
  currentFilial,
}) => {
  if (data === undefined || data === null) return null;

  return (
    <>
      {data.map((item) => (
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
      ))}
    </>
  );
};

export default ButtonList;
