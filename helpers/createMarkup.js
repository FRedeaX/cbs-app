// import DOMPurify from "isomorphic-dompurify";

function createMarkup(text) {
  if (!text) return null;
  return { __html: text };
}

export default createMarkup;
