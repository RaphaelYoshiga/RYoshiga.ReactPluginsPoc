import React from 'react';
import './App.css';
import { User, Todo, RootStore } from './models/Todo'
import TodoList from './TodoList';
import { getSnapshot } from "mobx-state-tree"
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const store = RootStore.create();
  return (
    <div>
      ToDoList:
      <TodoList store={store}></TodoList>
    </div>
    // <div className="App">

    // </div>
  );
}

export default App;
