/* eslint-disable react/jsx-props-no-spreading */
import PreviewPage from "../Page/PageDefault/PreviewPage";
import PreviewPost from "../Post/PreviewPost";

const Preview = ({ isPage, ...props }) => {
  if (isPage) {
    return <PreviewPage {...props} />;
  }
  return <PreviewPost {...props} />;
};

export default Preview;
