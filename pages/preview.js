import { Preview as PreviewRender } from "~/components/Pages/Post/Preview";

const Preview = ({ id }) => <PreviewRender id={id} />

export async function getServerSideProps({ query }) {
  return {
    props: {
      id: query.preview_id || query.p
    },
  };
}

export default Preview;
