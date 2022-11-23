import { gql } from "@apollo/client";
import { NextApiRequest, NextApiResponse } from "next";

import { esClient } from "../../core/elastic-client";
import {
  _pageInfo,
  recursiveLoadParties,
  splitDepartmentAndCategories,
} from "../../helpers/backend";

const GET_POSTS = gql`
  query GET_POSTS($cursor: String, $first: Int) {
    posts(after: $cursor, first: $first) {
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
}

interface IPosts {
  posts: {
    nodes: IPost[];
    pageInfo: _pageInfo;
  };
}

const callbackFn = async ({ posts: postList }: IPosts): Promise<void> => {
  const operations = postList.nodes.flatMap((post) => {
    const { categories, departments } = splitDepartmentAndCategories(
      post.categories.nodes,
    );

    return [
      { index: { _index: process.env.ES_INDEX_NAME, _id: post.id } },
      {
        link: post.link,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content.replaceAll(/<[^>]*>?/gm, ""),
        thumbnail: { url: post.featuredImage?.node.sourceUrl || "" },
        categories: categories.nodes.flatMap((category) => [
          { name: category.name, slug: category.slug },
        ]),
        departments: departments.nodes.flatMap((department) => [
          { name: department.name, slug: department.slug },
        ]),
      },
    ];
  });

  await esClient.bulk({ refresh: true, body: operations });
};

const pageInfoCallback = ({ posts }: IPosts): _pageInfo => posts.pageInfo;

export default function sync(req: NextApiRequest, res: NextApiResponse) {
  const { key } = req.query;
  if (!(typeof key === "string" && key === process.env.ES_SYNC_KEY))
    res.status(403).end();

  try {
    recursiveLoadParties<IPosts>({
      query: GET_POSTS,
      variables: { first: 20 },
      callbackFn,
      pageInfoCallback,
      delayMS: 1000,
    });

    res.status(200).send("document has sync started");
  } catch (error) {
    res.status(500).json({ message: "ERR_SYNC", error });
  }
}
