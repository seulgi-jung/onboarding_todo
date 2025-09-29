import { FILTER_STATE } from '../../const/todo.const.js';

export const changeFilterClass = function ($target) {
  const activeClass = 'is-active';

  this.$btnFilter.forEach(function (btn) {
    btn.classList.remove(activeClass);
  });

  $target.classList.add(activeClass);
};

export const changeFilterList = function () {
  switch (this.filterState) {
    case FILTER_STATE.ALL:
      this.showAllTodo();
      break;
    case FILTER_STATE.COMPLETE:
      this.showCompleteTodo();
      break;
    case FILTER_STATE.ACTIVE:
      this.showActiveTodo();
      break;
    default:
      this.showAllTodo();
      break;
  }
};
