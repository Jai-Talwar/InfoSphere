import React from "react";
const Newsitem = (props) => {
  let { title, description, imageUrl, newsUrl, author, time, source } = props;

  return (
    <div>
      <div className="card">
        <img src={imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <span
            class="position-absolute top-0  translate-middle badge rounded-pill bg-danger"
            style={{ zIndex: 1, left: "89%" }}
          >
            {source}
          </span>
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <a
            href={newsUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-dark"
          >
            Read Full Article
          </a>
          <p class="card-text mt-2">
            <small class="text-body-secondary">
              By {author ? author : "unknown"} on {new Date(time).toGMTString()}
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Newsitem;
