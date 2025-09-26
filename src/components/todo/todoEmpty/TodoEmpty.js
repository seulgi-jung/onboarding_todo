import './TodoEmpty.css';

export const TodoEmpty = ({ msg }) => {
  return `
    <div class="todo-empty-area">
      <p class="todo-empty-msg">
        ${msg}
      </p>
    </div>
  `;
};
