import React, { useEffect } from "react";
import Layout from "../../UI/Layout/Layout";
import PosterRoot from "../PosterRoot/PosterRoot";

const PosterPage = () => {
  useEffect(() => {
    document.body.style.minHeight = "";
  }, []);
  return (
    <Layout>
      <PosterRoot />
    </Layout>
  );
};

export default PosterPage;
