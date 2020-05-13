import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "../todobutton";
import Modal from "../modal";
import TodoForm from "../todoform";
import { addTodo } from "../../store/actions";

const AddTodo = ({ addTodo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [issubmit, setSubmit] = useState(false);
  const [Data, setData] = useState(null);

  const handleSubmit = () => {
    setSubmit(false)
    setIsOpen(false);
    addTodo(Data);
  };

  const openConfirmationPopup = (data) => {
    setSubmit(true)
    setData(data);
  }

  return (
    <div className="add-todo">
      <Button name="+" class_="todo-btn" onClick={() => setIsOpen(true)} />
      {isOpen ? <Modal
        show={isOpen}
        title="Add Todo"
        content={
          <TodoForm
            formId="addForm"
            handleFormSubmit={openConfirmationPopup}
            handleCancel={() => setIsOpen(false)}
          />
        }
        onDismiss={() => setIsOpen(false)}
      /> : null}
      
      {issubmit ? <Modal
        show={issubmit}
        onDismiss={() => setSubmit(false)}
        title="Add Todo Confirmation"
        content={<p>Do you want to add this task?</p>}
        actions={
          <React.Fragment>
            <Button
              name="Yes"
              onClick={handleSubmit}
              class_="warning"
            />
            <Button
              name="No"
              onClick={() => setSubmit(false)}
              class_="delete"
            />
          </React.Fragment>
        }
      /> : null}
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    addTodo: todo => dispatch(addTodo(todo))
  };
};

export default connect(null, mapDispatchToProps)(AddTodo);
