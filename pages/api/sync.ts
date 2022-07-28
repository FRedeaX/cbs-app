import { gql } from "@apollo/client";
import { NextApiRequest, NextApiResponse } from "next";

import { esClient } from "../../core/elastic-client";
import { delay } from "../../helpers";
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
        content
        featuredImage {
          node {
            sourceUrl(size: THUMBNAIL)
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
//       blocks {
//         name
//         ...paragraphBlockGQL
//         ...quoteBlockGQL
//         ...listBlockGQL
//         ...mediaTextBlockGQL
//         ...headingBlockGQL
//         ...verseBlockGQL
//       }
// ${paragraphBlockGQL.fragments}
// ${quoteBlockGQL.fragments}
// ${listBlockGQL.fragments}
// ${mediaTextBlockGQL.fragments}
// ${headingBlockGQL.fragments}
// ${verseBlockGQL.fragments}

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
  content: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
  categories: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
  // blocks: Array<IBlock>;
}

// function flatBlock(blockList: Array<IBlock>): string {
//   // if (!blockList) return "";

//   return blockList
//     .map((block: IBlock): string => {
//       switch (block.name) {
//         case "core/paragraph":
//         case "core/heading":
//         case "core/verse": {
//           return block.attributes.content;
//         }

//         case "core/quote":
//         case "core/pullquote":
//         case "core/list": {
//           return block.attributes.value;
//         }

//         case "core/columns":
//         case "core/column":
//         case "core/media-text": {
//           return block.innerBlocks && flatBlock(block.innerBlocks);
//         }

//         default:
//           return "";
//       }
//     })
//     .join(" ")
//     .replaceAll(/<[^>]*>?/gm, "");
// }

let count = 0;
async function indexesParties(after: string): Promise<void> {
  try {
    const {
      data: { posts: postList },
    } = await client.query({
      query: GET_POSTS,
      variables: {
        first: 20,
        after,
      },
    });

    const operations = postList.nodes.flatMap((post: IPost) => [
      { index: { _index: process.env.ES_INDEX_NAME, _id: post.id } },
      {
        link: post.link,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content.replaceAll(/<[^>]*>?/gm, ""),
        thumbnail: { url: post.featuredImage?.node.sourceUrl || "" },
        category: post.categories.nodes.flatMap((cat) => [
          { name: cat.name, slug: cat.slug },
        ]),
      },
    ]);

    await esClient.bulk({ refresh: true, body: operations });

    count += postList.nodes.length;
    // console.log(count, postList.nodes[postList.nodes.length - 1].title);
    if (postList.pageInfo.hasNextPage) {
      await delay(1000).then(async () => {
        await indexesParties(postList.pageInfo.endCursor);
      });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

export default async function sync(req: NextApiRequest, res: NextApiResponse) {
  // const { id } = req.query || null;
  // if (id === null) res.status(500).end("query not found");

  // try {
  count = 0;
  await indexesParties("");

  // const count = await esClient.count({ index: process.env.ES_INDEX_NAME });
  res.status(200).json(`document sync: ${count}`);
  // } catch (error) {
  //   res.status(500).json({ message: "ERR_SYNC", error });
  // }
}
