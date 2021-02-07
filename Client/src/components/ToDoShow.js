import React, { Fragment } from "react";

//components

import InputTodo from "./InputTodo";
import ListTodos from "./ListTodos";

function ToDoShow() {
  return (
    <Fragment>
      <div className="container">
        <InputTodo />
        <ListTodos />
      </div>
    </Fragment>
  );
}

export default ToDoShow;