import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Container, Tab } from "@mui/material";
import { FC, SyntheticEvent, useCallback, useMemo, useState } from "react";

import { Nullable } from "@/helpers/typings/utility-types";
import { CarouselRoot } from "@/components/Carousel/CarouselRoot";
import { Card, IData } from "@/components/Widget/Card/Card";

import { createCategoryName } from "../../utils/createCategoryName";
import { handleOnClick } from "../../utils/goal";

import classes from "./Offer.Tabs.module.css";
import {
  sxOfferHeader,
  sxOfferRoot,
  sxOfferTab,
  sxOfferTabPanel,
} from "./Offer.Tabs.style";

const TAB_SIMILAR = "similarPosts";
const TAB_CATEGORY = "postsByCategory";

type OfferTabProps = {
  categories: string[];
  similarPosts: Nullable<IData[]>;
  postsByCategory: Nullable<IData[]>;
};

type TabListHandler = (
  event: SyntheticEvent<Element, Event>,
  value: string,
) => void;

export const OfferTabs: FC<OfferTabProps> = ({
  categories,
  similarPosts,
  postsByCategory,
}) => {
  const [value, setValue] = useState(similarPosts ? TAB_SIMILAR : TAB_CATEGORY);
  const handleChange = useCallback<TabListHandler>((_, newValue) => {
    setValue(newValue);
  }, []);

  const tabName = useMemo(() => createCategoryName(categories), [categories]);

  return (
    <Container
      maxWidth="md"
      disableGutters
      sx={sxOfferRoot}
      className={classes.root}>
      <TabContext value={value}>
        <Box sx={sxOfferHeader}>
          <TabList
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto">
            <Tab
              label="Похожие"
              title="Похожие статьи"
              value={TAB_SIMILAR}
              disabled={!similarPosts?.length}
            />
            <Tab
              sx={sxOfferTab}
              label={tabName.label}
              title={tabName.title}
              value={TAB_CATEGORY}
            />
          </TabList>
        </Box>
        {similarPosts && (
          <TabPanel value={TAB_SIMILAR} sx={sxOfferTabPanel}>
            <CarouselRoot itemMargin={5}>
              {similarPosts.map((post) => (
                <Card
                  key={post.id}
                  data={post}
                  isClamp
                  className={classes.Card}
                  onClick={handleOnClick}
                />
              ))}
            </CarouselRoot>
          </TabPanel>
        )}
        {postsByCategory && (
          <TabPanel value={TAB_CATEGORY} sx={sxOfferTabPanel}>
            <CarouselRoot itemMargin={5}>
              {postsByCategory.map((post) => (
                <Card
                  key={post.id}
                  data={post}
                  isClamp
                  className={classes.Card}
                  onClick={handleOnClick}
                />
              ))}
            </CarouselRoot>
          </TabPanel>
        )}
      </TabContext>
    </Container>
  );
};
