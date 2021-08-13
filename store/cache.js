import { InMemoryCache } from "@apollo/client";
import { isHeaderPosResetVar } from "./variables/header";
import { modalVar } from "./variables/modal";
import { overlayVar } from "./variables/overlay";
import { paginationVar } from "./variables/pagination";
import { scrollYVar } from "./variables/scrollY";
import { windowWidthVar } from "./variables/windowWidth";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        scrollY: {
          read() {
            return scrollYVar();
          },
        },
        windowWidth: {
          read() {
            return windowWidthVar();
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
        modal: {
          read() {
            return modalVar();
          },
        },
        pagination: {
          read() {
            return paginationVar();
          },
        },

        //Перенаправление кэша
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
