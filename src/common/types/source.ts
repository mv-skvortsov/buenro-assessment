export interface Source {
  name: string;
  source: {
    type: string;
    url: string;
  };
  mapper: string;
  interval: number;
}
