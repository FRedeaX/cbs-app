import { useContext } from "react";

import { GalleryContext } from "./Gallery.Context";

export * from "./Gallery.Provider";

export const useGalleryContext = () => {
  const context = useContext(GalleryContext);
  if (context === undefined || context === null) {
    throw new Error("useGalleryContext must be used within a GalleryProvider");
  }
  return context;
};
