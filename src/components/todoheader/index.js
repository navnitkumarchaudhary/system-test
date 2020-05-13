import React from "react";
import { connect } from "react-redux";
import { globalTodoSearch } from "../../store/actions";
import _ from "lodash";

const TodoHeader = (props) => {
  const { searchTodo } = props;

  // to search todos
  const handelSearch = (event) => {
    event.preventDefault()
    const searchtext = event.target.value.replace(/^\s+/g, '');
    searchDebounce(searchtext);
  };

  // debaunce for todos search to reduce the function call
  const searchDebounce = _.debounce(function (searchtext) {
    searchTodo(searchtext);
  }, 1000);



  return (
    <div className="App-header">
      <header>Surify Todo App</header>
      <input type='text' className='search' id="seachinput" placeholder='Enter title/summary to search' onChange={handelSearch} />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  searchTodo: searchText => dispatch(globalTodoSearch(searchText))
});

export default connect(null, mapDispatchToProps)(TodoHeader);
