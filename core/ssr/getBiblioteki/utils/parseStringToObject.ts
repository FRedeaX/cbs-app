export const parseStringToObject = <T>(str: string): T =>
  JSON.parse(
    `[${str.replaceAll("\r\n", "").replaceAll(",}", "}")}]`.replaceAll(
      "},]",
      "}]",
    ),
  );
