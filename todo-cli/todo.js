const todoList = () => {
  all = [];
  const add = (todoItem) => {
    all.push(todoItem);
  };
  const markAsComplete = (index) => {
    all[index].completed = true;
  };
  function due(dueDate) {
    const today = new Date().toISOString().split("T")[0];
    return dueDate == today;
  }
  const overdue = () => {
    return all.filter(
      (gd) => gd.dueDate < new Date().toISOString().split("T")[0]
    );
  };
  const dueToday = () => {
    return all.filter(
      (gd) => gd.dueDate === new Date().toISOString().split("T")[0]
    );
  };
  const dueLater = () => {
    return all.filter(
      (gd) => gd.dueDate > new Date().toISOString().split("T")[0]
    );
  };
  const toDisplayableList = (list) => {
    return list.map((gd) => toString(gd)).join("\n");
  };
  function toString(all) {
    const dueDate = due(all.dueDate) ? "" : all.dueDate;
    const value= all.completed ? "[x]" : "[ ]";
    return `${value} ${all.title} ${dueDate}`;
  }
  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};
const todos = todoList();
const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};
var dateToday = new Date();
const today = formattedDate(dateToday);
const yesterday = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() - 1))
);
const tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1))
);
todos.add({ title: "Submit assignment", dueDate: yesterday, completed: false });
todos.add({ title: "Pay rent", dueDate: today, completed: true });
todos.add({ title: "Service Vehicle", dueDate: today, completed: false });
todos.add({ title: "File taxes", dueDate: tomorrow, completed: false });
todos.add({ title: "Pay electric bill", dueDate: tomorrow, completed: false });
console.log("My Todo-list\n");
console.log("Overdue");
var overdues = todos.overdue();
var formattedOverdues = todos.toDisplayableList(overdues);
console.log(formattedOverdues);
console.log("\n");
console.log("Due Today");
let itemsDueToday = todos.dueToday();
let formattedItemsDueToday = todos.toDisplayableList(itemsDueToday);
console.log(formattedItemsDueToday);
console.log("\n");
console.log("Due Later");
let itemsDueLater = todos.dueLater();
let formattedItemsDueLater = todos.toDisplayableList(itemsDueLater);
console.log(formattedItemsDueLater);
console.log("\n\n");