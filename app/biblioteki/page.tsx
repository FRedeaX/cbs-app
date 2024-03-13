import { Container } from "@mui/material";
import { Metadata } from "next";

import { getBiblioteki } from "@/core/ssr";
import { Library } from "@/components/Pages/Library/Library";

export const generateMetadata = async (): Promise<Metadata> => {
  const { title, description } = await getBiblioteki();

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
      <Library filialList={biblioteki.filialList} />
    </Container>
  );
};

export default Page;
