import { prisma } from "../../database/prisma";
import { category } from "./category.mocks";

export const task = {
   title: "Lorem ipsum",
   content: "Lorem ipsum",
};

export const taskWithCategory = {
   title: "Lorem ipsum",
   content: "Lorem ipsum",
   categoryId: 1,
};

export const getTaskList = async () => {
   const category = await prisma.category.findFirst();

   return [
      {
         title: "Lorem ipsum",
         content: "Lorem ipsum",
      },
      {
         title: "Lorem ipsum",
         content: "Lorem ipsum",
         categoryId: category?.id,
      },
   ];
};
