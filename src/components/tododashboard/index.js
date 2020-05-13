import React from "react";
import TodoTabs from "../todotabs";
import TodoListHeader from "../todolistheader";
import TodoList from "../todolist";
import AddTodo from "../addtodo";


const TodoDashboard = () => {
  return (
    <div>
      <TodoTabs />
      <table>
        <TodoListHeader />
        <TodoList />
        <AddTodo />
      </table>
    </div>
  );
};

export default TodoDashboard;
