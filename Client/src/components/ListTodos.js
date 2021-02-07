import React, { Fragment, useEffect, useState } from "react";

import EditTodo from "./EditTodo";

const URL = "http://localhost:3001";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  //delete todo function

  const deleteTodo = async id => {
    console.log(id)
    try {
      const deleteTodo = await fetch(`${URL}/${id}`, {
        method: "DELETE"
      });

      setTodos(todos.filter(todo => todo.idtodo !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getTodos = async () => {
    try {
      const response = await fetch(URL);
      const jsonData = await response.json();

      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  console.log(todos);

  return (
    <Fragment>
      {" "}
      <table class="table mt-5 text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.idtodo}>
              <td>{todo.idtodo}</td>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.idtodo)}
                >
                  Delete (Done)
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
