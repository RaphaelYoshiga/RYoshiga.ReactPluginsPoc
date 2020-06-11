import React from 'react';
import { values } from "mobx";
import { observer } from "mobx-react";
import { TodoListAdd } from "./TodoListAdd";
import { onSnapshot, applySnapshot } from "mobx-state-tree";

interface Props {
  store: any;
}

interface State {
  snapshots: any[];
  currentFrame: number;
}

@observer
export default class TodoList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { snapshots: [], currentFrame: -1 }

    onSnapshot(this.props.store, snapshot => {
      if (this.state.currentFrame === this.state.snapshots.length - 1) {
        this.state.snapshots.push(snapshot)
        this.setState({
          currentFrame: 1 + this.state.currentFrame,
          snapshots: this.state.snapshots
        })
      }
    })
  }

  render() {
    return (<div>
      <TodoListAdd store={this.props.store}></TodoListAdd>
      <h1>To do list:</h1>
      <div className="row">
        <div className="col-6">
          {this.props.store.getTodosWhereDoneIs(false).map((todo: any) => (
            <TodoView todo={todo} />
          ))}
        </div>
      </div>
      <button className="btn btn-warning" id="undo" onClick={() => this.undo()}>Undo</button>
    </div>);
  }

  undo() {
    if (this.state.currentFrame <= 0) {
      this.setState({ currentFrame: -1, snapshots: [] }, (() => applySnapshot(this.props.store, {})));
      return;
    }

    const frameToRollback = this.state.currentFrame - 1;
    const rollback = this.state.snapshots[frameToRollback];
    this.setState({ currentFrame: frameToRollback },
      (() => applySnapshot(this.props.store, rollback)));
  }
}

interface TodoProps {
  todo: any;
}

@observer
class TodoView extends React.Component<TodoProps> {
  render() {
    return (
      <div className="todo-item">
        {this.props.todo.name}
        <button className="btn btn-primary right" onClick={() => toggle(this.props.todo)}>Done!</button>
      </div>
    );
    function toggle(todo: any) {
      todo.toggle();
    }
  }
}