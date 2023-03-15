//Main Js File
const todoList = () => {
  all = [];
  const add = (todoItem) => {
    all.push(todoItem);
  };
  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    return all.filter(
      (item) => item.dueDate < new Date().toISOString().slice(0, 10)
    );
  };

  const dueToday = () => {
    return all.filter(
      (item) => item.dueDate === new Date().toISOString().slice(0, 10)
    );
  };

  const dueLater = () => {
    return all.filter(
      (item) => item.dueDate > new Date().toISOString().slice(0, 10)
    );
  };

  const toDisplayableList = (list) => {
    return list.map(
      (item) =>
        `${item.completed ? "[x]" : "[ ]"} ${item.title} ${
          title.dueDate === new Date().toISOString().slice(0, 10)
        }`
    );
  };

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

module.exports = todoList;
