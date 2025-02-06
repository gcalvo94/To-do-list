import { Category } from "./Category";

export interface TaskDialog {    
    title: string;
    description: string;
    isDone: boolean;
    isEdit: boolean;
    categories?: Category[];
}
export interface ConfirmDialog {
  title: string;
  description: string;
}