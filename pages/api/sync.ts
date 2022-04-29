import { gql } from "@apollo/client";
// import { columnsBlockGQL } from "../../components/blocks/Columns/Columns";
import { headingBlockGQL } from "../../components/blocks/Heading/Heading";
import { listBlockGQL } from "../../components/blocks/List/List";
import { mediaTextBlockGQL } from "../../components/blocks/MediaText/MediaText";
import { paragraphBlockGQL } from "../../components/blocks/Paragraph/Paragraph";
import { quoteBlockGQL } from "../../components/blocks/Quote/Quote";
import { verseBlockGQL } from "../../components/blocks/Verse/Verse";
// import { delay } from "../../helpers";
import { esClient } from "../../core/elastic-client";
import { client } from "../../store/apollo-client";

// ...tableBlockGQL
const GET_POSTS = gql`
  query GET_POSTS($after: String, $first: Int) {
    posts(after: $after, first: $first) {
      nodes {
        id
        link
        title
        excerpt
        blocks {
          name
          ...paragraphBlockGQL
          ...quoteBlockGQL
          ...listBlockGQL
          ...mediaTextBlockGQL
          ...headingBlockGQL
          ...verseBlockGQL
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
  ${paragraphBlockGQL.fragments}
  ${quoteBlockGQL.fragments}
  ${listBlockGQL.fragments}
  ${mediaTextBlockGQL.fragments}
  ${headingBlockGQL.fragments}
  ${verseBlockGQL.fragments}
`;

interface IBlock {
  name: string;
  attributes: object;
  innerBlocks: Array<IBlock>;
}

interface IPost {
  id: string;
  link: string;
  title: string;
  excerpt: string;
  blocks: Array<IBlock>;
}

function flatBlock(blockList: Array<IBlock>): string {
  // if (!blockList) return "";

  return blockList
    .map((block: IBlock): string => {
      switch (block.name) {
        case "core/paragraph":
        case "core/heading":
        case "core/verse": {
          return block.attributes.content;
        }

        case "core/quote":
        case "core/pullquote":
        case "core/list": {
          return block.attributes.value;
        }

        case "core/columns":
        case "core/column":
        case "core/media-text": {
          return block.innerBlocks && flatBlock(block.innerBlocks);
        }

        default:
          return "";
      }
    })
    .join(" ");
}
let i = 0;
async function indexesNextParties(after: string): Promise<void> {
  const {
    data: { posts: postList },
  } = await client
    .query({
      query: GET_POSTS,
      variables: {
        first: after === "" ? 10 : 20,
        after,
      },
    })
    // .then(({ data }) => data.posts.nodes)
    .catch((err) => {
      throw new Error(err);
    });

  const operations = postList.nodes.flatMap((post: IPost) => [
    { index: { _index: process.env.ES_INDEX_NAME, _id: post.id } },
    {
      link: post.link,
      title: post.title,
      excerpt: post.excerpt,
      content: flatBlock(post.blocks),
    },
  ]);

  await esClient.bulk({ refresh: true, body: operations });

  console.log(
    "next if",
    postList.nodes.length,
    postList.nodes[postList.nodes.length - 1].title,
  );
  // if (postList.pageInfo.hasNextPage && i < 19) {
  //   console.log("if");
  //   i += 1;
  //   await delay(1000).then(async () => {
  //     await indexesNextParties(postList.pageInfo.endCursor);
  //   });
  // }
}

export default async function offers(req, res) {
  // const { id } = req.query || null;
  // if (id === null) res.status(500).end("query not found");

  // try {
  await indexesNextParties("");

  // const count = await esClient.count({ index: process.env.ES_INDEX_NAME });
  res.status(200).json({
    data: JSON.stringify({ status: 200 }),
  });
  // } catch (error) {
  //   res.status(500).json({ message: "ERR_SYNC", error });
  // }
}
