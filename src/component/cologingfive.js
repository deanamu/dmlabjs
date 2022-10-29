import React from "react";
function Coloringfive(props) {
  //props.rgb
  //props.image
  console.log(props.element.rgb);
  return (
    <div>
      <div>{props.element.rgb}</div>
      <div>{props.element.rgb}</div>
      <div>{props.element.rgb}</div>
      <div>{props.element.rgb}</div>
      <div>{props.element.rgb}</div>
      <div>{props.element.rgb}</div>
    </div>
  );
}

export default Coloringfive;
