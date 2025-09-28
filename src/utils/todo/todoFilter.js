import { FILTER_STATE } from '../../const/todo.const.js';

import { renderList, updateSummary } from '../../ui/todo/todo.render.js';
import { changeFilterClass } from '../../ui/todo/todo.dom.js';
import { deleteCompleteTodo } from '../../store/todo.store.js';

export class TodoFilter {
  filterState = FILTER_STATE.ALL;

  showCompleteTodo() {
    const filteredTodo = this.todos.filter((todo) => todo.complete);

    renderList.bind(this)(filteredTodo);
    this.filterState = FILTER_STATE.COMPLETE;
  }

  showActiveTodo() {
    const filteredTodo = this.todos.filter((todo) => !todo.complete);

    renderList.bind(this)(filteredTodo);
    this.filterState = FILTER_STATE.ACTIVE;
  }

  showAllTodo() {
    renderList.bind(this)(this.todos);

    this.filterState = FILTER_STATE.ALL;
  }

  updateFilter() {
    if (this.filterState == FILTER_STATE.ACTIVE) {
      this.showActiveTodo();
    } else if (this.filterState == FILTER_STATE.COMPLETE) {
      this.showCompleteTodo();
    }
  }

  addDeleteEvent() {
    this.$btnClear.addEventListener('click', () => {
      deleteCompleteTodo.bind(this)();
      updateSummary.bind(this)();
    });
  }

  changeFilter() {
    this.$filter.addEventListener('click', (e) => {
      const $target = e.target;

      if (!this.todos || this.todos.length < 1) return;

      if ($target.classList.contains('btn-todo-active')) {
        this.showActiveTodo();
      } else if ($target.classList.contains('btn-todo-completed')) {
        this.showCompleteTodo();
      } else if ($target.classList.contains('btn-todo-all')) {
        this.showAllTodo();
      }

      if ($target.classList.contains('btn-todo-filter')) {
        changeFilterClass.bind(this)($target);
      }
    });
  }

  initFilterSelectors() {
    this.$filter = this.$wrapper.querySelector('.todo-filter');
    this.$btnFilter = this.$wrapper.querySelectorAll('.btn-todo-filter');
    this.$incomplete = this.$wrapper.querySelector('#incomplete');
    this.$complete = this.$wrapper.querySelector('#complete');
    this.$btnClear = this.$wrapper.querySelector('.btn-clear');
  }

  initFilter() {
    this.initFilterSelectors();
    this.changeFilter();
    this.addDeleteEvent();
  }
}
