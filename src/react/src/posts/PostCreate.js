import React from "react";

function PostCreate() {
  return (
    <form className="col-6 mx-auto my-3 text-left">
      <div className="form-group">
        <div className="mb-3">
          <label className="form-label" htmlFor="title">
            Post Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            placeholder="Post Title"
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="publish">
            Publish date
          </label>
          <input
            type="text"
            id="publish"
            name="publish"
            className="form-control"
            placeholder="Publish date"
          />
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="draft"
          />
          <label className="form-check-label" htmlFor="draft">
            Draft
          </label>
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="content">
            Post Content
          </label>
          <textarea
            type="text"
            id="content"
            name="content"
            className="form-control"
            placeholder="Post Content"
            rows="8"
          />
        </div>
      </div>
    </form>
  );
}

export default PostCreate;
