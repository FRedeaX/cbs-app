import { PreviewPage } from "../Page/PageDefault/PreviewPage";
import { PreviewPost } from "../Post/PreviewPost";

export const Preview = ({ isPage, ...props }) => {
  if (isPage) {
    return <PreviewPage {...props} />;
  } else {
    return <PreviewPost {...props} />;
  }
};
