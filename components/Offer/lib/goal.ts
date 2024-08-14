import { reachGoal } from "@/core/metrics/YMetrika/utils/reachGoal";

export const handleOnSuccess = () => reachGoal("loadedOffer");
export const handleOnClick = () => reachGoal("openOffer");
