/* eslint-disable no-console */
// import { errorHelper } from "../../errorHendler";
// eslint-disable-next-line import/no-cycle
import { removeDuplicateTag } from "..";
import { client } from "../../../store/apollo-client";
import clientRedis from "../../../store/redis";
import { pullIDs, setFeed } from "../post/feed";

/**
 *
 * @param {key}
 * @param {query} GraphQl запрос
 * @param {endCursor} последний курсор из 1 выборки (0-10 пост) для ревалидации
 * @param {category} категория, передается в {query} для выборки по пути /post/category/[переданная категория]
 * @returns {pagination} = {
    pages: общее количество страниц
    cursor: курсор следующей страницы,
    tags: массив, теги встречающийся в выборке на предыдущей странице
  };
 */
const paginationLoad = async ({ key, query, endCursor, category = "" }) => {
  let pagination;

  try {
    const response = await clientRedis.get(key);
    pagination = await JSON.parse(response);
  } catch (error) {
    console.error(error);
    pagination = null;
  }

  if (
    (pagination !== null && endCursor === pagination[1]?.cursor) ||
    (pagination !== null && endCursor === undefined)
  ) {
    console.log(`load pagination: ${key}`);
    return pagination;
  }

  pagination = [{ number: 1, cursor: "", tags: [] }];

  // pagination = {
  //   pages: 1,
  //   cursors: [""],
  //   tags: []
  // };

  let isNextPage = true;
  const postsIDs = [];
  while (isNextPage) {
    const length = pagination.length - 1;
    // eslint-disable-next-line no-await-in-loop
    const { data } = await client.query({
      query,
      variables: {
        id: category,
        cursor: pagination[length].cursor,
        first: length === 0 ? 10 : 20,
        tagNotIn: pagination[length].tags,
      },
      fetchPolicy: "network-only",
    });

    if (data === undefined) break;

    let pageInfo;
    let tags;
    switch (query.definitions[0].name.value) {
      case "GetPostsPaginationByCategory":
        pageInfo = data.category.posts.pageInfo;
        break;
      default:
        pageInfo = data.posts.pageInfo;
        // eslint-disable-next-line no-await-in-loop
        tags = await removeDuplicateTag(data.posts.nodes).then((response) =>
          response.arrTags.length
            ? [...response.arrTags, ...pagination[length]?.tags]
            : [],
        );
        // console.log();
        postsIDs.push(...pullIDs(data.posts.nodes));
        break;
    }

    isNextPage = pageInfo.hasNextPage;
    pagination.push({
      number: pagination.length + 1,
      cursor: pageInfo.endCursor,
      tags,
    });
    // if (process.env.NODE_ENV === "development" && length === 15)
    //   isNextPage = false;
  }

  console.warn(`fetch pagination: ${key}`);

  try {
    clientRedis.set(key, JSON.stringify(pagination));
    setFeed(key, postsIDs);
  } catch (error) {
    console.error(error);
  }

  return pagination;
};

export default paginationLoad;
