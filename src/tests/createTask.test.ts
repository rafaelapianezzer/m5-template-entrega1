import { describe, it } from "vitest";
import { request } from "./setupFiles";
import { taskDefaultExpects } from "./utils/taskDefaultExpects";
import { task, taskWithCategory } from "./mocks/tasks.mocks";

describe("create task", () => {
   it("should be able to create task correctly", async () => {
      const data = await request
         .post("/tasks")
         .send(task)
         .expect(201)
         .then((response) => response.body);

      taskDefaultExpects(data);
   });

   it("should throw error when try to create a task in a invalid category", async () => {
      await request.post("/tasks").send(taskWithCategory).expect(403);
   });
});
