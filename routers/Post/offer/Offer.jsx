import { TabContext, TabPanel } from "@mui/lab";
import TabList from "@mui/lab/TabList";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { forwardRef, useMemo, useState } from "react";

import GroupCards from "../../../components/Widget/Card/GroupCards/GroupCards";
import classes from "./Offer.module.css";

const TAB_SIMILAR = "similarPostList";
const TAB_CATEGORY = "postListByCategory";

const Offer = forwardRef(
  ({ similarPostList, postListByCategory, categories }, ref) => {
    const [value, setValue] = useState(
      similarPostList?.length > 0 ? TAB_SIMILAR : TAB_CATEGORY,
    );
    const handleChange = (_, newValue) => {
      setValue(newValue);
    };
    const categoriesNameList = useMemo(() => {
      if (categories.length === 3) {
        const last = categories.pop();
        const cat = categories.join(", ");

        if (cat.length < last.length) {
          return `${cat}, ${"\n"}${last}`;
        }
      }
      return categories.join(", ");
    }, [categories]);

    return (
      <div className={classes.block} ref={ref}>
        {(similarPostList?.length > 0 || postListByCategory?.length > 0) && (
          <>
            {/* <Separator className="is-style-default" /> */}
            <TabContext value={value}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  margin: "0 10px 15px",
                }}>
                <TabList onChange={handleChange}>
                  <Tab
                    label="Похожие"
                    title="Похожие статьи"
                    value={TAB_SIMILAR}
                    disabled={!(similarPostList?.length > 0)}
                  />
                  <Tab
                    sx={{ whiteSpace: "pre-line" }}
                    label={categoriesNameList}
                    title={`Статьи по категори${
                      categories.length === 1 ? "и" : "ям"
                    } ${categories}`}
                    value={TAB_CATEGORY}
                  />
                </TabList>
              </Box>
              <TabPanel value={TAB_SIMILAR} sx={{ padding: 0 }}>
                <GroupCards
                  data={similarPostList}
                  length={similarPostList?.length}
                  isClamp
                />
              </TabPanel>
              <TabPanel value={TAB_CATEGORY} sx={{ padding: 0 }}>
                <GroupCards
                  data={postListByCategory}
                  length={postListByCategory?.length}
                  isClamp
                />
              </TabPanel>
            </TabContext>
          </>
        )}
        {/* <SEO
        title={nextPost.title}
        description={nextPost.description}
        image={nextPost.image}
        video={nextPost.video}
        url={nextPost.url}
      /> */}
        {/* <Separator className="is-style-default" />
      <Article
        title={nextPost.title}
        categories={nextPost.categories.nodes}
        blocks={nextPost.blocks}
        isPreview={nextPost.isPreview}
        href={nextPost.href}
        image={nextPost.image}
      /> */}
      </div>
    );
  },
);

Offer.displayName = "Offer";
export default Offer;
