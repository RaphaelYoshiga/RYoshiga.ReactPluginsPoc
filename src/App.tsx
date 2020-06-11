import React from 'react';
import './App.css';
import { RootStore } from './models/Todo'
import TodoList from './TodoList';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const store = RootStore.create();
  return (
    <div>
      <header className="header">
        <div className="container">
          <h2>Todo list demo - mobx-state-tree</h2>
        </div>
      </header>
      <div className="container">         
        <TodoList store={store}></TodoList>
      </div>
    </div>

  );
}

export default App;
