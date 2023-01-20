import { InMemoryCache } from "@apollo/client";

import { isHeaderPosResetVar } from "./variables/header";
import { overlayVar } from "./variables/overlay";
import { scrollYVar } from "./variables/scrollY";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        scrollY: {
          read() {
            return scrollYVar();
          },
        },
        overlay: {
          read() {
            return overlayVar();
          },
        },
        isHeaderPosReset: {
          read() {
            return isHeaderPosResetVar();
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
