export interface Headers {
  key: string;
  header: string;
}

export interface HeaderInfo {
  header: string;
}

export interface Cells {
  errors: null | string;
  id: string;
  info: HeaderInfo;
  isEditable: boolean;
  isEditing: boolean;
  isValid: boolean;
  value: string;
}

export interface Rows {
  id: string;
  isSelected?: boolean;
  isExpanded?: boolean;
  disabled?: boolean;
  cells: Array<Cells>;
}

export interface RowData {
  id: string;
  ingredient: string;
  type: string;
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
}
