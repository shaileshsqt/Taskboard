import React, { useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { TASKS } from "./Data";
import "./Task.css";
const Task = (props) => {
  const { tasks } = props;
  const [task, setTask] = useState(tasks);
  const idRef = useRef();
  let pending = task.filter((t) => !t.done);
  let done = task.filter((t) => t.done);

  const onDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const onDrop = (id, value) => {
    // let id = e.dataTransfer.getData("text/plain");
    // e.currentTarget.classList.remove("dragged-over");
    let updated = task.map((task) => {
      if (task.id == id) task.done = value;
      return task;
    });
    setTask(updated);
  };

  return (
    <div className="Task">
      <Container>
        <div
          draggable="true"
          onDragOver={(e) => onDragOver(e)}
          className="pending small-box"
          onDrop={(e) => {
            onDrop(idRef.current, false);
          }}
        >
          <h3>Pending</h3>
          {pending.map((task) => (
            <div
              className="task"
              key={task.name}
              id={task.id}
              draggable
              onDragStart={(e) => {
                idRef.current = task.id;
              }}
            >
              {task.name}
            </div>
          ))}
        </div>
        <div
          className="done small-box"
          draggable
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => {
            console.log("id::", idRef.current);
            onDrop(idRef.current, true);
          }}
        >
          <h3> Complete</h3>
          {done.map((task) => (
            <div
              className="task"
              key={task.name}
              id={task.id}
              draggable
              onDragStart={(e) => {
                idRef.current = task.id;
              }}
              // onDragStart={(e) => onDragStart(e)}
            >
              {task.name}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Task;
