import './Todo.css';

import { TodoList } from '../components/todoList/TodoList';
import { TodoInput } from '../components/todoInput/TodoInput';
import { TodoFooter } from '../components/todoFoot/_TodoFooter';

/** Primary UI component for user interaction */
export const Todo = ({}) => {
  return html` ${TodoInput()} ${TodoList()} ${TodoFooter()}`;
};
