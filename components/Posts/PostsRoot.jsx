import { gql } from "@apollo/client";

import PostAndGroupCards from "./PostAndGroupCards/PostAndGroupCards";
import PostNotGroupCards from "./PostNotGroupCards/PostNotGroupCards";

export const PostsRoot = ({ postNodes, isGroupCards = true }) =>
  isGroupCards ? (
    <PostAndGroupCards data={postNodes} />
  ) : (
    <PostNotGroupCards data={postNodes} />
  );

export const POSTS_PAGINATION_GQL = gql`
  query GetPostsPagination($cursor: String, $first: Int!, $tagNotIn: [ID]) {
    posts(after: $cursor, first: $first, where: { tagNotIn: $tagNotIn }) {
      nodes {
        id
        tags {
          nodes {
            tagId
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

export const POSTS_PAGINATION_BY_CATEGORY_GQL = gql`
  query GetPostsPaginationByCategory($id: ID!, $cursor: String, $first: Int!) {
    category(id: $id, idType: SLUG) {
      posts(after: $cursor, first: $first) {
        nodes {
          id
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

export const postGQL = {
  fragments: gql`
    fragment postGQL on Post {
      id
      databaseId
      isSticky
      title
      uri
      categories {
        nodes {
          termTaxonomyId
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
    }
  `,
};

export const FETCH_ARTICLES = gql`
  query FetchArticles(
    $cursor: String
    $first: Int
    $categoryIn: [ID]
    $notIn: [ID]
    $tagIn: [ID]
    $tagNotIn: [ID]
    $dateQuery: DateQueryInput
    $search: String
  ) {
    posts(
      after: $cursor
      first: $first
      where: {
        categoryIn: $categoryIn
        notIn: $notIn
        tagIn: $tagIn
        tagNotIn: $tagNotIn
        dateQuery: $dateQuery
        search: $search
      }
    ) {
      nodes {
        ...postGQL
        tags {
          nodes {
            count
            description
            id
            tagId
            name
            slug
            posts {
              nodes {
                ...postGQL
              }
            }
          }
        }
      }
      pageInfo {
        endCursor
      }
    }
  }
  ${postGQL.fragments}
`;

export const postSlugByID = gql`
  query postSlugByID($cursor: String, $first: Int) {
    posts(after: $cursor, first: $first) {
      nodes {
        ...postGQL
        tags {
          nodes {
            count
            description
            id
            name
            slug
            posts {
              nodes {
                ...postGQL
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
  ${postGQL.fragments}
`;

export const fetchArticlesByCategory = gql`
  query FetchArticlesByCategory($id: ID!, $cursor: String, $first: Int!) {
    category(id: $id, idType: SLUG) {
      posts(after: $cursor, first: $first) {
        nodes {
          ...postGQL
          categories {
            nodes {
              slug
            }
          }
        }
        pageInfo {
          endCursor
        }
      }
    }
  }
  ${postGQL.fragments}
`;
