import React from "react";

interface State{
  value: string
}

interface Props {
  store: any;
}

export class TodoListAdd extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: any) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event: any) {
    this.props.store.addTodo("1", this.state.value);
    event.preventDefault();
  }
  
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Todo:
          <input type="text" required className="form-control" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" className="btn btn-primary" value="Add" />
      </form>
    );
  }
}