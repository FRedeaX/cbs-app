import { useState, useCallback, FC } from "react";

import { useInterval } from "@/helpers/frontend/hooks";
import { SEO } from "@/components/SEO/SEO";

type TitleIntervalUpdateProps = {
  domenTitle: string;
  timeNow: number;
};

export const TitleIntervalUpdate: FC<TitleIntervalUpdateProps> = ({
  domenTitle,
  timeNow,
}) => {
  const [title, setTitle] = useState("");
  const updateCallback = useCallback(() => {
    const date = new Date(Date.now() - timeNow);
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const minutesText = minutes > 0 ? `${minutes} мин.` : "";
    const Hours = date.getUTCHours();
    const HoursText = Hours > 0 ? `${Hours} ч.` : "";

    setTitle(`Обновлено ${HoursText} ${minutesText} ${seconds} сек. назад`);
  }, [timeNow]);

  useInterval(updateCallback, 1000);

  return <SEO domenTitle={domenTitle} title={title} />;
};
