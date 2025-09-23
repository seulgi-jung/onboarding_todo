import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { BasicCheckbox } from '../form/basicCheckbox/BasicCheckbox';

import './TodoList.css';

/** Primary UI component for user interaction */
export const TodoList = () => {

  return html`
    <div class="todo-list"> 
      <div class="todo-list-item"> 
        ${BasicCheckbox({
          label:1234,
          key: 1234
        })}
      </div>
    </div>
  `;
};;;''
