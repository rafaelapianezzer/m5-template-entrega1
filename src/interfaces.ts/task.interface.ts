import { Category } from "./category.interface";


export interface Task {
    id: number;
    title: string;
    content: string;
    finished: boolean;
    categoryId?: number | null;
    category?: Category | null;
}


// PAREI NA AULA 20 MINUTOS
//CRIEI A INTERFACE DAS DUAS TABELAS
