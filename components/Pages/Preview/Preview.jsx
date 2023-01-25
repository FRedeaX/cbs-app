import { ApolloProvider } from "@apollo/client";

import { client } from "../../../lib/apollo/client";
import PreviewPost from "../../../routes/Post/PreviewPost";
import PreviewPage from "../Page/PageDefault/PreviewPage";

export const Preview = ({ isPage, id }) => (
  <ApolloProvider client={client}>
    {isPage ? <PreviewPage id={id} /> : <PreviewPost id={id} />}
  </ApolloProvider>
);
