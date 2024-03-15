"use client";

import { useCallback } from "react";

import { useInterval } from "@/helpers/frontend/hooks";

type TitleIntervalUpdateProps = {
  timeNow: number;
  loading: boolean;
};

export const useTitleIntervalUpdate = ({
  timeNow,
  loading,
}: TitleIntervalUpdateProps) => {
  const updateCallback = useCallback(() => {
    if (loading) return;

    const date = new Date(Date.now() - timeNow);
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const minutesText = minutes > 0 ? `${minutes} мин.` : "";
    const Hours = date.getUTCHours();
    const HoursText = Hours > 0 ? `${Hours} ч.` : "";

    document.title = `Обновлено ${HoursText} ${minutesText} ${seconds} сек. назад | Предварительный просмотр`;
  }, [loading, timeNow]);

  useInterval(updateCallback, 1000);
};
