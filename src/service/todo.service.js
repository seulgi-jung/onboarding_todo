export const getTodos = function (key) {
  const todos = localStorage.getItem(key);
  return todos ? JSON.parse(todos) : [];
};

export const setTodos = function (key, data) {
  localStorage.setItem(key, JSON.stringify(data));
};
