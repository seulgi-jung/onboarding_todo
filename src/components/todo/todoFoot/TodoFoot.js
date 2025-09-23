import './TodoFoot.css';

export const TodoFoot = ({ todos }) => {
  let completedItem = 0;
  let IncompleteItem = 0;

  const count = function () {
    todos.forEach(function (todo) {
      todo.complete ? completedItem++ : IncompleteItem++;
    });
  };

  count();

  return `
    <div class="todo-foot">
      <em class="todo-summary">${IncompleteItem} items left</em>

      <div class="todo-filter">
        <button class="btn-todo-filter btn-todo-all is-active">All</button>
        <button class="btn-todo-filter btn-todo-active">Active</button>
        <button class="btn-todo-filter btn-todo-completed">Completed</button>
      </div>
      
      <em class="todo-summary">${completedItem} items left</em>
    </div>
  `;
};
