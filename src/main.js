import './style.css';
import { setupCounter } from './counter.js';

document.querySelector('#app').innerHTML = `
  <div>11
  </div>
`;

setupCounter(document.querySelector('#counter'));
