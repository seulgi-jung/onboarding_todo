import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import './BasicCheckbox.css';

/** Primary UI component for user interaction */
export const BasicCheckbox = ({ label, key }) => {
  return html`
    <div class="checkbox--basic">
      <input type="checkbox" id="${key}" />
      ${label && html`<label for="${key}">${label}</label>`}
    </div>
  `;
};
