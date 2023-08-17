import React from "react";
import moment from "moment";
import Task from "./Task";
const Home = () => {
  return (
    <div>
      <div className="app">
        <div className="board-title">
          <h1 className="m-0">Learning Coding</h1>
          <h5 className="m-0">{moment().format("LLLL")}</h5>
        </div>
        <Task />
      </div>
    </div>
  );
};

export default Home;
