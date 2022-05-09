import trash from '../trash.svg';
import { getItem, setItem } from './localStorage.js';

export default class Todo {
  constructor() {
    this.todoList1 = getItem() || [];
  }

  newTodolist = () => {
    const formToReset = document.getElementById('frm');
    const newInput = document.getElementById('new-todo');
    newInput.addEventListener('keypress', (e) => {
      if (e.code === 'Enter') {
        if (e.target.value.length > 0) {
          const value = {
            description: e.target.value,
            isCompleted: false,
            index: this.todoList1.length,
          };
          this.todoList1.push(value);
          setItem(this.todoList1);
          formToReset.reset();
        }
      }
      this.getList();
    });
  }

  clearLocalStorage = () => {
    const listToclear = this.todoList1.filter((todo) => !todo.isCompleted);
    setItem(listToclear);
    this.todoList1 = listToclear;
    window.location.reload();
  }

  getList = () => {
    const lst = document.getElementById('list');
    lst.innerHTML = this.todoList1.map((el, index) => (` <li class="list">
          <div class="single_list checked">
              <input type="checkbox" class="check-box">
              <input type="text" class="edit-value ${!!el.isCompleted}"  data-id="${el.index}" value="${el.description}" />
          </div>
        
          <img src="${trash}" data-id='${index}' class='setting' alt="settings" />
          </li>`)).join('');
  }

  removeFromList = (idx) => {
    this.todoList1.splice(idx, 1);
    for (let i = 0; i < this.todoList1.length; i += 1) {
      this.todoList1[i].index = i;
    }
    setItem(this.todoList1);
    this.getList();
  }

  editSingleTodo = (value, index) => {
    this.todoList1[index].description = value;
    setItem(this.todoList1);
  }
}