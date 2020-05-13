import React, { useState, useEffect } from "react";
import Button from "../todobutton";
import { connect } from "react-redux";

const TodoForm = ({ type, formId, handleFormSubmit, handleCancel, postIdToEdit, posts }) => {
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [selectedOption, setSelectedOption] = useState(false);
  const [priority, setPriority] = useState("none");
  const [dueDate, setDueDate] = useState("");
  const [postToEdit, setPostToEdit] = useState(null);
  const [createdAt, setCreatedAt] = useState(null);
  let defaultFormType = 0; // ADD Form

  if (type === "edit") {
    defaultFormType = 1;
  }

  useEffect(() => populateFields(), []);

  const handleOptionChange = ev => {
    console.log(ev.target.value);
    setSelectedOption(ev.target.value);
  };

  const populateFields = () => {
    if (postIdToEdit !== null) {
      const post = getPostById(postIdToEdit);
      setPostToEdit(post);
      setTitle(post.title);
      setDescription(post.description);
      setPriority(post.priority);
      setDueDate(post.dueDate);
      setSelectedOption(post.currentState);
      setCreatedAt(post.createdAt);
    }
  };

  const getPostById = id => {
    return posts.find(post => post.id === id);
  };

  const getDate = () => {
    const today = new Date();
    return today.toISOString().substring(0, 10);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (defaultFormType === 0) {
      if (titleError === "" && descriptionError === "") {
        const newTodo = {
          id: Date.now() + "",
          currentState: selectedOption,
          title,
          description,
          createdAt: getDate(),
          dueDate,
          priority
        };
        handleFormSubmit(newTodo);
      }
    } else {
      const newTodo = {
        id: postToEdit.id,
        currentState: selectedOption,
        title,
        description,
        createdAt: postToEdit.createdAt,
        dueDate,
        priority
      };
      handleFormSubmit(newTodo);
    }
  };


  const validateTitle = () => {
    if (title.length < 10) setTitleError("Enter at least 10 characters");
    else if (title.length > 500) setTitleError("Max Length Exceeded");
    else setTitleError("");
  };

  const validateDescription = () => {
    if (description.length < 10)
      setDescriptionError("Enter at least 10 characters");
    else if (description.length > 500)
      setDescriptionError("Max Length Exceeded");
    else setDescriptionError("");
  };

  return (
    <div>
      <form id={formId}>
        <p>
          <label htmlFor="title">
            <span> Title:</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            id="title"
            onBlur={validateTitle}
          />
          <span className="error">{titleError}</span>
        </p>
        <p>
          <label htmlFor="description">
            <span> Description:</span>
          </label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}

            id="description"
            onBlur={validateDescription}
          ></textarea>
          <span className="error">{descriptionError}</span>
        </p>

        <p>
          <label htmlFor="due_date">
            <span>Due Date:</span>
          </label>
          <input
            type="date"
            name="due date"
            id="due_date"
            value={dueDate}
            onChange={event => setDueDate(event.target.value)}
          />
        </p>

        <p>
          <label htmlFor="priority">
            <span>Priority:</span>
          </label>
          <select
            id="priority"
            value={priority}
            name="priority"
            onChange={e => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="none">None</option>
          </select>
        </p>
        {defaultFormType === 1 && (
          <div className="createdat">
            <p>
              <label>
                <span>Created At:</span>
              </label>
              <span>{createdAt}</span>
            </p>
          </div>
        )}
        {defaultFormType === 1 && (
          <div className="createdat">
            <label>
              <span>Current State:</span>
            </label>
            <fieldset>
              <p className="radio">
                <input
                  type="radio"
                  value="true"
                  checked={selectedOption === true}
                  onChange={e => handleOptionChange(e)}
                  id="closed_task"
                />
                <label htmlFor="closed_task">
                  <span>Completed</span>
                </label>
              </p>
              <p className="radio">
                <input
                  type="radio"
                  value="false"
                  checked={selectedOption === false}
                  onChange={e => handleOptionChange(e)}
                  id="open_task"
                />
                <label htmlFor="open_task">
                  <span>Pending</span>
                </label>
              </p>
            </fieldset>
          </div>
        )}

        <Button
          name="Save"
          class_="submit"
          type="button"
          onClick={e => handleSubmit(e)}
        />
        <Button name="Cancel" class_="cancel" onClick={() => handleCancel()} />
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    posts: state.todos.todos,
    postIdToEdit: state.formEdit
  };
};

export default connect(mapStateToProps)(TodoForm);
