import React from "react";
import MDEditor from "@uiw/react-md-editor";

const MarkDownEditor = ({ value, setValue }) => {
  return (
    <div className="container">
      <MDEditor height={"550px"} value={value} onChange={setValue} />
    </div>
  );
};

export default MarkDownEditor;
