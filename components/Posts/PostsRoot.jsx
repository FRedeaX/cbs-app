import { gql } from "@apollo/client";

export const postGQL = {
  fragments: gql`
    fragment postGQL on Post {
      id
      databaseId
      isSticky
      title
      uri
      link
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
