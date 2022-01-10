// import { client } from "~/store/apollo-client";
// import { paginationVar } from "~/store/variables/pagination";
// import { removeDuplicateTag } from "../post";

// export const paginationLoad = async (
//   key,
//   query,
//   variables,
//   fetchPolicy = "cache-first"
// ) => {
//   // Нет ревалидации?
//   const pagination = paginationVar()?.[key];
//   if (pagination !== undefined) {
//     console.log(`load paginationVar: ${key}`);
//     return pagination;
//   }

//   const pages = [{ number: 1, cursor: "", tags: [] }];
//   let isNextPage = true;

//   while (isNextPage) {
//     const length = pages.length - 1;
//     const { data } = await client.query({
//       query,
//       variables: {
//         id: variables,
//         cursor: pages[length].cursor,
//         first: length === 0 ? 10 : 20,
//         tagNotIn: pages[length - 1]?.tags,
//       },
//       fetchPolicy,
//     });

//     let pageInfo;
//     let tags;
//     switch (query.definitions[0].name.value) {
//       case "GetPostsPaginationByCategory":
//         pageInfo = data.category.posts.pageInfo;
//         break;
//       default:
//         pageInfo = data.posts.pageInfo;
//         const arr = await removeDuplicateTag(data.posts.nodes);
//         tags = arr.arrTags;
//         break;
//     }

//     isNextPage = pageInfo.hasNextPage;
//     if (isNextPage) {
//       if (tags !== undefined) pages[length] = { ...pages[length], tags };
//       pages.push({
//         number: pages.length + 1,
//         cursor: pageInfo.endCursor,
//       });
//     }
//     if (process.env.NODE_ENV === "development" && length === 4)
//       isNextPage = false;
//   }

//   console.log(`fetch paginationVar: ${key}`);
//   paginationVar({ [key]: pages });
//   return pages;
// };
