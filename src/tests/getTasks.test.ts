import { beforeEach, describe, expect, it } from "vitest";
import { prisma } from "../database/prisma";
import { category } from "./mocks/category.mocks";
import { taskList } from "./mocks/tasks.mocks";
import { request } from "./setupFiles";
import { taskDefaultExpects } from "./utils/taskDefaultExpects";

describe("get tasks", () => {
   beforeEach(async () => {
      await prisma.category.create({ data: category });
      await prisma.task.createMany({ data: taskList });
   });

   it("should be able to get tasks sucessfully", async () => {
      const data = await request
         .get("/tasks")
         .expect(200)
         .then((response) => response.body);

      expect(data).toHaveLength(2);

      taskDefaultExpects(data[0]);

      expect(data[0].category).toBeUndefined();

      taskDefaultExpects(data[1]);

      expect(data[1].category).toBeDefined();
      expect(data[1].category).toBeTypeOf("object");
      expect(data[1].category.name).toBeDefined();
      expect(data[1].category.name).toBeTypeOf("string");
   });

   it("should be able to get tasks from specific category", async () => {
      const category = await prisma.category.findFirst();

      const data = await request
         .get(`/tasks?category=${category?.id}`)
         .expect(200)
         .then((response) => response.body);

      expect(data).toHaveLength(1);

      taskDefaultExpects(data[0]);

      expect(data[0].category).toBeDefined();
      expect(data[0].category).toBeTypeOf("object");
      expect(data[0].category.name).toBeDefined();
      expect(data[0].category.name).toBeTypeOf("string");
   });

   it("should be able to get a single task by the id correctly", async () => {
      const categories = await prisma.category.findMany();

      const data = await request
         .get(`/tasks/${categories[1].id}`)
         .expect(200)
         .then((response) => response.body);

      taskDefaultExpects(data[0]);

      expect(data[0].category).toBeDefined();
      expect(data[0].category).toBeTypeOf("object");
      expect(data[0].category.name).toBeDefined();
      expect(data[0].category.name).toBeTypeOf("string");
   });

   it("should be throw error when try get a task with a invalid id", async () => {
      const categories = await prisma.category.findMany();

      const id = categories[1].id + 1;

      await request.get(`/tasks/${id}`).expect(404);
   });
});
