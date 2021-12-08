import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { FETCH_PAGE, PageRoot } from "~/components/Pages/Page";

export const PreviewPage = ({ id, type = "DATABASE_ID" }) => {
  const { data, loading, error } = useQuery(FETCH_PAGE, {
    variables: {
      id,
      type,
      isPreview: true,
    },
    fetchPolicy: "network-only",
  });

  const [page, setPage] = useState();
  useEffect(() => {
    if (data?.page?.blocks) {
      fetch(`${window.location.origin}/api/transformBlocks`, {
        method: "POST",
        body: JSON.stringify(data.page),
      })
        .then((res) => res.json())
        .then((json) => {
          if (JSON.parse(json.data)) setPage(JSON.parse(json.data));
          else console.error(json);
        })
        .catch((error) => console.error(error));
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) {
    console.error(error);
    return null;
  }
  if (!page) return null;

  return <PageRoot page={page} />;
};
