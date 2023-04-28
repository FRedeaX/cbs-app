/* eslint-disable react/jsx-props-no-spreading */
import { useRouter } from "next/router";
import { FC } from "react";

import { TransformEmbedBlock } from "../../core/backend/transformBlocks/blocks/embed/transformEmbedBlock";
import { TransformFileBlock } from "../../core/backend/transformBlocks/blocks/file/transformFileBlock";
import { TransformGalleryBlock } from "../../core/backend/transformBlocks/blocks/gallery/transformGalleryBlock";
import { TransformImageBlock } from "../../core/backend/transformBlocks/blocks/image/transformImageBlock";
import { TransformMediaTextBlock } from "../../core/backend/transformBlocks/blocks/mediaText/transformMediaTextBlock";
import {
  TransformBlocks,
  TransformErrorBlock,
} from "../../core/backend/transformBlocks/utils/type";
import { exceptionLog } from "../../helpers";
import classes from "./Blocks.module.css";
import { Columns } from "./Columns/Columns";
import { Column } from "./Columns/components/Column/Column";
import { СolumnBlockGQL, СolumnsBlockGQL } from "./Columns/utils/columnsGQL";
import { Embed } from "./Embed/Embed";
import { File } from "./File/File";
import { Gallery } from "./Gallery/Gallery";
import { Heading } from "./Heading/Heading";
import { HeadingBlockGQL } from "./Heading/utils/headingGQL";
import { Html } from "./Html/Html";
import { HtmlBlockGQL } from "./Html/utils/htmlGQL";
import { Image } from "./Image/Image";
import { List } from "./List/List";
import { ListItem } from "./List/components/Item/List.Item";
import { ListBlockGQL, ListItemBlockGQL } from "./List/utils/listGQL";
import { MediaText } from "./MediaText/MediaText";
import { convertClassNameToArray } from "./MediaText/utils";
import { Paragraph } from "./Paragraph/Paragraph";
import { ParagraphBlockGQL } from "./Paragraph/utils/paragraphGQL";
import { Pullquote } from "./Pullquote/Pullquote";
import { PullquoteBlockGQL } from "./Pullquote/utils/pullquoteGQL";
import { Quote } from "./Quote/Quote";
import { QuoteBlockGQL } from "./Quote/utils/quoteGQL";
import { Separator } from "./Separator/Separator";
import { SeparatorBlockGQL } from "./Separator/utils/separatorGQL";
import { Spacer } from "./Spacer/Spacer";
import { SpacerBlockGQL } from "./Spacer/utils/spacerGQL";
import { Table } from "./Table";
import { TableBlockGQL } from "./Table/utils/tableGQL";
import { Verse } from "./Verse/Verse";
import { VerseBlockGQL } from "./Verse/utils/verseGQL";
import { Video } from "./Video/Video";
import { VideoBlockGQL } from "./Video/utils/videoGQL";

type BlocksProps = {
  blocks: (TransformBlocks & Pick<TransformErrorBlock, "message">)[];
  /**
   * Убирает левый и правый отступ у медиа блоков,
   * когда экран меньше ширины контента.
   * @default true
   */
  isMediaStickySides?: boolean;
};

const Blocks: FC<BlocksProps> = ({ blocks, isMediaStickySides = true }) => {
  const router = useRouter();
  // console.log(blocks);

  /**
   * Известные причины:
   * - глубина вложенных списков больше 5;
   */
  if (blocks === undefined) {
    exceptionLog(`blocks of undefined`);
    return null;
  }
  return (
    <>
      {blocks.map((block, index) => {
        const key = `${block.name}_${index}`;
        switch (block.name) {
          case "core/paragraph": {
            const { attributes }: TransformBlocks<ParagraphBlockGQL> = block;

            return (
              <Paragraph
                key={key}
                align={attributes.align || undefined}
                anchor={attributes.anchor}
                content={attributes.content}
                fontSize={attributes.fontSize || undefined}
                textColor={attributes.textColor || undefined}
                backgroundColor={attributes.backgroundColor || undefined}
                style={attributes.style}
                className={[
                  classes.block,
                  classes.Paragraph,
                  attributes.className,
                ]}
              />
            );
          }
          case "core/gallery": {
            const { attributes }: TransformBlocks<TransformGalleryBlock> =
              block;

            return (
              <Gallery
                key={key}
                caption={attributes.caption}
                images={attributes.images}
                className={[
                  classes.block,
                  { [classes.media]: isMediaStickySides },
                  attributes.className,
                ]}
              />
            );
          }

          case "core/image": {
            const { attributes }: TransformBlocks<TransformImageBlock> = block;

            return (
              <Image
                key={key}
                align={attributes.align || undefined}
                anchor={attributes.anchor}
                alt={attributes.alt}
                src={attributes.url}
                width={attributes.width}
                height={attributes.height}
                blurDataURL={attributes.blurDataURL}
                className={[
                  classes.block,
                  { [classes.media]: isMediaStickySides },
                  attributes.className,
                ]}
              />
            );
          }
          case "core/columns": {
            const { attributes }: TransformBlocks<СolumnsBlockGQL> = block;

            return (
              <Columns
                key={key}
                anchor={attributes.anchor}
                isStackedOnMobile={attributes.isStackedOnMobile}
                fontSize={attributes.fontSize || undefined}
                textColor={attributes.textColor || undefined}
                backgroundColor={attributes.backgroundColor || undefined}
                gradient={attributes.gradient || undefined}
                borderColor={attributes.backgroundColor || undefined}
                style={attributes.style}
                className={[classes.block, attributes.className]}>
                <Blocks blocks={block.innerBlocks} />
              </Columns>
            );
          }

          case "core/column": {
            const { attributes }: TransformBlocks<СolumnBlockGQL> = block;

            return (
              <Column
                key={key}
                anchor={attributes.anchor}
                verticalAlignment={attributes.verticalAlignment || undefined}
                width={attributes.width}
                className={attributes.className}>
                <Blocks blocks={block.innerBlocks} isMediaStickySides={false} />
              </Column>
            );
          }

          case "core/embed": {
            const { attributes }: TransformBlocks<TransformEmbedBlock> = block;

            return (
              <Embed
                key={key}
                aspectRatio={attributes.aspectRatio}
                html={attributes.html}
                url={attributes.url}
                caption={attributes.caption}
                className={[
                  classes.block,
                  { [classes.media]: isMediaStickySides },
                ]}
              />
            );
          }

          case "core/video": {
            const { attributes }: TransformBlocks<VideoBlockGQL> = block;

            return (
              <Video
                key={key}
                anchor={attributes.anchor}
                caption={attributes.caption}
                autoplay={attributes.autoplay}
                controls={attributes.controls}
                loop={attributes.loop}
                muted={attributes.muted}
                playsInline={attributes.playsInline}
                poster={attributes.poster}
                preload={attributes.preload}
                src={attributes.src}
                className={[
                  classes.block,
                  { [classes.media]: isMediaStickySides },
                  attributes.className,
                ]}
              />
            );
          }

          case "core/html": {
            const { saveContent }: TransformBlocks<HtmlBlockGQL> = block;

            return (
              <Html
                key={key}
                content={saveContent}
                className={[
                  classes.block,
                  { [classes.media]: isMediaStickySides },
                ]}
              />
            );
          }

          case "core/separator": {
            const { attributes }: TransformBlocks<SeparatorBlockGQL> = block;

            return (
              <Separator
                key={key}
                anchor={attributes.anchor}
                variant={attributes.className || undefined}
                className={classes.block}
                backgroundColor={attributes.backgroundColor}
                gradient={attributes.gradient}
                style={attributes.style}
              />
            );
          }

          case "core/quote": {
            const { attributes }: TransformBlocks<QuoteBlockGQL> = block;

            return (
              <Quote
                key={key}
                align={attributes.align || undefined}
                anchor={attributes.anchor}
                citation={attributes.citation}
                className={classes.block}>
                <Blocks blocks={block.innerBlocks} />
              </Quote>
            );
          }

          case "core/pullquote": {
            const { attributes }: TransformBlocks<PullquoteBlockGQL> = block;

            return (
              <Pullquote
                key={key}
                anchor={attributes.anchor}
                value={attributes.value}
                citation={attributes.citation}
                textAlign={attributes.textAlign || undefined}
                backgroundColor={attributes.backgroundColor || undefined}
                borderColor={attributes.borderColor || undefined}
                gradient={attributes.gradient || undefined}
                style={attributes.style}
                textColor={attributes.textColor || undefined}
                className={classes.block}
              />
            );
          }

          case "core/list": {
            const { attributes }: TransformBlocks<ListBlockGQL> = block;

            // Поскольку нумерованный список по умолчанию из админки возвращает 0,
            // пропускаем этот параметр (`start`), чтобы нумерация начиналась с 1
            return (
              <List
                key={key}
                anchor={attributes.anchor}
                ordered={attributes.ordered}
                reversed={attributes.reversed}
                start={attributes.start || undefined}
                type={attributes.type || undefined}
                fontSize={attributes.fontSize || undefined}
                textColor={attributes.textColor || undefined}
                backgroundColor={attributes.backgroundColor || undefined}
                gradient={attributes.gradient || undefined}
                style={attributes.style}
                className={[classes.block, classes.List]}>
                <Blocks blocks={block.innerBlocks} />
              </List>
            );
          }

          case "core/list-item": {
            const {
              attributes,
            }: TransformBlocks<ListItemBlockGQL<ListBlockGQL>> = block;

            return (
              <ListItem
                key={key}
                content={attributes.content}
                fontSize={attributes.fontSize || undefined}
                style={attributes.style}
                className={attributes.className}>
                <Blocks blocks={block.innerBlocks} />
              </ListItem>
            );
          }

          case "core/media-text": {
            const {
              attributes,
              innerBlocks,
            }: TransformBlocks<TransformMediaTextBlock> = block;

            const isFloat = Boolean(
              convertClassNameToArray(attributes.className).find(
                (cn) => cn === "float",
              ),
            );

            return (
              <MediaText
                key={key}
                anchor={attributes.anchor}
                fontSize={attributes.fontSize || undefined}
                textColor={attributes.textColor || undefined}
                backgroundColor={attributes.backgroundColor || undefined}
                gradient={attributes.gradient || undefined}
                style={attributes.style}
                imageFill={attributes.imageFill}
                focalPoint={attributes.focalPoint}
                mediaAlt={attributes.mediaAlt}
                mediaPosition={attributes.mediaPosition}
                mediaUrl={attributes.mediaUrl}
                mediaWidth={attributes.mediaWidth}
                verticalAlignment={attributes.verticalAlignment || undefined}
                isFloat={isFloat}
                width={attributes.width}
                height={attributes.height}
                blurDataURL={attributes.blurDataURL}
                className={[
                  classes.block,
                  { [classes.media]: isMediaStickySides },
                ]}>
                <Blocks blocks={innerBlocks} />
              </MediaText>
            );
          }
          case "core/file": {
            const { attributes }: TransformBlocks<TransformFileBlock> = block;

            return (
              <File
                key={key}
                align={attributes.align || undefined}
                anchor={attributes.anchor}
                displayPreview={attributes.displayPreview}
                previewHeight={attributes.previewHeight}
                fileName={attributes.fileName}
                href={attributes.href}
                showDownloadButton={attributes.showDownloadButton}
                textLinkTarget={attributes.textLinkTarget || undefined}
                fileSize={attributes.fileSize}
                className={[classes.block, classes.File]}
              />
            );
          }
          case "core/spacer": {
            const { attributes }: TransformBlocks<SpacerBlockGQL> = block;

            return (
              <Spacer
                key={key}
                anchor={attributes.anchor}
                height={attributes.height}
              />
            );
          }

          case "core/heading": {
            const { attributes }: TransformBlocks<HeadingBlockGQL> = block;

            return (
              <Heading
                key={key}
                anchor={attributes.anchor}
                content={attributes.content}
                level={attributes.level}
                textAlign={attributes.textAlign || undefined}
                backgroundColor={attributes.backgroundColor || undefined}
                fontSize={attributes.fontSize || undefined}
                gradient={attributes.gradient || undefined}
                textColor={attributes.textColor || undefined}
                style={attributes.style}
                className={[classes.block, classes.Heading]}
              />
            );
          }

          case "core/table": {
            const { attributes }: TransformBlocks<TableBlockGQL> = block;
            const isStyleStripes = Boolean(
              convertClassNameToArray(attributes.className).find(
                (cn) => cn === "is-style-stripes",
              ),
            );

            return (
              <Table
                key={key}
                anchor={attributes.anchor}
                hasFixedLayout={attributes.hasFixedLayout}
                head={attributes.head}
                body={attributes.body}
                foot={attributes.foot}
                selected={isStyleStripes}
                backgroundColor={attributes.backgroundColor || undefined}
                borderColor={attributes.borderColor || undefined}
                fontSize={attributes.fontSize || undefined}
                gradient={attributes.gradient || undefined}
                textColor={attributes.textColor || undefined}
                style={attributes.style}
                className={classes.block}
              />
            );
          }

          case "core/verse": {
            const { attributes }: TransformBlocks<VerseBlockGQL> = block;

            return (
              <Verse
                key={key}
                anchor={attributes.anchor}
                textAlign={attributes.textAlign || undefined}
                content={attributes.content}
                fontSize={attributes.fontSize || undefined}
                textColor={attributes.textColor || undefined}
                backgroundColor={attributes.backgroundColor || undefined}
                gradient={attributes.gradient || undefined}
                style={attributes.style}
                className={classes.block}
              />
            );
          }
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
    </>
  );
};

export default Blocks;

// export const blocksGQL = {
//   fragments: gql`
//     fragment blocksGQL on Block {
//       ...columnsBlockGQL
//       ...embedBlockGQL
//       ...fileBlockGQL
//       ...galleryBlockGQL
//       ...headingBlockGQL
//       ...htmlBlockGQL
//       ...imageBlockGQL
//       ...listBlockGQL
//       ...mediaTextBlockGQL
//       ...paragraphBlockGQL
//       ...pullquoteBlockGQL
//       ...quoteBlockGQL
//       ...separatorBlockGQL
//       ...spacerBlockGQL
//       ...tableBlockGQL
//       ...verseBlockGQL
//       ...videoBlockGQL
//     }
//     ${columnsBlockGQL.fragments}
//     ${embedBlockGQL.fragments}
//     ${fileBlockGQL.fragments}
//     ${galleryBlockGQL.fragments}
//     ${headingBlockGQL.fragments}
//     ${htmlBlockGQL.fragments}
//     ${imageBlockGQL.fragments}
//     ${listBlockGQL.fragments}
//     ${mediaTextBlockGQL.fragments}
//     ${paragraphBlockGQL.fragments}
//     ${pullquoteBlockGQL.fragments}
//     ${quoteBlockGQL.fragments}
//     ${separatorBlockGQL.fragments}
//     ${spacerBlockGQL.fragments}
//     ${tableBlockGQL.fragments}
//     ${verseBlockGQL.fragments}
//     ${videoBlockGQL.fragments}
//   `,
// };
