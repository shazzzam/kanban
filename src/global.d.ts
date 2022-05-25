export {};

declare global {
  interface TTask {
    title: string;
    key: string;
    content: string;
  }

  interface TColumn {
    title: string;
    items: TTask[];
  }

  interface TColumnList {
    [key: string]: TColumn;
  }
}
