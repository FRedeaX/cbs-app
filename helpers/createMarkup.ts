function createMarkup(text: string | null) {
  if (text === null) return undefined;
  return { __html: text };
}

export default createMarkup;
