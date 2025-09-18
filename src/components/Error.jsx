import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";

function Error() {
  const err = useRouteError();
  const navigate = useNavigate();
  console.log(err);
  function backtoHome() {
    navigate("/");
  }
  return (
    <div>
      <h2>Error Page </h2>
      <h3>Something Went wrong!!</h3>
      <p>
        {err.status}: {err.statusText}
      </p>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        GO Home
      </button>
    </div>
  );
}

export default Error;
