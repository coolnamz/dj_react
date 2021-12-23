import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PostCreate() {
  let navigate = useNavigate();
  const initialData = {
    title: null,
    content: null,
    draft: false,
    publish: null,
  };
  const initialValid = {
    title: null,
    content: null,
    draft: null,
    publish: null,
  };
  const [inputData, SetInputData] = useState(initialData);
  const [valid, setValid] = useState(initialValid);
  const [valid_feedback, setValidFeedback] = useState(initialValid);

  function createPost(inputData) {
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Token ${localStorage.getItem("token")}`,
    //   },
    // };

    // try {
    //   const response = await axios.post("/api/posts/", inputData, config);
    //   console.log(response.data);
    // } catch (error) {
    //   console.error(error);
    // }

    fetch("/api/posts/", {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        navigate("/posts");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    createPost(inputData);
  }

  function handleInputChange(event) {
    let key = event.target.id;
    let value = event.target.value;

    event.preventDefault();
    SetInputData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  }

  function inputValidator(event, id, validCondition, feedback_word) {
    let key = event.target.id;
    let value = event.target.value;

    if (key === id) {
      if (validCondition(value)) {
        setValid((prevState) => ({
          ...prevState,
          [key]: "is-valid",
        }));
      } else {
        setValid((prevState) => ({
          ...prevState,
          [key]: "is-invalid",
        }));
        setValidFeedback((prevState) => ({
          ...prevState,
          [key]: feedback_word,
        }));
      }
    }
  }

  function validateInput(event) {
    // title validator
    inputValidator(
      event,
      "title",
      (value) => (value.length >= 4 && value.length <= 30 ? true : false),
      "제목은 4글자 이상, 30글자 이하로 입력해 주세요"
    );

    // content validator
    inputValidator(
      event,
      "content",
      (value) => (value.length >= 4 ? true : false),
      "내용은 4글자 이상 입력해 주세요"
    );
  }

  return (
    <form className="col-lg-6 mx-auto my-3 text-left" onSubmit={handleSubmit}>
      <div className="form-group">
        <div className="mb-3">
          <label className="form-label" htmlFor="title">
            제목
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className={`form-control ${valid["title"]}`}
            placeholder="제목을 입력해주세요"
            required="required"
            onChange={handleInputChange}
            onBlur={validateInput}
          />
          <div className="invalid-feedback">{valid_feedback["title"]}</div>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="publish">
            작성일
          </label>
          <input
            type="date"
            id="publish"
            name="publish"
            className="form-control"
            required="required"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="draft"
            onChange={handleInputChange}
          />
          <label className="form-check-label" htmlFor="draft">
            가저장
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="content">
            포스트 내용
          </label>
          <textarea
            type="text"
            id="content"
            name="content"
            className={`form-control ${valid["content"]}`}
            placeholder="내용을 입력해주세요"
            required="required"
            rows="8"
            onChange={handleInputChange}
            onBlur={validateInput}
          />
          <div className="invalid-feedback">{valid_feedback["content"]}</div>
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary col-5 col-lg-3">
            저장
          </button>
          &emsp;
          <button type="button" className="btn btn-warning col-5 col-lg-3">
            취소
          </button>
        </div>
      </div>
    </form>
  );
}

export default PostCreate;
