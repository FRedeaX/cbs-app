const lineClamp = (text, numberOfSymbol, baseClamp = 3) => {
  if (typeof text === "string" && !numberOfSymbol) return baseClamp;

  const line = Math.ceil(text.length / numberOfSymbol);
  switch (line) {
    case 1:
      return baseClamp + 2;
    case 2:
      return baseClamp + 1;
    default:
      return baseClamp;
  }
};

export default lineClamp;
