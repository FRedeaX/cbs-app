"use client";

import { Typography } from "@mui/material";
import { FC } from "react";

import { CarouselRoot } from "@/components/Carousel/CarouselRoot";
import { Link } from "@/components/UI/Link/Link";
import { HeroCard, HeroCardItem } from "src/entities/card/Hero";
import { PostCard, PostCardItem } from "src/entities/card/Post";

type HeroProps = {
  /**
   * @default Widget
   */
  template?: "Widget" | "WidgetWithDeteiled";
  title: string;
  uri: string;
  data: (HeroCardItem & PostCardItem & { id: string })[];
};

export const HomeHero: FC<HeroProps> = ({ template, title, uri, data }) => (
  <div sx={{ paddingY: "var(--gap)" }}>
    <Typography variant="sectionTitle">
      <Link href={uri} underline="hover" color="inherit">
        {title}
      </Link>
    </Typography>
    <CarouselRoot
      itemMargin={5}
      isButtonsOnSides={false}
      isResponsiveWidthsChildren>
      {data.map((item) => {
        if (template === "WidgetWithDeteiled") {
          return <PostCard key={item.id} data={item} lineClamp={6} />;
        }

        return <HeroCard key={item.id} data={item} />;
      })}
    </CarouselRoot>
  </div>
);
