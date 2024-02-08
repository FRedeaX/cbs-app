import { FC, ReactNode, useMemo } from "react";

import { useToggle } from "@/helpers/frontend/hooks";

import { GalleryContext } from "./Gallery.Context";

type GalleryProviderProps = {
  children: ReactNode;
};

export const GalleryProvider: FC<GalleryProviderProps> = ({ children }) => {
  const [isOpen, setToggle] = useToggle(false);

  const contextValue = useMemo(
    () => ({
      isOpen,
      setToggle,
    }),
    [isOpen, setToggle],
  );

  return (
    <GalleryContext.Provider value={contextValue}>
      {children}
    </GalleryContext.Provider>
  );
};
