export type Data = {
  total_rows: number;
  total_rows_rounded: boolean;
  sampled: boolean;
  contains_sensitive_data: boolean;
  sample_share: number;
  sample_size: number;
  sample_space: number;
  data_lag: number;
  query: {
    ids: number[];
    timezone: string;
    preset: string;
    dimensions: string[];
    metrics: string[];
    sort: string[];
    date1: string;
    date2: string;
    filters: string;
    limit: number;
    offset: number;
  };
  totals: number[];
  min: number[];
  max: number[];
  data: {
    dimensions: {
      name: string;
    }[];
    metrics: number[];
  }[];
};
