/* eslint-disable react/jsx-props-no-spreading */
import PreviewPost from "../../../routers/Post/PreviewPost";
import PreviewPage from "../Page/PageDefault/PreviewPage";

const Preview = ({ isPage, ...props }) => {
  if (isPage) {
    return <PreviewPage {...props} />;
  }
  return <PreviewPost {...props} />;
};

export default Preview;
