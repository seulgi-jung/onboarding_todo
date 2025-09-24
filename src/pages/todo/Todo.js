import './Todo.css';
import { TodoInput } from '../../components/todo/todoInput/TodoInput';
import { TodoList } from '../../components/todo/todoList/TodoList';
import { TodoEmpty } from '../../components/todo/todoEmpty/TodoEmpty';
import { TodoFoot } from '../../components/todo/TodoFoot/TodoFoot';

export const existTodo = () => {};
export const Todo = ({ todos, todoState }) => {
  return ` 
    <section class="todo-section">
      <header class="blind"> 
        <h1>todo</h1>
      </header>
      <div class="todo-inner">
        <div class="todo-head">
          ${TodoInput({
            placeholder: 'What needs to be done',
          })}
        </div>
        <div class="todo-body common-scroll-area">
        ${
          todos && todos.length > 0
            ? TodoList({
                todos,
              })
            : TodoEmpty({
                msg: 'There are no to-do items. Please write your to-dos',
              })
        }
        </div>
          ${TodoFoot({
            todoState,
          })}
      </div>
    </section>`;
};
