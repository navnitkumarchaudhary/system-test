import React from "react";
import { connect } from "react-redux";
import { showAll, showPending, showCompleted } from "../../store/actions";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const TodoTabs = ({ showAll, showPending, showCompleted }) => {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        centered
        style={{ color: "secondary" }}
      >
        <Tab label="SHOW ALL" onClick={showAll} />
        <Tab label="COMPLETED" onClick={showCompleted} />
        <Tab label="PENDING" onClick={showPending} />
      </Tabs>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    filter: state.filter
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showAll: () => dispatch(showAll()),
    showPending: () => dispatch(showPending()),
    showCompleted: () => dispatch(showCompleted())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoTabs);
