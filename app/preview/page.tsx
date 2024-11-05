import { Maybe } from "@/helpers/typings/utility-types";
import { DynamicRoutePreview } from "@/routes/Preview";
import { ERROR_MESSAGE } from "@/constants";

const previewType = ["page", "post", "poster"] as const;

type Props = {
  searchParams: Promise<{
    type: typeof previewType[number];
    p: Maybe<string>;
  }>;
};

const Page = async ({ searchParams }: Props) => {
  const { type, p } = await searchParams;
  if (typeof type !== "string" || !previewType.includes(type)) {
    throw new Error(`type ${ERROR_MESSAGE.IS_NOT_STRING}`);
  }
  if (typeof p !== "string") {
    throw new Error(`p ${ERROR_MESSAGE.IS_NOT_STRING}`);
  }

  const id = parseInt(p, 10);
  if (Number.isNaN(id)) {
    throw new Error(`id ${ERROR_MESSAGE.IS_NOT_NUMBER}`);
  }

  return <DynamicRoutePreview id={id} type={type} />;
};

export default Page;
