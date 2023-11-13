export type WPGQLError = {
  response: {
    errors: {
      message: string;
      extensions: {
        category: string;
      };
      locations: {
        line: number;
        column: number;
      }[];
    }[];
    extensions: {
      debug: {
        type: string;
        message: string;
      }[];
    };
    status: number;
    headers: object;
  };
  request: {
    query: string;
  };
};
