import React, { Component } from "react";
import { render } from "react-dom";


const TodoType ={
  backlog: "backLog",
  inProgress: "InProgress"
}
const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

class App extends Component {
  state = {
    id: 0,
    todo: TodoType.backlog,
    todoItem: "",
    backlogList: [],
    inProgressList: []
  };

  handleTodoItemChange = event =>{
    const todoItemText = event.target.value;
    this.setState({todoItemText})  ;
  }

  handleSelectChange = event => {
    this.setState({ todo: event.target.value });
  };

  handleSubmit = event=>{
    event.preventDefault();
    if(this.state.todo === TodoType.backlog){
      this.setstate({
todoItem:"",
backloglist: [...this.state.backlogList, this.state.todoItem]
      })
    }
  }

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
            <option value={TodoType.backlog}>Backlog</option>
            <option value={TodoType.inProgress}>InProgress</option>
          </select>

          <input type="submit" value="Submit"  />
        </form>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
