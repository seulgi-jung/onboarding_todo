import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { BasicCheckbox } from '../form/basicCheckbox/BasicCheckbox';

import './TodoFooter.css';

/** Primary UI component for user interaction */
export const TodoFooter = () => {
  const size = 0;

  return html`
    <div class="todo__footer">
      <div class="todo__summary">${size} items left</div>

      <div class="todo__filter">
        <button class="todo__filterBtn todo__filterBtn--All">All</button>
        <button class="todo__filterBtn todo__filterBtn--Active">Active</button>
        <button class="todo__filterBtn todo__filterBtn--Completed">Completed</button>
      </div>
      <div class="todo-summary">${size} items left</div>
    </div>
  `;
};
('');
