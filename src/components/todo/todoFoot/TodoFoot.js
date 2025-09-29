import './TodoFoot.css';

export const TodoFoot = ({ todoState }) => {
  return `
    <div class="todo-foot">
      <em class="todo-summary"><span id="incomplete">${todoState.incomplete}</span> items left</em>

      <div class="todo-filter">
        <button class="btn-todo-filter btn-todo-all is-active">All</button>
        <button class="btn-todo-filter btn-todo-active">Active</button>
        <button class="btn-todo-filter btn-todo-completed">Completed</button>
      </div>
      
      <button class="btn-clear">Clear completed (<span id="complete">${todoState.complete}</span>)</button>
    </div>
  `;
};
