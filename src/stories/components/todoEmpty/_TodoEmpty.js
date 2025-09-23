import { styleMap } from 'lit/directives/style-map.js';

import { BasicCheckbox } from '../form/basicCheckbox/BasicCheckbox';

import './TodoEmpty.css';

/** Primary UI component for user interaction */
export const TodoEmpty = () => {
  return html`
    <div class="todo__empty">
      <p class="todo__emptyMsg">There are no to-do items. Please write your to-dos</p>
    </div>
  `;
};
