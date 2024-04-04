type Block = {
  attributes: never;
  innerBlocks: never;
  saveContent: never;
};

export type TransformBlocks<T = Block> = {
  name: string;
} & T;

export type TransformErrorBlock = {
  message?: string;
  attributes: null;
  innerBlocks: null;
};

export type UrlVideoByBlock = string;
