/* eslint-disable camelcase */
import { gql } from "@apollo/client";
import { NextApiRequest, NextApiResponse } from "next";

import { esClient } from "@/lib/elastic/client";
import { splitDepartmentAndCategories } from "@/helpers/backend";
import {
  PageInfo,
  recursiveLoadParties,
} from "@/helpers/backend/recursiveLoadParties";

const GET_POSTS = gql`
  query GET_POSTS($cursor: String, $first: Int) {
    posts(after: $cursor, first: $first) {
      nodes {
        id
        link
        title
        excerpt
        content
        date
        featuredImage {
          node {
            sourceUrl(size: THUMBNAIL)
          }
        }
        categories {
          nodes {
            id
            name
            slug
            uri
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
  date: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
  categories: {
    nodes: {
      id: string;
      name: string;
      slug: string;
      uri: string;
    }[];
  };
}

interface IPosts {
  posts: {
    nodes: IPost[];
    pageInfo: PageInfo;
  };
}

const callbackFn = async ({ posts: postList }: IPosts): Promise<void> => {
  const operations = postList.nodes.flatMap((post) => {
    const { categories, departments } = splitDepartmentAndCategories(
      post.categories.nodes,
    );

    // const title_suggest = post.title
    //   .replace(/[!:'"«»“”()\\[\]]+/g, "")
    //   .split(/[—,-.– ]+/);

    return [
      { index: { _index: process.env.ES_INDEX_NAME, _id: post.id } },
      {
        link: post.link,
        title: post.title,
        // title_suggest,
        excerpt: post.excerpt,
        content: post.content.replaceAll(/<[^>]*>?/gm, ""),
        date: post.date,
        thumbnail: { url: post.featuredImage?.node.sourceUrl || "" },
        categories: categories.nodes.flatMap(({ id, name, slug, uri }) => [
          { id, name, slug, uri },
        ]),
        departments: departments.nodes.flatMap(({ id, name, slug, uri }) => [
          { id, name, slug, uri },
        ]),
      },
    ];
  });

  await esClient.bulk({ refresh: true, body: operations });
};

const pageInfoCallback = ({ posts }: IPosts): PageInfo => posts.pageInfo;

export default function sync(req: NextApiRequest, res: NextApiResponse) {
  const { key } = req.query;

  if (typeof key !== "string" || key !== process.env.API_ES_KEY) {
    res.status(403).end();
  }

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
