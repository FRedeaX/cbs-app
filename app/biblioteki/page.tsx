import { Container } from "@mui/material";
import { Metadata } from "next";
import { Suspense } from "react";

import { getBiblioteki } from "@/core/ssr";
import { Library } from "@/components/Pages/Library/Library";

export const generateMetadata = async (): Promise<Metadata> => {
  const { title, description } = await getBiblioteki(true);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "/biblioteki",
    },
  };
};

const Page = async () => {
  const biblioteki = await getBiblioteki();

  return (
    <Container maxWidth="xl">
      <Suspense>
        <Library filialList={biblioteki.filialList} />
      </Suspense>
    </Container>
  );
};

export default Page;
