import './TodoFoot.css';
import { FILTER_STATE } from '../../../const/todo.const.js';
import { setTodos } from '../../../service/todo.service.js';

import { renderList } from '../../../utils/render/todo.rendor.js';
import { deleteCompleteTodo } from '../../../store/todo.store.js';

export class TodoFilter {
  filterState = FILTER_STATE.ALL;

  filterComplete() {
    const filteredTodo = this.todos.filter((todo) => todo.complete);

    renderList.bind(this)(filteredTodo);
    this.filterState = FILTER_STATE.COMPLETE;
  }

  filterActive() {
    const filteredTodo = this.todos.filter((todo) => !todo.complete);

    renderList.bind(this)(filteredTodo);
    this.filterState = FILTER_STATE.ACTIVE;
  }

  filterAll() {
    renderList.bind(this)(this.todos);

    this.filterState = FILTER_STATE.ALL;
  }

  updateFilter() {
    if (this.filterState == FILTER_STATE.ACTIVE) {
      this.filterActive();
    } else if (this.filterState == FILTER_STATE.COMPLETE) {
      this.filterComplete();
    }
  }

  changeClass($target) {
    const activeClass = 'is-active';

    this.$btnFilter.forEach(function (btn) {
      btn.classList.remove(activeClass);
    });

    $target.classList.add(activeClass);
  }

  deleteCompleteTodo() {
    this.$btnClear.addEventListener('click', deleteCompleteTodo.bind(this));
  }

  initFilterSelectors() {
    this.$filter = this.$wrapper.querySelector('.todo-filter');
    this.$btnFilter = this.$wrapper.querySelectorAll('.btn-todo-filter');
    this.$incomplete = this.$wrapper.querySelector('#incomplete');
    this.$complete = this.$wrapper.querySelector('#complete');
    this.$btnClear = this.$wrapper.querySelector('.btn-clear');
  }

  updateSummary() {
    this.$complete.innerText = this.todoState.complete;
    this.$incomplete.innerText = this.todoState.incomplete;
  }

  filter() {
    this.$filter.addEventListener('click', (e) => {
      const $target = e.target;

      if (!this.todos || this.todos.length < 1) return;

      if ($target.classList.contains('btn-todo-active')) {
        this.filterActive();
      } else if ($target.classList.contains('btn-todo-completed')) {
        this.filterComplete();
      } else if ($target.classList.contains('btn-todo-all')) {
        this.filterAll();
      }

      if ($target.classList.contains('btn-todo-filter')) {
        this.changeClass($target);
      }
    });
  }

  initFilter() {
    this.initFilterSelectors();
    this.filter();
    this.deleteCompleteTodo();
  }
}

export const TodoFoot = ({ todoState }) => {
  return `
    <div class="todo-foot">
      <em class="todo-summary"><span id="incomplete">${todoState.incomplete}</span> items left</em>

      <div class="todo-filter">
        <button class="btn-todo-filter btn-todo-all is-active">All</button>
        <button class="btn-todo-filter btn-todo-active">Active</button>
        <button class="btn-todo-filter btn-todo-completed">Completed</button>
      </div>
      
      <button class="btn-clear">Clear completed (<span id="complete">${todoState.complete}</span>)</button>
    </div>
  `;
};
