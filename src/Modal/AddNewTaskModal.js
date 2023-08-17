import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { commonservices } from "../Services/CommonServices";
// import DatePicker from "react-multi-date-picker";
// import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
// import { useSelector } from "react-redux";

const AddNewTaskModal = (props) => {
  let TaskData = JSON.parse(localStorage.getItem("tasks"));
  const [SelectedPriority, setSelectedPriority] = useState("");

  const [UserRoleValidation, setUserRoleValidation] = useState(false);

  const PriorityList = [
    { value: "Low", label: "Low" },
    { value: "High", label: "High" },
    { value: "Normal", label: "Normal" },
    { value: "Highest", label: "Highest" },
  ];

  const [input, setInput] = useState({
    id: "",
    details: "",
    title: "",
    priority: "",
    status: "",
    createdOn: "",
    errors: {
      id: "",
      details: "",
      title: "",
      priority: "",
      status: "",
      createdOn: "",
      ValidationRules: [
        {
          FieldName: "title",
          ValidationType: "required",
          ValidationMessage: "This Field is a required field",
        },
      ],
    },
  });

  const handlePriority = (e) => {
    setSelectedPriority(e.value);
  };

  useEffect(() => {
    if (
      props.TaskData !== null &&
      props.TaskData !== undefined &&
      props.TaskData !== ""
    ) {
      setInput({
        ...input,
        ["id"]: props.TaskData.id,
        ["details"]: props.TaskData.details,
        ["title"]: props.TaskData.title,
      });
      setSelectedPriority(props.TaskData.priority);
    }
    // if (props.TaskData && props.TaskData.priority) {
    //   setSelectedPriority(props.TaskData.priority);
    // }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (SelectedPriority !== undefined && SelectedPriority !== "") {
      setUserRoleValidation(false);
    } else {
      setUserRoleValidation(true);
    }

    let obj = commonservices.fnCheckValidationOfObject(input);
    setInput({
      ...obj.obj,
    });

    if (obj.isValid) {
      let body = {
        id:
          props.TaskData !== undefined
            ? props.TaskData.id
            : commonservices.createGuid(),
        details: input.details,
        title: input.title,
        priority: SelectedPriority,
        status: props.TaskData ? props.TaskData.status : "To Do",
        createdOn: new Date(),
      };
      

      // return;

      if (
        props.TaskData !== undefined &&
        props.TaskData !== null &&
        props.TaskData !== ""
      ) {
        // fetch(`http://localhost:3005/taskList/${props.TaskData.id}`, {
        //   method: "PUT",
        //   headers: { "Content-Type": "application/json" },
        //   mode: "cors",
        //   body: JSON.stringify(body),
        // }).then((res) => {
        //   toast.success("Task Edited Succesfully!");
        //   props.bindList();
        //   props.onHide();
        // });
        let updatedData = TaskData?.map((item) => {
          if (item.id === input.id) {
            item.details = input.details;
            item.title = input.title;
            item.priority = SelectedPriority;
            // setSelectedPriority(props.TaskData.priority);
          }
          return item;
        });

        toast.success("Edited Succesfully Task!");

        localStorage.setItem("tasks", JSON.stringify(updatedData));
        props.bindList(updatedData);
        props.onHide();
      } else {
        let TaskInfo = "";
        if (TaskData !== null) {
          TaskInfo = [...TaskData, body];

          localStorage.setItem("tasks", JSON.stringify(TaskInfo));
        } else {
          TaskInfo = [body];
          localStorage.setItem("tasks", JSON.stringify(TaskInfo));
        }
        toast.success("Created Succesfully Task!");
        props.bindList(TaskInfo);
        props.onHide();

        // fetch(`http://localhost:3005/taskList`, {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   mode: "cors",
        //   body: JSON.stringify(body),
        // }).then((res) => {
        //   toast.success("Task Added Succesfully!");
        //   props.bindList();
        //   props.onHide();
        // });
      }
    } else {
      // toast.error("Something went Wrong !!!");
    }
  };

  return (
    <>
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        size="ml"
        centered
        className="popupForm rightsideModal"
      >
        <Form
          className="from"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <Modal.Header closeButton>
            {props.TaskData !== undefined &&
            props.TaskData !== null &&
            props.TaskData !== "" ? (
              <h4>Edit Task Details</h4>
            ) : (
              <h4>Add New Task</h4>
            )}
          </Modal.Header>
          <Modal.Body className="">
            <Form.Control
              type="hidden"
              value={input.id}
              placeholder="Enter email"
            />
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={input.title}
                onChange={(e) =>
                  setInput({
                    ...input,
                    ["title"]: e.target.value,
                  })
                }
                placeholder="Enter title"
                isInvalid={input.errors.title}
              />
              {input.errors.title && (
                <Form.Control.Feedback type="invalid">
                  {input.errors.title}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Details</Form.Label>
              <Form.Control
                type="text"
                value={input.details}
                onChange={(e) =>
                  setInput({
                    ...input,
                    ["details"]: e.target.value,
                  })
                }
                placeholder="Enter details"
                isInvalid={input.errors.details}
              />
              {input.errors.details && (
                <Form.Control.Feedback type="invalid">
                  {input.errors.details}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Priority</Form.Label>
              <Select
                // isSearchable={false}
                onChange={handlePriority}
                options={PriorityList}
                value={PriorityList.find(function (option) {
                  return option.value === SelectedPriority;
                })}
                classNamePrefix="select"
                placeholder="User Priority..."
                className="react-select is-invalid"
                styles={{
                  menu: (base) => ({
                    color: "#333",
                    ...base,
                  }),
                }}
              />
              {UserRoleValidation ? (
                <div className="invalid-feedback">Please select Priority</div>
              ) : (
                <></>
              )}
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button type="submit" variant="btn btn-dark smtpbtn px-4">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AddNewTaskModal;
