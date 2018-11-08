
export class DiffEdit {
  kind: 'E';
  path: (string | number)[];
  lhs: any;
  rhs: number | string | boolean;
}

export class DiffNew {
  kind: 'N';
  path: string[];
  rhs: number | string | boolean;
}

export class DiffDeleted {
  kind: 'D';
  path: (string | number)[];
  lhs: number | string | boolean;
}

export class DiffArray {
  kind: 'A';
  path: (string | number)[];
  index: number;
  rhs: number | string | boolean;
  item: DiffNew;
}

export type DeepDiff = (DiffEdit | DiffArray | DiffDeleted | DiffNew)[];
