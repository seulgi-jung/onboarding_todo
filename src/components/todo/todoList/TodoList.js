import './TodoList.css';

import { BasicCheckbox } from '../../form/basicCheckbox/BasicCheckbox';

export const TodoList = ({ todos }) => {
  const rendor = function () {
    return todos.map(function (todo) {
      return `
        <div class="todo-list-item" data-key="${todo.key}">
          ${BasicCheckbox({
            label: todo.value,
            checked: todo.complete,
            key: todo.key,
          })}
        </div>
      `;
    });
  };

  return `
    <div class="todo-list"> 
      ${rendor().join('')}
    </div>
  `;
};
