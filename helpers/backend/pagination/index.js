import { client } from "~/store/apollo-client";
import { clientRedis } from "../../../store/redis";
// import { errorHelper } from "../../errorHendler";
import { removeDuplicateTag } from "../removeDuplicateTag";

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
export const paginationLoad = async ({
  key,
  query,
  endCursor,
  category = "",
}) => {
  let pagination = await clientRedis
    .get(key)
    .then((response) => JSON.parse(response))
    .catch((e) => console.error(e));

  // при частом фетче пересмотреть механизм обновления пагинации
  // вынести фетч на этап сборки и отдовать имеющиеся устаревшие данные
  // предусмотреть вариант однократного прифетча данных при обновления
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
  while (isNextPage) {
    const length = pagination.length - 1;
    let { data } = await client.query({
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

    let pageInfo, tags;
    switch (query.definitions[0].name.value) {
      case "GetPostsPaginationByCategory":
        pageInfo = data.category.posts.pageInfo;
        break;
      default:
        pageInfo = data.posts.pageInfo;
        tags = await removeDuplicateTag(data.posts.nodes)
          // если будут дублироваться коллекции постов,
          // то пересмотреть механизм добавления
          .then((response) =>
            response.arrTags.length
              ? [...response.arrTags, ...pagination[length]?.tags]
              : []
          );
        break;
    }

    isNextPage = pageInfo.hasNextPage;
    pagination.push({
      number: pagination.length + 1,
      cursor: pageInfo.endCursor,
      tags,
    });
    // if (isNextPage) {
    // if (tags !== undefined) pagination[length] = { ...pagination[length], tags };
    // pagination.pages++;
    // pagination.cursors.push(pageInfo.endCursor)
    // pagination.push({
    //   number: pagination.length + 1,
    //   cursor: pageInfo.endCursor,
    // });
    // }
    // if (process.env.NODE_ENV === "development" && length === 15)
    //   isNextPage = false;
  }

  console.warn(`fetch pagination: ${key}`);
  clientRedis.set(key, JSON.stringify(pagination));
  return pagination;
};
