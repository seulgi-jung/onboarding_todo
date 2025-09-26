import './TodoInput.css';

export const TodoInput = ({ placeholder }) => {
  return `
    <form class="todo-form">
      <input class="todo-input" name="todo-input" placeholder="${placeholder}" title="Enter Task"/>
    </form>
  `;
};
