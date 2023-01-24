/* eslint-disable no-console */
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import { PageRoot } from "..";
import { FETCH_PAGE } from "../Page.utils";

const PreviewPage = ({ id, type = "DATABASE_ID" }) => {
  const { data, loading, error } = useQuery(FETCH_PAGE, {
    variables: {
      id,
      idType: type,
      isPreview: true,
    },
    fetchPolicy: "network-only",
  });

  const [page, setPage] = useState();
  useEffect(() => {
    if (data?.page?.blocks) {
      fetch(`${window.location.origin}/api/transformBlocks`, {
        method: "POST",
        body: JSON.stringify(data.page.blocks),
      })
        .then((res) => res.json())
        .then((json) => {
          const { blocks } = JSON.parse(json.data);
          if (blocks.length > 0) setPage({ ...data.page, blocks });
          else console.error(json);
        })
        .catch((err) => console.error(err));
    }
  }, [data]);

  if (loading) return <div>Загрузка данных...</div>;
  if (error) {
    console.error(error);
    return null;
  }
  if (!page) return null;

  return <PageRoot page={page} />;
};

export default PreviewPage;
