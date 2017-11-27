import React, { Component } from "react";
import { render } from "react-dom";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

class App extends Component {
  state = {
    id: 0,
    todo: "Backlog",
    todoItem: "",
    backlogList: [],
    inProgressList: []
  };

  handleOnSubmit = event => {
    if(this.event.value == "Backlog"){
     App.setState({backloglist: event.target.value})
     App.setState({id: this.id++})
    } else {
      App.setState({inProgressList:[event.target.value]})
    }
  }

  handleSelectChange = event => {
    this.setState({ todo: event.target.value });
  };

  render() {
    return (
      <div style={styles}>
        <h2>Working Todo's Backlog and In Progress {"\u2728"}</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Todo:</label>
          <input
            type="text"
            value={this.state.todoItem}
            onChange={this.handleTodoItemChange}
          />
          <select value={this.state.todo} onChange={this.handleSelectChange}>
            <option value="Backlog">Backlog</option>
            <option value="InProgress">InProgress</option>
          </select>

          <input type="submit" value="Submit"  />
        </form>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
