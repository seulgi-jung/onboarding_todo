import { screen } from '@testing-library/dom';
import { TodoListApp } from '../../utils/todo/todo.js';
import {
  changeCompleteTodo,
  deleteCompleteTodo,
  updateTodoState,
  addTodo,
  setTodoState,
  increaseIncomplete,
} from '../../store/todo.store.js';
import { renderList, updateSummary } from '../../ui/todo/todo.render.js';

const todoRenderer = function () {
  const $app = document.createElement('div');
  $app.id = 'app';
  document.body.append($app);
};

describe('Todo List App', () => {
  let todoList = null;

  beforeEach(() => {
    todoRenderer();
    todoList = new TodoListApp({
      id: '1',
      wrapper: document.querySelector('#app'),
      options: {
        useDnd: true,
      },
    });
    todoList.init();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    todoList = null;
  });

  // 1. todo.store.js
  test('1-1. addTodo', () => {
    addTodo.bind(todoList)('할 일1');
    expect(todoList.todos[0].value).toBe('할 일1');
  });

  test('1-2. changeCompleteTodo', () => {
    const beforeTodos = JSON.parse(JSON.stringify(todoList.todos[0]));
    changeCompleteTodo.bind(todoList)(todoList.todos[0].key);

    expect(todoList.todos[0].complete).not.toBe(beforeTodos.complete);
  });

  test('1-3. deleteCompleteTodo', () => {
    addTodo.bind(todoList)('할 일2');
    addTodo.bind(todoList)('할 일3');

    deleteCompleteTodo.bind(todoList)();
    expect(todoList.todos[0].complete).toBe(false);
    expect(todoList.todos[1].complete).toBe(false);
    expect(todoList.todos[2]).not.toBeTruthy();
  });

  test('1-4 updateTodoState', () => {
    const todoState = {
      complete: todoList.todoState.complete,
      incomplete: todoList.todoState.incomplete,
    };
    updateTodoState.bind(todoList)(true);

    expect(todoList.todoState.complete).toBe(todoState.complete + 1);
    expect(todoList.todoState.incomplete).toBe(todoState.incomplete - 1);

    todoState.complete++;
    todoState.incomplete--;

    updateTodoState.bind(todoList)(false);
    expect(todoList.todoState.complete).toBe(todoState.complete - 1);
    expect(todoList.todoState.incomplete).toBe(todoState.incomplete + 1);
  });

  test('1-5 setTodoState', () => {
    addTodo.bind(todoList)('할 일4');
    todoList.todos[0].complete = true;
    setTodoState.bind(todoList)();

    expect(todoList.todoState.complete).toBe(1);
    expect(todoList.todoState.incomplete).toBe(2);
  });

  test('1-5 increaseIncomplete', function () {
    const incomplete = todoList.todoState.incomplete;

    increaseIncomplete.bind(todoList)();

    expect(todoList.todoState.incomplete).toBe(incomplete + 1);
  });

  // 2. check ui rendering
  test('2-1. input 존재하는 지 확인', () => {
    const todoInput = screen.getByPlaceholderText(/What needs to be done?/i);
    expect(todoInput).toBeInTheDocument();
  });

  test('2-2. 데이터가 없을 때 empty 메시지가 있는 지 확인', () => {
    todoList.todos = [];
    renderList.bind(todoList)(todoList.todos);
    const emptyMSG = screen.getByText(/There are no to-do items. Please write your to-dos/i);

    expect(emptyMSG).toBeInTheDocument();
  });

  test('2-3. 데이터가 있을 떄 목록이 있는 지 확인', () => {
    todoList.todos = [
      { key: 1759101641385, value: '할 일3', complete: false },
      { key: 1759101641385, value: '할 일2', complete: false },
      { key: 1759101641391, value: '할 일1', complete: false },
    ];
    renderList.bind(todoList)(todoList.todos);
    expect(document.querySelector('.todo-list')).toBeInTheDocument();
  });

  test('2-4. 데이터가 있을 떄 목록이 있는 지 확인', () => {
    todoList.todos = [
      { key: 1759101641385, value: '할 일3', complete: false },
      { key: 1759101641385, value: '할 일2', complete: true },
      { key: 1759101641391, value: '할 일1', complete: false },
    ];
    setTodoState.bind(todoList)();
    updateSummary.bind(todoList)();

    expect(document.querySelector('#complete').innerText).toBe(1);
    expect(document.querySelector('#incomplete').innerText).toBe(2);
  });

  // 3. drag n drop
  test('3-1. 데이터가 있을 떄 목록이 있는 지 확인', () => {
    todoList.todos = [
      { key: 1759101641385, value: '할 일3', complete: false },
      { key: 1759101641385, value: '할 일2', complete: true },
      { key: 1759101641391, value: '할 일1', complete: false },
    ];
    setTodoState.bind(todoList)();
    updateSummary.bind(todoList)();

    expect(document.querySelector('#complete').innerText).toBe(1);
    expect(document.querySelector('#incomplete').innerText).toBe(2);
  });
});
