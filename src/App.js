import React from "react";
import "./App.scss";
import TodoHeader from "./components/todoheader";
import TodoDashboard from "./components/tododashboard";



function App() {
  return (
    <div className="App">
      <TodoHeader />
      <TodoDashboard />
    </div>
  );
}

export default App;
