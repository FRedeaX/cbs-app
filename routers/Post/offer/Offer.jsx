import { TabContext } from "@mui/lab";
import TabList from "@mui/lab/TabList";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { forwardRef, useState } from "react";

import GroupCards from "../../../components/Posts/GroupCards/GroupCards";
import classes from "./Offer.module.css";

const TAB_SIMILAR = "similarPostList";
const TAB_CATEGORY = "postListByCategory";

// eslint-disable-next-line react/display-name
const Offer = forwardRef((props, ref) => {
  const [value, setValue] = useState(
    props[TAB_SIMILAR]?.length > 0 ? TAB_SIMILAR : TAB_CATEGORY,
  );
  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.block} ref={ref}>
      {(props[TAB_SIMILAR]?.length > 0 || props[TAB_CATEGORY]?.length > 0) && (
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
                  value={TAB_SIMILAR}
                  disabled={!(props[TAB_SIMILAR]?.length > 0)}
                />
                <Tab label="По категории" value={TAB_CATEGORY} />
              </TabList>
            </Box>
          </TabContext>
          <GroupCards
            data={props[value]}
            length={props[value]?.length}
            isClamp
          />
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
});

export default Offer;