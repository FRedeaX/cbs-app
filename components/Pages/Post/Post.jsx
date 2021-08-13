import { gql } from "@apollo/client";
import { Blocks } from "~/components/blocks/Blocks";
// import { Content } from "~/components/Pages/Page/Content/Content";
import Category from "~/components/Posts/Category/Category";
import { Heading } from "../../blocks/Heading/Heading";
// import { createMarkup } from "~/helpers";
import classes from "./Post.module.css";
import { columnsBlockGQL } from "./../../blocks/Columns/Columns";
import { embedBlockGQL } from "./../../blocks/Embed/Embed";
import { fileBlockGQL } from "./../../blocks/File/File";
import { galleryBlockGQL } from "./../../blocks/Gallery/Gallery";
import { headingBlockGQL } from "./../../blocks/Heading/Heading";
import { htmlBlockGQL } from "./../../blocks/Html/Html";
import { imageBlockGQL } from "./../../blocks/Image/Image";
import { listBlockGQL } from "./../../blocks/List/List";
// import { mediaTextBlockGQL } from "./../../blocks/MediaText/MediaText";
import { paragraphBlockGQL } from "./../../blocks/Paragraph/Paragraph";
import { quoteBlockGQL } from "./../../blocks/Quote/Quote";
import { separatorBlockGQL } from "./../../blocks/Separator/Separator";
import { spacerBlockGQL } from "./../../blocks/Spacer/Spacer";
import { tableBlockGQL } from "./../../blocks/Table/Table";
import { verseBlockGQL } from "./../../blocks/Verse/Verse";

export const Post = ({ title, categories, blocks }) => {
  return (
    <article className={classes.container}>
      <div className={classes.header}>
        <Heading level={"1"}>{title}</Heading>
        {/* <h1
          className={classes.title}
          // dangerouslySetInnerHTML={createMarkup(title)}
        >
          {title}
        </h1> */}
        <div className={classes.category}>
          <Category data={categories} cls={classes["category-link"]} />
        </div>
      </div>
      {blocks && <Blocks blocks={blocks} />}
    </article>
  );
};

export const FETCH_ARTICLE = gql`
  query fetchArticle($id: ID!, $type: PostIdType, $isPreview: Boolean) {
    post(id: $id, idType: $type, asPreview: $isPreview) {
      categories {
        nodes {
          id
          name
          uri
        }
      }
      content
      excerpt
      featuredImage {
        node {
          sourceUrl(size: THUMBNAIL)
        }
      }
      id
      title
    }
  }
`;

export const GET_POST_CONTENT_BY_BLOCKS = gql`
  query fetchArticle($id: ID!, $type: PostIdType, $isPreview: Boolean) {
    post(id: $id, idType: $type, asPreview: $isPreview) {
      blocks {
        name
        ...paragraphBlockGQL
        ...galleryBlockGQL
        ...imageBlockGQL
        ...columnsBlockGQL
        ...htmlBlockGQL
        ...embedBlockGQL
        ...separatorBlockGQL
        ...quoteBlockGQL
        ...listBlockGQL
        ...fileBlockGQL
        ...spacerBlockGQL
        ...headingBlockGQL
        ...tableBlockGQL
        ...verseBlockGQL
      }
      categories {
        nodes {
          id
          name
          uri
        }
      }
      excerpt
      featuredImage {
        node {
          sourceUrl(size: THUMBNAIL)
        }
      }
      id
      title
    }
  }
  ${paragraphBlockGQL.fragments}
  ${galleryBlockGQL.fragments}
  ${imageBlockGQL.fragments}
  ${columnsBlockGQL.fragments}
  ${embedBlockGQL.fragments}
  ${htmlBlockGQL.fragments}
  ${separatorBlockGQL.fragments}
  ${quoteBlockGQL.fragments}
  ${listBlockGQL.fragments}
  ${fileBlockGQL.fragments}
  ${spacerBlockGQL.fragments}
  ${headingBlockGQL.fragments}
  ${tableBlockGQL.fragments}
  ${verseBlockGQL.fragments}
`;
