import React, { Component } from "react";
import { render } from "react-dom";
import { ToggleButton } from "react-bootstrap";

import TodoList from "./TodoList";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};


const handleTodoItemChange = () =>{
  


}
const handleSubmit = () => {

e.preventDefault();
const searchText = this.input.value;
console.log("submit click")
console.log(this.input.value);
}


class App extends Component {
  state = {
    Heros : []
  };

  render() {
    return (
      <div style={styles}>
        <h2>Search and add SuperHeroes{"\u2728"}</h2>
        <form onSubmit={this.handleSubmit}>
          <label>SuperHero Name: </label>
          <input
            type="text"
            value={this.state.todoItem}
            onChange={this.handleTodoItemChange}
          />
          <input
          type="text"
          ref={(inout => this.input = input)}

          <input type="submit" value="Submit" />
        </form>
        <hr />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
