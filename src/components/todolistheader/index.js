import React from "react";
import { connect } from "react-redux";
import { sortBySummary, sortByPriority, sortByCreatedOn, sortByDueDate, sortByActions } from "../../store/actions";

const TodoListHeader = ({ sortBySummary, sortByPriority, sortByCreatedOn, sortByDueDate, sortByActions }) => {
  return (
    <tbody>
      <tr>
      <th onClick={sortBySummary}></th>
      <th onClick={sortBySummary}>Summary</th>
      <th onClick={sortByPriority}>Priority</th>
      <th onClick={sortByCreatedOn}>Created On</th>
      <th onClick={sortByDueDate}>Due Date</th>
      <th onClick={sortByActions}>Actions</th>
      </tr>
    </tbody>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    sortBySummary: () => dispatch(sortBySummary()),
    sortByPriority: () => dispatch(sortByPriority()),
    sortByCreatedOn: () => dispatch(sortByCreatedOn()),
    sortByDueDate: () => dispatch(sortByDueDate()),
    sortByActions: () => dispatch(sortByActions())
  };
};

export default connect(null, mapDispatchToProps)(TodoListHeader);
