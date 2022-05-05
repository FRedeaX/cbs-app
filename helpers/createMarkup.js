import DOMPurify from "isomorphic-dompurify";

function createMarkup(text) {
  if (!text) return null;
  return { __html: text };
  return { __html: DOMPurify.sanitize(text, { USE_PROFILES: { html: true } }) };
}

export default createMarkup;
