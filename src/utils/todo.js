import { TodoFilter } from '../components/todo/todoFoot/TodoFoot';

import { getTodos, setTodos } from '../service/todo.service.js';

import { DragAndDrop } from './dnd.js';
import { renderList, renderTodo } from '../utils/render/todo.rendor.js';

import { changeCompleteTodo, updateTodoState, addTodo, setTodoState } from '../store/todo.store.js';

export class TodoListApp extends TodoFilter {
  todoState = {
    complete: 0,
    incomplete: 0,
  };

  useDnd = false;

  constructor({ id, wrapper, options }) {
    super();

    this.$wrapper = wrapper;

    this.id = 'todo_' + id;
    this.todos = getTodos(this.id);
    setTodoState.bind(this)();
    if (options?.useDnd) this.useDnd = true;
  }

  onSubmit() {
    this.$form.addEventListener('submit', (e) => {
      e.preventDefault();

      const $target = e.target;
      const $input = $target.querySelector('.todo-input');
      const value = $input.value;
      if (!value) return;

      $input.value = '';
      this.todoState.incomplete++;
      addTodo.bind(this)(value);

      renderList.bind(this)(this.todos);

      if (this.filterState) this.updateSummary();
    });
  }

  changeComplete() {
    this.$todo_body.addEventListener('change', (e) => {
      const $target = e.target;
      if (
        $target.classList.contains('base-checkbox') ||
        $target.parentNode.classList.contains('base-checkbox')
      ) {
        const targetKey = Number($target.parentNode.children[0].id);
        const targetChecked = $target.checked;
        if (!targetKey) return;

        changeCompleteTodo.bind(this)(targetKey);

        if (!this.filterState) return;
        updateTodoState.bind(this)(targetChecked);
        this.updateFilter();

        this.updateSummary();
      }
    });
  }

  initSelectors() {
    this.$form = this.$wrapper.querySelector('.todo-form');
    this.$todo_body = this.$wrapper.querySelector('.todo-body');
    this.$todo_list = this.$wrapper.querySelector('.todo-list');
    this.$todo_foot = this.$wrapper.querySelector('.todo-foot');
  }

  initDnd() {
    const TodoListApp = this;

    this.Dnd = new DragAndDrop({
      buttonClass: 'btn-drag',
      draggableClass: 'todo-list-item',
      dropzone: this.$todo_list,
    });
    this.Dnd.init();

    // todos 데이터 바꾸기
    this.Dnd.customEvent = function () {
      const dragKey = this.$dragItem.dataset.key;
      const insertKey = this.$insertItem.dataset.key;

      let dragTodo = null;

      // 이동한 요소 삭제
      const filteredTodo = TodoListApp.todos.filter(function (todo) {
        if (todo.key != dragKey) {
          return todo;
        }
        dragTodo = todo;
      });

      // 이동할 요소 위치 찾기
      let insertTodoIndex = 0;
      filteredTodo.forEach(function ({ key }, index) {
        if (key != insertKey) return;
        insertTodoIndex = index;
      });

      if (this.insertDirection === 'after') insertTodoIndex++;
      filteredTodo.splice(insertTodoIndex, 0, dragTodo);
      TodoListApp.todos = filteredTodo;

      setTodos(TodoListApp.id, TodoListApp.todos);
    };
  }

  init() {
    renderTodo.bind(this)();
    this.initSelectors();
    this.initFilter();
    this.onSubmit();
    this.changeComplete();

    if (!this.useDnd) return;
    this.initDnd();
  }
}
