import './TodoListItem.css';

import { BasicCheckbox } from '../../form/basicCheckbox/BasicCheckbox';

export const TodoListItem = ({ todo }) => {
  return `
    <li class="todo-list-item ${todo.complete ? 'is-complete' : ''}" data-key="${todo.key}">
      ${BasicCheckbox({
        label: todo.value,
        checked: todo.complete,
        key: todo.key,
      })}
      
      <button class="btn-drag" title="draggable">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 10h14m-5 9l-2 2-2-2m4-14l-2-2-2 2m-5 9h14" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
    </li>
  `;
};
