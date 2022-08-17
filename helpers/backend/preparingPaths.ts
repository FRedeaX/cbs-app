interface INodes {
  node: {
    slug: string;
    template: {
      templateName: "Default" | "Redirect";
    };
  };
}

type _skipSlug = INodes["node"]["slug"];

interface IPreparingPathsResult {
  params: {
    pageSlug: string;
  };
}

export const preparingPaths = (
  nodes: INodes[],
  skipSlug?: _skipSlug,
): IPreparingPathsResult[] =>
  nodes
    .filter(
      ({ node }) =>
        node.template.templateName !== "Redirect" && node.slug !== skipSlug,
    )
    .map(({ node }) => ({
      params: {
        pageSlug: node.slug,
      },
    }));
