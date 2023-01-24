import { ApolloProvider } from "@apollo/client";

import PreviewPost from "../../../routes/Post/PreviewPost";
import { client } from "../../../store/apollo-client";
import PreviewPage from "../Page/PageDefault/PreviewPage";

export const Preview = ({ isPage, id }) => (
  <ApolloProvider client={client}>
    {isPage ? <PreviewPage id={id} /> : <PreviewPost id={id} />}
  </ApolloProvider>
);
