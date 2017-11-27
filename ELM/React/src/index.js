import { combineReducers, createStore } from "redux";
import React, { Component } from "react";
import ReactDOM from "react-dom";

let nextTodoId = 0;
class TodoApp extends Component {
  render() {
    return (
      <div>
        <input
          ref={node => {
            this.input = node;
          }}
        />
        <button
          onClick={() => {
            store.dispatch({
              type: "ADD_TODO",
              text: this.input.value,
              id: nextTodoId++
            });
            this.input.value = "";
          }}
        >
          Add Todo
        </button>
        <ul>
          {this.props.todos.map(todo => <li key={todo.id}>{todo.text}</li>)}
        </ul>
      </div>
    );
  }
}

//Rendered to the DOM. The TodoApp Component that takes props todos that is that current todos array from the redux store.
const render = () => {
  ReactDOM.render(
    <TodoApp todos={store.getState().todos} />,
    document.getElementById("root")
  );
};

//Adds a change listener. It will be called any time an action is dispatched,
store.subscribe(render);
render();
