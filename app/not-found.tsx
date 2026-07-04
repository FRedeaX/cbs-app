import { Metadata } from "next";

import { NotFound } from "src/entities/notFound";

export const metadata: Metadata = {
  title: "Страница не найдена",
};

export default () => <NotFound title="Страница не найдена" />;
