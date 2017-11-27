//Take an Array of objects and return an array of react elements
import React from "react";

const TodoList = props => {
  const todoElements = props.todoList.map(item => {
    return <li key={item.id}>{item.todoItem}</li>;
  });

  return (
    <div>
      <h2>{props.title}</h2>
      <ul>{todoElements}</ul>
    </div>
  );
};

export default TodoList;
