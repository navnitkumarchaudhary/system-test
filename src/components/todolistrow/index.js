import React from "react";
import { connect } from "react-redux";

import Button from "../todobutton";
import {
  compareValues,
  getFilteredList,
  prioritySort,
  timeSortCreatedOn,
  timeSortDueDate,
  actionSort
} from "../../utils";
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Checkbox from '@material-ui/core/Checkbox';

const TodoListRow = ({ todos, filterBy, handleTableRowClick, sort, handleEdit, handleDelete, handleDone, handleOnReOpen, handleCheckChange }) => {
  let filteredTodos = getFilteredList(todos, filterBy);
  
  if (sort.sortBy === "title") {
    let order = sort.type ? "asc" : "desc";
    const newTodos = filteredTodos.sort(compareValues("title", order));
    filteredTodos = newTodos;
  }

  if (sort.sortBy === "priority") {
    const newTodos = filteredTodos.sort(prioritySort);
    if (sort.type) filteredTodos = newTodos;
    else filteredTodos = newTodos.reverse();
  }

  if (sort.sortBy === "created_on") {
    const newTodos = filteredTodos.sort(timeSortCreatedOn);
    if (sort.type) filteredTodos = newTodos;
    else filteredTodos = newTodos.reverse();
  }

  if (sort.sortBy === "due_date") {
    const newTodos = filteredTodos.sort(timeSortDueDate);
    if (sort.type) filteredTodos = newTodos;
    else filteredTodos = newTodos.reverse();
  }

  if (sort.sortBy === "actions") {
    const newTodos = filteredTodos.sort(actionSort);
    if (sort.type) filteredTodos = newTodos;
    else filteredTodos = newTodos.reverse();
  }

  return filteredTodos.map((todo, index) => (
    <tr className={
      "table-data " + (todo.currentState ? "complete" : "in-complete")
    } key={index} onClick={e => handleTableRowClick(e, todo.id)}>
      <td>
        <Checkbox
          name={todo.id}
          checked={todo.checked}
          onChange={(e) => handleCheckChange(e)}
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
      </td>
      <td
        className={
          "table-data " + (todo.currentState ? "complete" : "in-complete")
        }
      >
        {todo.title}
      </td>
      <td
        className={
          "table-data " + (todo.currentState ? "complete" : "in-complete")
        }
      >
        {todo.priority}
      </td>
      <td
        className={
          "table-data " + (todo.currentState ? "complete" : "in-complete")
        }
      >
        {todo.createdAt}
      </td>
      <td
        className={
          "table-data " + (todo.currentState ? "complete" : "in-complete")
        }
      >
        {todo.dueDate}
      </td>
      <td
        className={
          "table-data " + (todo.currentState ? "complete" : "in-complete")
        }
      >
        {todo.currentState ? (<div className="todo-item action">
          <Button name={"Reopen"} class_="re-open" onClick={e => handleOnReOpen(e, todo.id)} />
        </div>) : (<div className="todo-item action">
          <IconButton color="primary" className="abc" aria-label="upload picture" component="span" onClick={e => handleEdit(e, todo.id)}>
            <EditIcon></EditIcon>
          </IconButton>
          <IconButton color="secondary" aria-label="upload picture" component="span" onClick={e => handleDelete(e, todo.id)}>
            <DeleteIcon></DeleteIcon>
          </IconButton>
          <IconButton style={{ color: "green" }} aria-label="upload picture" component="span" onClick={e => handleDone(e, todo.id)}>
            <CheckCircleIcon></CheckCircleIcon>
          </IconButton>
        </div>)}
      </td>
    </tr>
  ));
};


const mapStateToProps = state => {
  return {
    todos: state.todos.todos,
    filterBy: state.filter,
    sort: state.sort
  };
};

export default connect(mapStateToProps)(TodoListRow);
