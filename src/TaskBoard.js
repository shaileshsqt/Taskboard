import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import AddNewTaskModal from "./Modal/AddNewTaskModal";
import ManImg from "../src/Images/man3.jpg";
import Dropdown from "react-bootstrap/Dropdown";
import { GrAddCircle, GrFormAdd } from "react-icons/gr";
import { BsAlignMiddle } from "react-icons/bs";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { CgMathEqual } from "react-icons/cg";
import { IoIosArrowUp } from "react-icons/io";
import {
  MdKeyboardDoubleArrowUp,
  MdKeyboardDoubleArrowDown,
} from "react-icons/md";
import moment from "moment";
import { toast } from "react-toastify";

const TaskBoard = () => {
  let TaskData = JSON.parse(localStorage.getItem("tasks"));

  const [taskListNew, setTaskListNew] = useState(TaskData);
  const [TaskIDData, setTaskIDData] = useState();
  const [AddTaskModalShow, setAddTaskModalShow] = useState(false);

  function Icons(icon) {
    if (icon === "Low") {
      return (
        <span className="low">
          <MdKeyboardDoubleArrowDown />
        </span>
      );
    } else if (icon === "High") {
      return (
        <span className="high">
          <IoIosArrowUp />
        </span>
      );
    } else if (icon === "Normal") {
      return (
        <span className="Normal">
          <CgMathEqual />
        </span>
      );
    } else if (icon === "Highest") {
      return (
        <span className="Highest">
          <MdKeyboardDoubleArrowUp />
        </span>
      );
    } else if (icon === undefined && icon === null && icon === "") {
      return "";
    }
  }

  function fnAddEditTaskbtn(e, t) {
    setAddTaskModalShow(true);
    setTaskIDData(t);
  }
  function fnDelete(id) {
    // debugger;
    // fetch(`http://localhost:3005/taskList/${id}`, {
    //   method: "Delete",
    //   headers: { "Content-Type": "application/json" },
    //   mode: "cors",
    // }).then((res) => {
    //   toast.success("Task Deleted Succesfully!");
    //   // fetchData();
    //   // toast.success("Succesfully Deleted User !!!");
    // });
    let body = TaskData?.filter((f) => f.id !== id);
    toast.success("Succesfully Deleted Task!");
    localStorage.setItem("tasks", JSON.stringify(body));
    setTaskListNew(body);
  }
  function onDragOver(e) {
    e.preventDefault();
  }
  function onDragStart(e, id) {
    e.dataTransfer.setData("id", id);
  }
  function onDrop(e, cat) {
    let id = e.dataTransfer.getData("id");

    taskListNew.filter((task) => {
      if (task.id === id) {
        if (task.status !== cat) {
          // let body = {
          //   id: parseInt(id),
          //   details: task.details,
          //   title: task.title,
          //   status: cat,
          //   priority: task.priority,
          //   createdOn: task.createdOn,
          // };
          // fetch(`http://localhost:3005/taskList/${parseInt(id)}`, {
          //   method: "PUT",
          //   headers: { "Content-Type": "application/json" },
          //   mode: "cors",
          //   body: JSON.stringify(body),
          // }).then((res) => {
          //   toast.success("Task Dragged Succesfully!");
          //   // fetchData();
          // });
          let updatedData = TaskData?.map((item) => {
            if (item.id === id) {
              item.id = id;
              item.details = task.details;
              item.title = task.title;
              item.status = cat;
              item.priority = task.priority;
              item.createdOn = task.createdOn;
              // item.details = task.details;
              // item.title = task.title;
              // item.priority = task.priority;
              // setSelectedPriority(props.TaskData.priority);
            }
            return item;
          });

          toast.success("Modified Succesfully Task!");

          localStorage.setItem("tasks", JSON.stringify(updatedData));
          setTaskListNew(updatedData);
        }
      }
      // fetchData();
      return task;
    });
  }

  const tasks = {
    InReview: [],
    ToDo: [],
    InProgress: [],
    Done: [],
  };

  // console.log("tasks Array ::", tasks);
  // console.log("taskListNew ::", taskListNew);
  taskListNew?.forEach((t) => {
    console.log("T", t);
    tasks[t.status.replace(" ", "")].push(
      <div
        key={t.title}
        onDragStart={(e) => onDragStart(e, t.id)}
        draggable
        className="draggable-box"
      >
        {/* <div className="draggable-box-board-title">ID : {t.id}</div> */}
        <div className="d-flex justify-content-between">
          <div className="draggable-box-board-title pb-2">{t.title}</div>
          <Dropdown>
            <Dropdown.Toggle variant="" id="dropdown-basic"></Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={(e) => fnAddEditTaskbtn(e, t)}>
                <AiFillEdit className="me-3 edit" /> Edit
              </Dropdown.Item>
              <Dropdown.Item onClick={(e) => fnDelete(t.id)}>
                <AiFillDelete className="me-3 delete" />
                Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="card-fooot align-items-center justify-content-between d-flex">
          <div className="draggable-box-description time-format">
            {moment(t.createdOn).fromNow()}
          </div>
          <div className="draggable-box-description">
            <span className="prio-icon">{Icons(t.priority)}</span>
            <img src={ManImg} />
          </div>
        </div>
      </div>
    );
  });

  // const fetchData = async () => {
  //   const res = await fetch("http://localhost:3005/taskList");
  //   const data = await res.json();
  //   setTaskListNew(data);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <>
      <div>
        <Container>
          <div className="d-flex">
            <span className="m-0 blink">Add Task from Here...</span>
            <div className="arrow-container">
              <div className="arrow-down"></div>
            </div>
          </div>
          <div className="board-items">
            <div
              className="board-item"
              onDragOver={(e) => onDragOver(e)}
              onDrop={(e) => onDrop(e, "To Do")}
            >
              <div className="task-header not-started-col justify-content-between">
                <span className="task-number">
                  TO DO<span className="ps-2">{tasks.ToDo.length}</span>
                </span>
                <span
                  onClick={(e) => fnAddEditTaskbtn(e)}
                  className="task-number"
                >
                  {/* <GrFormAdd */}
                  <GrAddCircle
                    style={{ color: "#fff", height: "28px", width: "28px" }}
                  />
                </span>
              </div>
              <div className="table-section-col">
                <div className="board-hight">{tasks.ToDo}</div>
              </div>
            </div>
            <div
              className="board-item"
              onDragOver={(e) => onDragOver(e)}
              onDrop={(e) => onDrop(e, "In Progress")}
            >
              <div className="task-header not-started-col justify-content-between">
                <span className="task-number">
                  IN PROGRESS
                  <span className="ps-2">{tasks.InProgress.length}</span>
                </span>
              </div>
              <div className="table-section-col">
                <div className="board-hight">{tasks.InProgress}</div>
              </div>
            </div>
            <div
              className="board-item"
              onDragOver={(e) => onDragOver(e)}
              onDrop={(e) => onDrop(e, "In Review")}
            >
              <div className="task-header not-started-col justify-content-between">
                <span className="task-number">
                  IN REVIEW
                  <span className="ps-2">{tasks.InReview.length}</span>
                </span>

                {/* <span className="task-number">{tasks.InReview.length}</span> */}
              </div>
              <div className="table-section-col">
                <div className="board-hight">{tasks.InReview}</div>
              </div>
            </div>
            <div
              className="board-item"
              onDragOver={(e) => onDragOver(e)}
              onDrop={(e) => onDrop(e, "Done")}
            >
              <div className="task-header not-started-col justify-content-between">
                <span className="task-number">
                  DONE
                  <span className="ps-2">{tasks.Done.length}</span>
                </span>
              </div>
              <div className="table-section-col">
                <div className="board-hight">{tasks.Done}</div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      {AddTaskModalShow && (
        <AddNewTaskModal
          show={AddTaskModalShow}
          TaskData={TaskIDData}
          bindList={setTaskListNew}
          // UserID={UserID}
          //   Userdata={Userdata}
          onHide={() => setAddTaskModalShow(false)}
        />
      )}
    </>
  );
};

export default TaskBoard;
