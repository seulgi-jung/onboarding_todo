import { styleMap } from 'lit/directives/style-map.js';

import './TodoInput.css';

/** Primary UI component for user interaction */
export const TodoInput = () => {
  return html`
    <div class="todo__input">
      <input placeholder="What needs to be done" />
    </div>
  `;
};
