import React from "react";
import TaskBoard from "./TaskBoard";
import { ToastContainer } from "react-toastify";
import moment from "moment";
import Task from "./CustomDragDrop/Task";
import { TASKS } from "./CustomDragDrop/Data";
// import './TaskBoard.css';

const App = () => {
  return (
    <>
      {/* <ToastContainer
        // theme="colored"
        containerId="an id"
        draggable={false}
        pauseOnFocusLoss={false}
        autoClose={3000}
      />
      <div className="app">
        <div className="board-title">
          
          <h1 className="m-0">Task Board</h1>
          <h5 className="m-0">{moment().format('LLLL')}</h5>
        </div>
        <TaskBoard />
      </div> */}
      <Task tasks={TASKS} />
    </>
  );
};

export default App;
