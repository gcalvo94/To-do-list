import { Category } from "./Category";

export interface Task {
    taskId: number;
    title: string;
    description: string;
    isDone: boolean;
    categories: Category[];
}
export interface TaskRequest {
    title: string;
    description: string;
    isDone: boolean;
    categories: Category[];
}