/* eslint-disable import/no-cycle */

/* eslint-disable react/jsx-props-no-spreading */
import { useRouter } from "next/router";
import { FC } from "react";

import classes from "./Blocks.module.css";
import { Columns } from "./Columns/Columns";
import { Embed } from "./Embed/Embed";
import { File } from "./File/File";
import { Gallery } from "./Gallery2/Gallery";
import { Heading } from "./Heading/Heading";
import { Html } from "./Html/Html";
import { Figure } from "./Image/Figure";
import Image from "./Image/Image";
import { List } from "./List/List";
import { MediaText } from "./MediaText/MediaText";
import { Paragraph } from "./Paragraph/Paragraph";
import { Pullquote } from "./Pullquote/Pullquote";
import { Quote } from "./Quote/Quote";
import { Separator } from "./Separator/Separator";
import { Spacer } from "./Spacer/Spacer";
import { Table } from "./Table/Table";
import { Verse } from "./Verse/Verse";
import { Video } from "./Video/Video";

export type blocksType = {
  name: string;
  message: string;
  attributes: any;
  innerBlocks: blocksType;
  saveContent: any;
};

interface IBlocks {
  blocks: blocksType[];
  className?: { image: string };
}

const Blocks: FC<IBlocks> = ({ blocks, className, ...all }) => {
  const router = useRouter();
  // console.log(blocks);
  // console.log({ ...all });

  return (
    <div className={classes.root}>
      {blocks.map((block, index) => {
        const key = `${block?.name}_${index}`;
        switch (block?.name) {
          case "core/paragraph":
            return (
              <Paragraph
                key={key}
                {...block.attributes}
                className={block.attributes.className}
                {...all}
              />
            );

          case "core/gallery":
            return (
              <Gallery
                key={key}
                {...block.attributes}
                images={block.attributes.images}
              />
            );

          case "core/image": {
            const { caption, align, alt, url, width, height } =
              block.attributes;
            return (
              <Figure
                key={key}
                caption={caption}
                align={align}
                url={url}
                className={[block.attributes.className, className?.image]}>
                <Image alt={alt} url={url} width={width} height={height} />
              </Figure>
            );
          }
          case "core/columns":
            return <Columns key={key} innerBlocks={block.innerBlocks} />;

          case "core/embed":
            return <Embed key={key} {...block.attributes} />;

          case "core/video":
            return <Video key={key} {...block.attributes} />;

          case "core/html":
            return <Html key={key} html={block.saveContent} />;

          case "core/separator":
            return <Separator key={key} {...block.attributes} />;

          case "core/quote":
            return <Quote key={key} {...block.attributes} />;

          case "core/pullquote":
            return <Pullquote key={key} {...block.attributes} />;

          case "core/list":
            return <List key={key} {...block.attributes} />;

          case "core/media-text":
            return (
              <MediaText
                key={key}
                innerBlocks={block.innerBlocks}
                {...block.attributes}
              />
            );

          case "core/file":
            return <File key={key} {...block.attributes} />;

          case "core/spacer":
            return <Spacer key={key} height={block.attributes.height} />;

          case "core/heading":
            return <Heading key={key} {...block.attributes} />;

          case "core/table":
            return <Table key={key} {...block.attributes} />;

          case "core/verse":
            return <Verse key={key} {...block.attributes} />;

          case "core/more":
            return null;

          default: {
            // eslint-disable-next-line no-console
            console.warn({
              message: block.message || "Блок не найден",
              path: { asPath: router.asPath, route: router.route },
              name: block.name,
            });
            return null;
          }
        }
      })}
    </div>
  );
};

export default Blocks;

// export const blocksGQL = {
//   fragments: gql`
//     fragment blocksGQL on Block {
//       name
//       ...paragraphBlockGQL
//       ...galleryBlockGQL
//       ...imageBlockGQL
//       ...columnsBlockGQL
//       ...htmlBlockGQL
//       ...embedBlockGQL
//       ...separatorBlockGQL
//       ...quoteBlockGQL
//       ...listBlockGQL
//       ...mediaTextBlockGQL
//       ...fileBlockGQL
//       ...spacerBlockGQL
//       ...headingBlockGQL
//       ...tableBlockGQL
//     }
//     ${paragraphBlockGQL.fragments}
//     ${galleryBlockGQL.fragments}
//     ${imageBlockGQL.fragments}
//     ${columnsBlockGQL.fragments}
//     ${embedBlockGQL.fragments}
//     ${htmlBlockGQL.fragments}
//     ${separatorBlockGQL.fragments}
//     ${quoteBlockGQL.fragments}
//     ${listBlockGQL.fragments}
//     ${mediaTextBlockGQL.fragments}
//     ${fileBlockGQL.fragments}
//     ${spacerBlockGQL.fragments}
//     ${headingBlockGQL.fragments}
//     ${tableBlockGQL.fragments}
//   `,
// };

// конфликт типов поля value String and String!
// ...pullquoteBlockGQL
// ...quoteBlockGQL
// ${pullquoteBlockGQL.fragments}
