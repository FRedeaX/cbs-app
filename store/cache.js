import { InMemoryCache } from "@apollo/client";

import { overlayVar } from "./variables/overlay";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        overlay: {
          read() {
            return overlayVar();
          },
        },

        // Перенаправление кэша
        // post(_, { args, toReference }) {
        //   return toReference({
        //     __typename: "Post",
        //     id: args.id,
        //   });
        // },
      },
    },
  },
});
export default cache;
