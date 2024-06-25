import { Task } from "./task.interface";

export interface Category {
    id: number;
    name: string;
    tasks: Task[];
}