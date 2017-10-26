import React from "react";

export const Select = props =>
  <select {...props} className="form-group">
    {props.children}
  </select>;