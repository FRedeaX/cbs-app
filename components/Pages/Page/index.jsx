import Article from "../../Article/Article";
import Head from "../../Head/Head";

export const PageRoot = ({ page }) => (
  <>
    <Head title={page.title} description={page.excerpt} />
    <Article title={page.title} blocks={page.blocks} />
  </>
);

// const _loader = ({ page }) => {
//   switch (page.template.templateName) {
//     case "Redirect":
//       break;

//     default:
//       return <PageDefault page={page} />;
//   }
// };
