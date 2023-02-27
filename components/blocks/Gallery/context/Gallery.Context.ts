import { createContext } from "react";

import { Nullable, Void } from "../../../../helpers/typings/utility-types";

type GalleryContextProps = {
  isOpen: boolean;
  setToggle: Void;
};

export const GalleryContext =
  createContext<Nullable<GalleryContextProps>>(null);
