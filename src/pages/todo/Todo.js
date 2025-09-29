import './Todo.css';
import { TodoInput } from '../../components/todo/todoInput/TodoInput.js';
import { TodoList } from '../../components/todo/todoList/TodoList.js';
import { TodoEmpty } from '../../components/todo/todoEmpty/TodoEmpty.js';
import { TodoFoot } from '../../components/todo/TodoFoot/TodoFoot.js';
import { EMPTY_MSG, INPUT_PLACEHOLDER } from '../../const/todo.const.js';

export const Todo = ({ todos, todoState }) => {
  return ` 
    <section class="todo-section">
      <header class="blind"> 
        <h1>todo</h1>
      </header>
      <div class="todo-inner">
        <div class="todo-head">
          ${TodoInput({
            placeholder: INPUT_PLACEHOLDER,
          })}
        </div>
        <div class="todo-body common-scroll-area">
        ${
          todos && todos.length > 0
            ? `${TodoList({
                todos,
              })}`
            : TodoEmpty({
                msg: EMPTY_MSG,
              })
        }
        </div>
          ${TodoFoot({
            todoState,
          })}
      </div>
    </section>`;
};
