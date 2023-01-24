import { FC, ReactNode, useMemo } from "react";

import { useToggle } from "../../../../helpers/frontend/hooks";
import { GalleryContext } from "./Gallery.Context";

type GalleryProviderProps = {
  children: ReactNode;
};

export const GalleryProvider: FC<GalleryProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useToggle(false);

  const contextValue = useMemo(
    () => ({
      isOpen,
      setIsOpen,
    }),
    [isOpen, setIsOpen],
  );

  return (
    <GalleryContext.Provider value={contextValue}>
      {children}
    </GalleryContext.Provider>
  );
};
