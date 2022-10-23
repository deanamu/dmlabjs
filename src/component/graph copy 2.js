// //돌아가는것
// import React from "react";
// import Slider, { SliderThumb } from "@mui/material/Slider";
// import { createRef, useEffect, useState } from "react";
// import Typography from "@mui/material/Typography";
// import TextField from "@mui/material/TextField";
// import Tooltip from "@mui/material/Tooltip";
// import IconButton from "@mui/material/Icon";
// import InputAdornment from "@mui/material/InputAdornment";
// import { SearchOutlined } from "@mui/icons-material";
// import { useSwipeable } from "react-swipeable";
// //import IconButton from '@mui/material/Icon/s';
// import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
// import "../assets/styles/graph.css";
// import SideBar from "./sidebar";
// import styled, { keyframes } from "styled-components";
// import SwipeableBottomSheet from "react-swipeable-bottom-sheet";
// // import SpriteText from "three-spritetext";
// // import * as THREE from '../utils/css2D';
// // import * as THREE from '//cdn.rawgit.com/mrdoob/three.js/master/examples/jsm/renderers/CSS2DRenderer.js';
// // import * as THREE from '../utils/three';
// import axios from "axios";
// import * as THREE from "three";
// import SpriteText from "three-spritetext";
// const swipeOpenMenuStyles = {
//   float: "left",
//   position: "fixed",
//   width: "33%",
//   height: "100%",
//   border: "2px dashed gray",
// };

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
// `;
// function rgb(values) {
//   return "rgb(" + values.join(", ") + ")";
// }

// export const Graph = (props) => {
//   const { onSearch } = props;
//   const [open, setOpen] = React.useState(false);
//   const [colors, setcolors] = useState([""]);
//   const [names, setNames] = useState([""]);
//   const [images, setimage] = useState([""]);
//   const ref = createRef();
//   //const [isOpen, setOpen] = React.useState(false);

//   var gData = {
//     nodes: [],
//     links: [],
//   };

//   var nodedic = {};
//   const handlers = useSwipeable({
//     //trackMouse: true,
//     onSwipedRight: () => setOpen(true),
//   });

//   useEffect(() => {
//     async function dynamicImportModule() {
//       const ForceGraph3D = await (await import("3d-force-graph")).default;
//       const myGraph =
//         ForceGraph3D();
//         //   {
//         //   extraRenderers: [new THREE.CSS2DRenderer()]
//         // }

//       const response = await axios.get(
//         "http://localhost:5000/word/similarity/dream/10/10"
//       );
//       const colorsrgb = await axios.get(
//         //`http://localhost:5000/color/harmony/${search}/10/10`
//         `http://localhost:5000/color/harmony/dream/10/10`
//       );
//       const imagedata = await axios.get(
//         //`http://localhost:5000/color/harmony/${search}/10/10`
//         `http://localhost:5000//image/dream/1`,
//         {
//           responseType: "arraybuffer",
//         }
//       );
//     //   .then((response) =>
//     //   setBase64(Buffer.from(response.data, "binary").toString("base64"))
//     // );
//     //     setImage(base64);
     
//       //const imageBuffer = Buffer.from(data);
//       console.log(imagedata);
//       //console.log(response.data);
//       //console.log(colorsrgb.data);
//       //console.log(typeof(colorsrgb.data));
//       //console.log(colorsrgb.data.count);
//       const count = Object.keys(colorsrgb.data).length;
//       console.log(count); //ok

//       console.log(colorsrgb.data[0]); //ok
//       var cl = 0;
//       for (let i = 0; i < Object.keys(colorsrgb.data).length; i++) {
//         console.log(colorsrgb.data[i]);
//         for (let ji = 0; ji < colorsrgb.data[i].length; ji++) {
//           console.log(colorsrgb.data[i][ji]);
//           setcolors(colorsrgb.data[i][ji]);
//           //colors.push(rgb(colorsrgb.data[i][ji]));
//           names.push(rgb(colorsrgb.data[i][ji]));
//         }
//       }
//       console.log("--------");
//       //console.log(colors[5]);
//       //console.log(typeof(colors[5]));
//       console.log("--------");

//       //console.log(rgb(colors[5]));
//       // for(var ac of colorsrgb.data)
//       // {
//       //   console.log(ac);

//       //   // for(var c of ac)
//       //   // {

//       //   // }
//       // }
//       var j = 0;
//       for (var t of response.data) { //node를 만들기 위해서 for문
//         for (var t2 of t.result) {
//           // console.log(t2.keyword)
//           // console.log(t2.similarity)
//           // console.log(t2.coordinate)
//           // console.log(t2.coordinate[0])
//           if (!(Object.values(nodedic).indexOf(t2.keyword) > -1)) {
//             //이미 있는것은 추가 안함
//             gData.nodes.push({
//               id: t2.keyword,
//               name: t2.keyword,
//               x: t2.coordinate[0],
//               y: t2.coordinate[1],
//               z: t2.coordinate[2],
//             });
//             nodedic[t2.keyword] = t2.keyword;
//             j++;
//           }
//         }
//       }

//       for (var t of response.data) { //링크를 만들기 위해서
//         for (var t2 of t.result) {
//           gData.links.push({ source: t.keyword, target: t2.keyword });
//         }
//       }
//       const graph = myGraph(ref.current);

//       graph
//         .graphData(gData)
//         .onNodeClick((node) => {
//           // Aim at node from outside it
//           const distance = 40;
//           const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
//           graph.cameraPosition(
//             {
//               x: node.x * distRatio,
//               y: node.y * distRatio,
//               z: node.z * distRatio,
//             },
//             node,
//             3000
//           );
//           setOpen((prev) => !prev);
//         })
//         .numDimensions(3)
//         .backgroundColor("#000")
//         .showNavInfo(true)
//         .nodeAutoColorBy("group")
//         .nodeLabel("id")
//         .onNodeDragEnd((node) => {
//           node.fx = node.x;
//           node.fy = node.y;
//           node.fz = node.z;
//         })
//         .nodeThreeObject((node) => {
//           const sprite = new SpriteText(node.id);
//           sprite.material.depthWrite = false;
//           sprite.color = node.color;
//           sprite.textHeight = 8;
//           return sprite;
//         })
//         .linkThreeObjectExtend(true)

//         .onNodeRightClick((node) => {
//           console.log(node);
//         });
//       graph.onEngineStop(() => graph.zoomToFit(400));
//       const bloomPass = new UnrealBloomPass();
//       bloomPass.strength = 1;
//       bloomPass.radius = 1;
//       bloomPass.threshold = 0.1;
//       graph.postProcessingComposer().addPass(bloomPass);
//     }
//     dynamicImportModule();
//   }, []);
//   return (
//     <>
//       <div>
//         {/* <div {...handlers} style={swipeOpenMenuStyles} />
//       <SideBar
//       onSearch={onSearch}
//       isOpen={isOpen}
//       onStateChange={s => setOpen(s.isOpen)}
//       pageWrapId={"page-wrap"}
//       outerContainerId={"App"}
//     /> */}
//         <Container>
//         <div style={{ width: "100vw", height: "100vh" }} ref={ref} />
//       </Container>
//         <SwipeableBottomSheet
//           open={open}
//           onChange={() => setOpen((prev) => !prev)}
//         >
//           <div style={{ height: "710px" }}>
//             <button onClick={() => setOpen((prev) => !prev)}>close</button>
//              {/* <div>
//               <span style={{ background: `${names[0]}` }}>1</span>
//               <span style={{ background: `${names[1]}` }}>2</span>
//               <span style={{ background: `${names[2]}` }}>3</span>
//               <span style={{ background: `${names[3]}` }}>4</span>
//               <span style={{ background: `${names[4]}` }}>5</span>
//               <span style={{ background: `${names[5]}` }}>6</span>
//               <span style={{ background: `${names[6]}` }}>7</span>
//               <span style={{ background: `${names[7]}` }}>8</span>
//             </div>
//             <div>
//               <span style={{ background: `${names[8]}` }}>1</span>
//               <span style={{ background: `${names[9]}` }}>2</span>
//               <span style={{ background: `${names[10]}` }}>3</span>
//               <span style={{ background: `${names[11]}` }}>4</span>
//               <span style={{ background: `${names[12]}` }}>5</span>
//               <span style={{ background: `${names[13]}` }}>6</span>
//               <span style={{ background: `${names[14]}` }}>7</span>
//               <span style={{ background: `${names[15]}` }}>8</span>
//             </div>
//            <div>
//               <span style={{ background: `${names[16]}` }}>1</span>
//               <span style={{ background: `${names[17]}` }}>2</span>
//               <span style={{ background: `${names[18]}` }}>3</span>
//               <span style={{ background: `${names[19]}` }}>4</span>
//               <span style={{ background: `${names[20]}` }}>5</span>
//               <span style={{ background: `${names[21]}` }}>6</span>
//               <span style={{ background: `${names[22]}` }}>7</span>
//               <span style={{ background: `${names[23]}` }}>8</span>
//             </div>
//              <div>
//               <span style={{ background: `${names[24]}` }}>1</span>
//               <span style={{ background: `${names[25]}` }}>2</span>
//               <span style={{ background: `${names[26]}` }}>3</span>
//               <span style={{ background: `${names[27]}` }}>4</span>
//               <span style={{ background: `${names[28]}` }}>5</span>
//               <span style={{ background: `${names[29]}` }}>6</span>
//               <span style={{ background: `${names[30]}` }}>7</span>
//               <span style={{ background: `${names[31]}` }}>8</span>
//             </div> 
//              <div>
//               <span style={{ background: `${names[32]}` }}>1</span>
//               <span style={{ background: `${names[33]}` }}>2</span>
//               <span style={{ background: `${names[34]}` }}>3</span>
//               <span style={{ background: `${names[35]}` }}>4</span>
//               <span style={{ background: `${names[36]}` }}>5</span>
//               <span style={{ background: `${names[37]}` }}>6</span>
//               <span style={{ background: `${names[38]}` }}>7</span>
//               <span style={{ background: `${names[39]}` }}>8</span>
//             </div>
//             <div>
//               <span style={{ background: `${names[40]}` }}>1</span>
//               <span style={{ background: `${names[41]}` }}>2</span>
//               <span style={{ background: `${names[42]}` }}>3</span>
//               <span style={{ background: `${names[43]}` }}>4</span>
//               <span style={{ background: `${names[44]}` }}>5</span>
//               <span style={{ background: `${names[45]}` }}>6</span>
//               <span style={{ background: `${names[46]}` }}>7</span>
//               <span style={{ background: `${names[47]}` }}>8</span>
//             </div> */}
//             <div>
//               <tr>
//                 <span style={{ background: `${names[48]}` }}>1</span>
//                 <td style={{ background: `${names[49]}` }}>2</td>
//                 <td style={{ background: `${names[50]}` }}>3</td>
//                 <td style={{ background: `${names[51]}` }}>4</td>
//                 <td style={{ background: `${names[52]}` }}>5</td>
//                 <td style={{ background: `rgb(229, 0, 13)` }}>6</td>
//               </tr>
//             </div> 
//             <div>
//               <td>1</td>
//               <td>2</td>
//               <td>3</td>
//               <td>4</td>
//               <td>5</td>
//               <td>6</td>
//               <td>7</td>
//               <td>8</td>
//             </div>
//           </div>
//         </SwipeableBottomSheet>
//       </div>
//     </>
//   );
// };

// export default Graph;
