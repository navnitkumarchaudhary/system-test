import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Button from "../todobutton";
import TodoForm from "../todoform";
import Modal from "../modal";
import TodoListRow from "../todolistrow";
import { getSelectedRowsIds } from "../../utils";
import { deleteTodo, reOpenTodo, markDone, editTodo, setFormToEdit, clearFormToEdit, markBulkDone, markBulkPending } from "../../store/actions";


const TodoList = ({ todos, deleteTodo, reOpenTodo, markDone, setFormToEdit, clearFormToEdit, editTodo, markBulkDone, markBulkPending }) => {
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState([]);
  const [isOpenDescriptionModal, setIsOpenDescriptionModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [checkedItems, setCheckedItems] = useState(new Map());

  useEffect(() => {
    document.onkeyup = function (e) {

      if (e.key === "Escape" || e.which === 27) {//
        onEditDismiss();
        onDeleteConfirmation();
        onViewDismiss();
      }
      if ((e.ctrlKey && e.shiftKey && e.which === 70)) {
        document.getElementById("seachinput").focus();
      }
    }
  }, []
  )

  const handleBulkDelete = () => {
    let ids = getSelectedRowsIds(checkedItems);
    setDeleteModalIsOpen(true);
    setDeleteItem(ids);
  };

  const handleBulkDone = () => {
    let ids = getSelectedRowsIds(checkedItems);
    markBulkDone(ids);
  };

  const handleBulkPending = () => {
    let ids = getSelectedRowsIds(checkedItems);
    markBulkPending(ids);
  }

  const handleEdit = (e, postId) => {
    e.stopPropagation();
    setFormToEdit(postId);
    setEditModalIsOpen(true);
  };

  const onEditDismiss = () => {
    setEditModalIsOpen(false);
    clearFormToEdit();
  };


  const handleDelete = (e, postId) => {
    e.stopPropagation();
    setDeleteModalIsOpen(true);
    setDeleteItem([postId]);
  };

  const onDeleteConfirmation = () => {
    deleteTodo(deleteItem);
    setDeleteItem([]);
    setDeleteModalIsOpen(false);
  };

  const handleDone = (e, postId) => {
    e.stopPropagation();
    markDone(postId);
  };

  const handleOnReOpen = (e, postId) => {
    e.stopPropagation();
    reOpenTodo(postId);
  };

  const onViewDismiss = () => {
    setIsOpenDescriptionModal(false);
  };

  const openDescriptionModal = postId => {
    const item = todos.find(todo => todo.id === postId);

    const renderDescription = (
      <div>
        <p>Title: {item.title}</p>
        <p>Description: {item.description}</p>
        <p>Created At: {item.createdAt}</p>
        <p>Due Date: {item.dueDate}</p>
        <p>Priority: {item.priority}</p>
        <p>Current State: {item.currentState === true ? "Done" : "Open"}</p>
      </div>
    );
    setModalContent(renderDescription);
    setIsOpenDescriptionModal(true);
  };

  const handleTableRowClick = (e, postId) => {
    e.stopPropagation();
    if (!e.target.matches("input.PrivateSwitchBase-input-38")) {
      openDescriptionModal(postId);
    }

  };
  const handleCheckChange = (e) => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    checkedItems.set(item, isChecked)
    setCheckedItems(checkedItems);
  };

  return (
    <React.Fragment>
      <tbody>
        <TodoListRow handleTableRowClick={handleTableRowClick} handleEdit={handleEdit} handleDelete={handleDelete} handleDone={handleDone} handleOnReOpen={handleOnReOpen} handleCheckChange={handleCheckChange} checkedItems={checkedItems} />
        <div className="bulkopsdiv">
          <p>You can select multiple rows by clicking on checkbox and perform </p>
          <Button onClick={handleBulkDelete} name='Group Delete' class_='delete' />
          <Button onClick={handleBulkDone} name='Group Done' class_='done' />
          <Button onClick={handleBulkPending} name='Group Reopen' class_='re-open' />
        </div>
      </tbody>
      <Modal
        show={editModalIsOpen}
        onDismiss={onEditDismiss}
        title="Edit Todo"
        content={
          <TodoForm
            type="edit"
            handleCancel={onEditDismiss}
            handleFormSubmit={res => {
              editTodo(res);
              onEditDismiss();
            }}
          />
        }
      />
      <Modal
        show={deleteModalIsOpen}
        onDismiss={() => setDeleteModalIsOpen(false)}
        title="Delete Todo Confirmation"
        content={<p>Do you want to delete this task?</p>}
        actions={
          <React.Fragment>
            <Button
              name="Yes"
              onClick={onDeleteConfirmation}
              class_="delete"
            />
            <Button
              name="No"
              onClick={() => setDeleteModalIsOpen(false)}
              class_="warning"
            />
          </React.Fragment>
        }
      />
      <Modal
        show={isOpenDescriptionModal}
        onDismiss={() => setIsOpenDescriptionModal(false)}
        title="View Todo"
        content={modalContent}
        actions={
          <Button
            name="Ok"
            onClick={() => setIsOpenDescriptionModal(false)}
          />
        }
      />
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    todos: state.todos.todos
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteTodo: postId => dispatch(deleteTodo(postId)),
    reOpenTodo: postId => dispatch(reOpenTodo(postId)),
    markDone: postId => dispatch(markDone(postId)),
    editTodo: postId => dispatch(editTodo(postId)),
    setFormToEdit: postId => dispatch(setFormToEdit(postId)),
    clearFormToEdit: postId => dispatch(clearFormToEdit(postId)),
    markBulkDone: postIds => dispatch(markBulkDone(postIds)),
    markBulkPending: postIds => dispatch(markBulkPending(postIds))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
