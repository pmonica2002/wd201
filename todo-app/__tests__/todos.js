const request = require("supertest");

const db = require("../models/index");
const app = require("../app");

let server, agent;

describe("Todo Application", function () {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    server = app.listen(3000, () => {});
    agent = request.agent(server);
  });

  afterAll(async () => {
    try {
      await db.sequelize.close();
      await server.close();
    } catch (error) {
      console.log(error);
    }
  });

  test("Creates a todo", async () => {
    const response = await agent.post("/todos").send({
      title: "Buy milk",
      dueDate: new Date().toISOString(),
      completed: false,
    });
    expect(response.statusCode).toBe(200);
    expect(response.header["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
    const parsedResponses = JSON.parse(response.text);
    expect(parsedResponses.id).toBeDefined();
  });

  test("toto completed", async () => {
    const response = await agent.post("/todos").send({
      title: "Buy milk",
      dueDate: new Date().toISOString(),
      completed: false,
    });
    const parsedResponses = JSON.parse(response.text);
    const todoid = parsedResponses.id;

    expect(parsedResponses.completed).toBe(false);

    const markCompleteResponse = await agent
      .put(`/todos/${todoid}/markASCompleted`)
      .send();
    const parsedUpdateResponse = JSON.parse(markCompleteResponse.text);
    expect(parsedUpdateResponse.completed).toBe(true);
  });

  test("Fetches all todos ", async () => {
    await agent.post("/todos").send({
      title: "Buy xbox",
      dueDate: new Date().toISOString(),
      completed: false,
    });
    await agent.post("/todos").send({
      title: "Buy ps3",
      dueDate: new Date().toISOString(),
      completed: false,
    });
    const response = await agent.get("/todos");
    const parsedResponses = JSON.parse(response.text);

    expect(parsedResponses.length).toBe(4);
    expect(parsedResponses[3]["title"]).toBe("Buy ps3");
  });

  test("Deletes a todo with the given ID if it exists and sends a boolean response", async () => {
    // FILL IN YOUR CODE HERE
    const response = await agent.post("/todos").send({
      title: "Buy a car",
      dueDate: new Date().toISOString(),
      completed: false,
    });
    const parsedResponses = JSON.parse(response.text);
    const todoid = parsedResponses.id;

    const deleteTodoResponses = await agent.delete(`/todos/${todoid}`).send();
    const parsedDeleteResponses = JSON.parse(deleteTodoResponses.text);
    expect(parsedDeleteResponses).toBe(true);

    const deleteNonExistentTodoResponses = await agent
      .delete(`/todos/9999`)
      .send();
    const parsedDeleteNonExistentTodoResponses = JSON.parse(
      deleteNonExistentTodoResponses.text
    );
    expect(parsedDeleteNonExistentTodoResponses).toBe(false);
  });
});
