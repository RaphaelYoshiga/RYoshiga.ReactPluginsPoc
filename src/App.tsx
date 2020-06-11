import React from 'react';
import logo from './logo.svg';
import './App.css';
import { User, Todo, RootStore } from './models/ToDo'
import { types, getSnapshot } from "mobx-state-tree"

function App() {
  const john = User.create()
  const eat = Todo.create()

  console.log("John:", getSnapshot(john))
  console.log("Eat TODO:", getSnapshot(eat))
  
  const store = RootStore.create();
  store.addTodo("1", "Eat a cake");

  console.log("RootStore:", getSnapshot(store))
  const todosByUser = store.todos.get("1");

  todosByUser?.toggle();

  console.log("RootStore:", getSnapshot(store))
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
