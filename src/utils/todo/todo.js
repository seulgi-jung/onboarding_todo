import { TodoFilter } from '../../utils/todo/todoFilter.js';

import { getTodos, setTodos } from '../../service/todo.service.js';

import { DragAndDrop } from '../dnd.js';
import { reorderList } from '../../store/dnd.store.js';
import { renderList, renderTodo, updateSummary } from '../../ui/todo/todo.render.js';
import { changeFilterList } from '../../ui/todo/todo.dom.js';

import {
  changeCompleteTodo,
  updateTodoState,
  addTodo,
  setTodoState,
  increaseIncomplete,
} from '../../store/todo.store.js';

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

  submitTodo() {
    this.$form.addEventListener('submit', (e) => {
      e.preventDefault();

      const $target = e.target;
      const $input = $target.querySelector('.todo-input');
      const value = $input.value;

      if (!value) {
        alert('값을 입력하세요');
        return;
      }

      $input.value = '';

      increaseIncomplete.bind(this)();
      addTodo.bind(this)(value);

      if (this.filterState) {
        updateSummary.bind(this)();
        changeFilterList.bind(this)();
      }
    });
  }

  changeTodoState() {
    this.$todo_body.addEventListener('change', (e) => {
      const $target = e.target;

      if ($target.closest('.base-checkbox')) {
        const targetKey = Number($target.parentNode.children[0].id);
        const targetChecked = $target.checked;
        if (!targetKey) return;

        changeCompleteTodo.bind(this)(targetKey);
        renderList.bind(this)(this.todos);

        if (!this.filterState) return;
        updateTodoState.bind(this)(targetChecked);
        this.updateFilter();

        updateSummary.bind(this)();
      }
    });
  }

  initSelectors() {
    this.$wrapper.id = this.id;
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
      const filteredList = reorderList.bind(this)(TodoListApp.todos);
      if (!filteredList) return;
      TodoListApp.todos = filteredList;
      setTodos(TodoListApp.id, TodoListApp.todos);
    };
  }

  init() {
    renderTodo.bind(this)();

    this.initSelectors();
    this.initFilter();
    this.submitTodo();
    this.changeTodoState();

    if (!this.useDnd) return;
    this.initDnd();
  }
}
