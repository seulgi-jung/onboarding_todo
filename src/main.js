import { Todo } from './pages/todo/Todo.js';
import { TodoList } from './components/todo/todoList/TodoList.js';
import { TodoEmpty } from './components/todo/todoEmpty/TodoEmpty';

import { EMPTY_MSG, FILTER_STATE } from './const/todo.const.js';

import { getTodos, setTodos } from './service/todo.service.js';

import { DragAndDrop } from './utils/dnd.js';

class TodoFilter {
  filterState = FILTER_STATE.ALL;

  filterComplete() {
    const filteredTodo = this.todos.filter((todo) => todo.complete);

    this.renderList(filteredTodo);
    this.filterState = FILTER_STATE.COMPLETE;
  }

  filterActive() {
    const filteredTodo = this.todos.filter((todo) => !todo.complete);

    this.renderList(filteredTodo);
    this.filterState = FILTER_STATE.ACTIVE;
  }

  filterAll() {
    this.renderList(this.todos);
    this.filterState = FILTER_STATE.ALL;
  }

  changeClass($target) {
    const activeClass = 'is-active';

    this.$btnFilter.forEach(function (btn) {
      btn.classList.remove(activeClass);
    });

    $target.classList.add(activeClass);
  }

  deleteCompleteTodo() {
    this.$btnClear.addEventListener('click', () => {
      const filteredTodo = this.todos.filter(({ complete }) => !complete);

      this.todos = filteredTodo;
      this.todoState.complete = 0;
      this.updateSummary();
      this.renderList(this.todos);

      setTodos(this.id, this.todos);
    });
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

  updateFilter() {
    if (this.filterState == FILTER_STATE.ACTIVE) {
      this.filterActive();
    } else if (this.filterState == FILTER_STATE.COMPLETE) {
      this.filterComplete();
    }
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

class TodoListApp extends TodoFilter {
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
    this.setTodoState();
    if (options?.useDnd) this.useDnd = true;
  }

  setTodoState() {
    this.todos.forEach((todo) => {
      todo.complete ? this.todoState.complete++ : this.todoState.incomplete++;
    });
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
      this.addTodo(value);
      this.renderList(this.todos);

      if (this.filterState) this.updateSummary();
    });
  }

  addTodo(value) {
    const timestamp = Date.now();
    const todo = {
      key: timestamp,
      value,
      complete: false,
    };
    this.todos.unshift(todo);

    setTodos(this.id, this.todos);
  }

  updateTodo(targetKey) {
    let targetTodo = [];

    const filteredTodos = this.todos.filter((todo) => {
      if (todo.key === targetKey) {
        targetTodo = todo;
        targetTodo.complete = !targetTodo.complete;
      } else {
        return todo;
      }
    });

    if (targetTodo.complete) {
      this.todos = [...filteredTodos, targetTodo];
    } else {
      this.todos = [targetTodo, ...filteredTodos];
    }
    this.renderList(this.todos);
    setTodos(this.id, this.todos);
  }

  updateTodoState(targetChecked) {
    if (targetChecked) {
      this.todoState.complete++;
      this.todoState.incomplete--;
    } else {
      this.todoState.complete--;
      this.todoState.incomplete++;
    }
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

        this.updateTodo(targetKey);

        if (!this.filterState) return;
        this.updateTodoState(targetChecked);
        this.updateFilter();
        this.updateSummary();
      }
    });
  }

  renderList(todos) {
    if (todos.length > 0) {
      this.$todo_body.innerHTML = TodoList({
        todos: todos,
      });
      if (!this.Dnd) return;

      this.$todo_list = this.$wrapper.querySelector('.todo-list');
      this.Dnd.updateDropzone(this.$todo_list);
    } else {
      this.$todo_body.innerHTML = TodoEmpty({
        msg: EMPTY_MSG,
      });
    }
  }

  renderTodo() {
    this.$wrapper.innerHTML = Todo({
      todos: this.todos,
      todoState: this.todoState,
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
    this.renderTodo();
    this.initSelectors();
    this.initFilter();
    this.onSubmit();
    this.changeComplete();

    if (!this.useDnd) return;
    this.initDnd();
  }
}

const todoListApp = new TodoListApp({
  id: '1',
  wrapper: document.querySelector('#app'),
  options: {
    useDnd: true,
  },
});

const todoListApp2 = new TodoListApp({
  id: '2',
  wrapper: document.querySelector('#app2'),
  options: {
    useDnd: true,
  },
});

const todoListApp3 = new TodoListApp({
  id: '3',
  wrapper: document.querySelector('#app3'),
});
todoListApp.init();
todoListApp2.init();
todoListApp3.init();
