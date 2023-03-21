/* eslint-disable no-undef */
const db = require("../models");

const getJSDate = (days) => {
  if (!Number.isInteger(days)) {
    throw new Error("Need to pass an integer as days");
  }
  const today = new Date();
  const oneDay = 60 * 60 * 24 * 1000;
  return new Date(today.getTime() + days * oneDay);
};

describe("Test list of items", function () {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  test("Add overdue item main", async () => {
    const todo = await db.Todo.addTask({
      title: "This is a sample item",
      dueDate: getJSDate(-2),
      completed: false,
    });
    const items = await db.Todo.overdue();
    expect(items.length).toBe(1);
  });

  test("Add due today item yesterday", async () => {
    const dueTodayItems = await db.Todo.dueToday();
    const todo = await db.Todo.addTask({
      title: "This is a sample item",
      dueDate: getJSDate(0),
      completed: false,
    });
    const items = await db.Todo.dueToday();
    expect(items.length).toBe(dueTodayItems.length + 1);
  });

  test("Add due later item tommorow", async () => {
    const dueLaterItems = await db.Todo.dueLater();
    const todo = await db.Todo.addTask({
      title: "This is a sample item",
      dueDate: getJSDate(2),
      completed: false,
    });
    const items = await db.Todo.dueLater();
    expect(items.length).toBe(dueLaterItems.length + 1);
  });

  test("Mark as to do complete", async () => {
    const overdueItems = await db.Todo.overdue();
    const mTodo = overdueItems[0];
    expect(mTodo.completed).toBe(false);
    await db.Todo.markAsComplete(mTodo.id);
    await mTodo.reload();

    expect(mTodo.completed).toBe(true);
  });

  test("Test completed num", async () => {
    const overdueItems = await db.Todo.overdue();
    const mTodo = overdueItems[0];
    expect(mTodo.completed).toBe(true);
    const displayValue = mTodo.displayableString();
    expect(displayValue).toBe(
      `${mTodo.id}. [x] ${mTodo.title} ${mTodo.dueDate}`
    );
  });

  test("Test incomplete num", async () => {
    const dueLaterItems = await db.Todo.dueLater();
    const mTodo = dueLaterItems[0];
    expect(mTodo.completed).toBe(false);
    const displayValue = mTodo.displayableString();
    expect(displayValue).toBe(
      `${mTodo.id}. [ ] ${mTodo.title} ${mTodo.dueDate}`
    );
  });

  test("Test incomplete tommorow", async () => {
    const dueToday = await db.Todo.dueToday();
    const mTodo = dueToday[0];
    expect(mTodo.completed).toBe(false);
    const displayConst = mTodo.displayableString();
    expect(displayConst).toBe(`${mTodo.id}. [ ] ${mTodo.title}`);
  });

  test("Test completed tommorow", async () => {
    const dueToday = await db.Todo.dueToday();
    const mTodo = dueToday[0];
    expect(mTodo.completed).toBe(false);
    await db.mTodo.markAsComplete(mTodo.id);
    await mTodo.reload();
    const displayConst = mTodo.displayableString();
    expect(displayConst).toBe(`${mTodo.id}. [x] ${mTodo.title}`);
  });
});
