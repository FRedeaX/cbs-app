import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import { FC, SyntheticEvent, useCallback, useState } from "react";

import { CarouselRoot } from "@/components/Carousel/CarouselRoot";
import { IPoster } from "@/components/poster/PosterItem/PosterItem";
import { PosterRoot } from "@/components/poster/PosterRoot/PosterRoot";
import { Resource, ResourceCardItem } from "src/entities/card/Resource";

import { sxTabList, sxTabPanel } from "./styles";

const TAB_POSTER = "poster";
const TAB_RESOURCE = "resource";

type TabListHandler = (
  event: SyntheticEvent<Element, Event>,
  value: string,
) => void;

type AsideMobileProps = {
  posters: IPoster[];
  resources: {
    title: string;
    children: {
      nodes: (ResourceCardItem & { id: string })[];
    };
  };
};

export const AsideMobile: FC<AsideMobileProps> = ({ posters, resources }) => {
  const [value, setValue] = useState(TAB_POSTER);
  const handleChange = useCallback<TabListHandler>((_, newValue) => {
    setValue(newValue);
  }, []);

  return (
    <TabContext value={value}>
      <TabList sx={sxTabList} onChange={handleChange}>
        <Tab label="Анонсы" value={TAB_POSTER} />
        <Tab label={resources.title} value={TAB_RESOURCE} />
      </TabList>
      <TabPanel value={TAB_POSTER} sx={sxTabPanel}>
        <PosterRoot posters={posters} />
      </TabPanel>
      <TabPanel value={TAB_RESOURCE} sx={sxTabPanel}>
        <CarouselRoot
          itemMargin={5}
          isButtonsOnSides={false}
          isResponsiveWidthsChildren>
          {resources.children.nodes.map((item) => (
            <Resource key={item.id} data={item} />
          ))}
        </CarouselRoot>
      </TabPanel>
    </TabContext>
  );
};
