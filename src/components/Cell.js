import React from "react";

const Cell = ({ value, onClick }) => {
  return (
    <button className="cell" onClick={onClick} data-value={value}></button>
  );
};

export default Cell;
// the on click event handler is set to the onclick prop , so when the button is clicked , the onclick function is passed from the parent component is called .
// the data value attribute is set to the value prop which represents the value cell x , o, null. this allows the value to be accessed in the DOM for styling or others porpuses.
