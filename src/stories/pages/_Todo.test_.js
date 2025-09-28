import { screen, fireEvent } from '@testing-library/dom';

import { TodoListApp } from '../../utils/todo/todo.js';
import userEvent from '@testing-library/user-event';

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

  // 1. TO-DO 입력부
  test('1-1. TO-DO 입력 받을 수 있는 input요소가 있다.', () => {
    const todoInput = screen.getByPlaceholderText(/What needs to be done?/i);
    expect(todoInput).toBeInTheDocument();
  });

  test('1-2. input 의 데이터가 없으면, empty msg 가 노출됨', () => {
    if (todoList.todos.length === 0) {
      const emptyMSG = screen.getByText(/There are no to-do items. Please write your to-dos/i);

      if (todoList.todos === []) {
        expect(emptyMSG).toBeInTheDocument();
      }
    }
  });

  //submitTodo 테스트
  test('1-3-1. input 의 데이터가 입력되면, 목록 첫번쨰에 추가됨', async () => {
    const todoInput = screen.getByPlaceholderText(/What needs to be done?/i);
    const todo = userEvent.setup();
    expect(todoInput).toBeInTheDocument();
    todoInput.value = '할 일1';
    await todo.type(todoInput, '{enter}');
    const todoLabel = screen.getByLabelText('할 일1');
    expect(todoLabel).toBeInTheDocument();
  });

  test('1-3-2. input 의 데이터가 입력되면, 완료되지않은 갯수가 +1 된다', async () => {
    const todoInput = screen.getByPlaceholderText(/What needs to be done?/i);
    const todo = userEvent.setup();
    expect(todoInput).toBeInTheDocument();
    todoInput.value = '할 일2';

    await todo.type(todoInput, '{enter}');
    expect(document.querySelector('#incomplete').innerText).toBe(
      screen.getAllByRole('listitem').length
    );
  });

  test('1-4-2. 완료된 항목을 체크해제하면 목록 상단으로 이동하고, 미완료된 항목의 갯수가 갱신된다', () => {});

  // 2. TO-DO 출력부

  // 3. 하단정보 출력부
});
