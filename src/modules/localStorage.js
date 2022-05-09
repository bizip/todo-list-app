const getItem = () => JSON.parse(localStorage.getItem('todoList'));

const setItem = (data) => {
  localStorage.setItem('todoList', JSON.stringify(data));
};
export { getItem, setItem };