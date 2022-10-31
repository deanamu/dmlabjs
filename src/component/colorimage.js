import React from 'react'
function Colorimage(props) {
    //props.rgb
    //props.image
    console.log(props.element.rgb);
    console.log(props.element.image);
    return (
        <>
          <div>
             <div style={{ display: "flex", flexDirection: "column" }}>
               {props.element.rgb.map((item,i) => {
                 return (
                   <div style={{ display: "flex" }}>
                     {item.map((rgb) => {
                       return (
                         <div
                           style={{
                             width: "20px",
                             height: "20px",
                             backgroundColor: `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`,
                           }}
                         ></div>
                       );
                     })}
                    
                    <img width={100} height={100} src={props.element.image[i]} />;
                   </div>
                 );
               })}
             </div>
             
          </div>
        </>
    );
  }

  export default Colorimage