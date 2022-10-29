// import React from "react";
// import Slider, { SliderThumb } from "@mui/material/Slider";
// import { createRef, useEffect, useState, useRef } from "react";
// import ForceGraph3D from "3d-force-graph";
// import { Swiper, SwiperSlide } from "swiper/react";
// import SwipeableBottomSheet from "react-swipeable-bottom-sheet";
// import { SearchOutlined } from "@mui/icons-material";
// //import data from "./data";
// import { useSwipeable } from "react-swipeable";
// import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
// import styled from "styled-components";
// import Colorimage from "./colorimage";
// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/navigation";
// import "../assets/styles/graph.css";
// import SideBar from "./sidebar";
// // import SpriteText from "three-spritetext";
// // import * as THREE from '../utils/css2D';
// // import * as THREE from '//cdn.rawgit.com/mrdoob/three.js/master/examples/jsm/renderers/CSS2DRenderer.js';
// // import * as THREE from '../utils/three';
// import axios from "axios";
// import SpriteText from "three-spritetext";
// import { useParams } from "react-router-dom";
// import { Navigation } from "swiper";
// import Sidebar from "./sidebar";
// import { type } from "@testing-library/user-event/dist/type";
// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const ColorSpan = styled.span`
//   height: 40px;
//   flex-direction: column;
// `;

// const CButton = styled.button`
//   position: relative;
//   top: 28px;
//   left: 650px;
// `;

// const swipeOpenMenuStyles = {
//   float: "left",
//   position: "fixed",
//   width: "33%",
//   height: "100%",
//   border: "2px dashed gray",
// };
// export const Graph = (props) => {
//   const [open, setOpen] = React.useState(false);
//   const [colors, setcolors] = useState([
//     [111, 222, 212],
//     [100, 150, 200],
//     [100, 120, 200],
//     [100, 140, 200],
//     [100, 140, 200],
//   ]);
//   const [image, setImage] = useState([""]);
//   const [rgbs, setRgbs] = useState([
//     [111, 222, 212],
//     [100, 150, 200],
//     [100, 120, 200],
//     [100, 140, 200],
//   ]);
//   const [base64, setBase64] = useState();
//   const [img, setImg] = useState();
//   const [messageObj, setMessage] = useState({
//     rgb: [
//       [111, 222, 212],
//       [100, 150, 200],
//       [100, 120, 200],
//       [100, 140, 200],
//       [100, 140, 200],
//     ],
//     image: [""],
//   });
//   const { onSearch, match } = props;
//   const ref = createRef();
//   //const [isOpen, setOpen] = React.useState(false);
//   var gData = {
//     nodes: [],
//     links: [],
//   };
//   const { search, a, b } = useParams();
//   console.log(search);
//   console.log(a);
//   console.log(b);
//   var nodedic = {};
//   const handlers = useSwipeable({
//     //trackMouse: true,
//     onSwipedRight: () => setOpen(true),
//   });
//   const containerRef = useRef(null);
//   async function dynamicColorinfo(word) {
//     //setcolors([""]);
//     const colorsrgb = await axios.get(
//       `http://localhost:5000/color/harmony/${word.name}/10/10`
//     );
//     let restimage = [];
//     for (let i = 1; i <= 10; i++) {
//       const imageUrl = `http://localhost:5000/image/${word.name}/${i}`;
//       const res = await fetch(imageUrl);
//       const imageBlob = await res.blob();
//       const imageObjectURL = URL.createObjectURL(imageBlob);
//       restimage.push(imageObjectURL);
//     }
//     const colorsarray = Object.values(colorsrgb.data);
//     console.log("--------------");
//     console.log(colorsarray);
//     console.log(typeof colorsarray);
//     console.log("--------------");
//     setMessage({
//       rgb: colorsarray,
//       image: restimage,
//     });
//     //setMessage((rgbs = colorsarray), (image = restimage));
//     //console.log(colorsrgb.data);
//     // .onNodeRightClick((node) => {
//     //   console.log(node);
//     // });
//   }
//   async function dynamicImportModule() {
//     const response = await axios.get(
//       `http://localhost:5000/word/similarity/${search}/${a}/${b}`
//     );

//     var j = 0;
//     console.log(response.data);
//     for (var t of response.data) {
//       for (var t2 of t.result) {
//         if (!(Object.values(nodedic).indexOf(t2.keyword) > -1)) {
//           gData.nodes.push({
//             id: t2.keyword,
//             name: t2.keyword,
//             x: t2.coordinate[0],
//             y: t2.coordinate[1],
//             z: t2.coordinate[2],
//           });
//           nodedic[t2.keyword] = t2.keyword;
//           j++;
//         }
//       }
//     }
//     for (var t of response.data) {
//       for (var t2 of t.result) {
//         gData.links.push({ source: t.keyword, target: t2.keyword });
//       }
//     }
//     const Graph = ForceGraph3D({ controlType: "orbit" })(containerRef.current)
//       .graphData(gData)
//       //.graphData(data)
//       .numDimensions(3)
//       .backgroundColor("#000")
//       .showNavInfo(true)
//       .nodeAutoColorBy("group")
//       .nodeLabel("id")
//       .onNodeDragEnd((node) => {
//         node.fx = node.x;
//         node.fy = node.y;
//         node.fz = node.z;
//       })
//       .nodeThreeObject((node) => {
//         const sprite = new SpriteText(node.id);
//         sprite.material.depthWrite = false;
//         sprite.color = node.color;
//         sprite.textHeight = 8;
//         return sprite;
//       })

//       .linkThreeObjectExtend(true)

//       .onNodeClick((node) => {
//         const distance = 40;
//         const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
//         Graph.cameraPosition(
//           {
//             x: node.x * distRatio,
//             y: node.y * distRatio,
//             z: node.z * distRatio,
//           },
//           node,
//           3000
//         );
//         setOpen((prev) => !prev);
//         //setMessage(rgb:node,image:node)
//         dynamicColorinfo(node);
//         fetchImage(node);
//         //let restimage = [];
//         //setImage(restimage);
//       });

//     Graph.onEngineStop(() => Graph.zoomToFit(400));
//     const bloomPass = new UnrealBloomPass();
//     bloomPass.strength = 1;
//     bloomPass.radius = 1;
//     bloomPass.threshold = 0.1;
//     Graph.postProcessingComposer().addPass(bloomPass);
//   }
//   const fetchImage = async (word) => {
//     let restimage = [];
//     for (let i = 1; i <= 10; i++) {
//       const imageUrl = `http://localhost:5000/image/${word.name}/${i}`;
//       const res = await fetch(imageUrl);
//       const imageBlob = await res.blob();
//       const imageObjectURL = URL.createObjectURL(imageBlob);
//       restimage.push(imageObjectURL);
//     }
//     setImage(restimage);
//   };
//   useEffect(() => {
//     dynamicImportModule();
//   }, [search, a, b]);
//   useEffect(() => {
//     console.log(messageObj);
//   }, [messageObj]);
//   return (
//     <>
//       <div>
//         <SideBar
//           pageWrapId={"page-wrap"}
//           outerContainerId={"App"}
//           onSearch={search}
//         />
//         <Container>
//           <div style={{ width: "100vw", height: "100vh" }} ref={containerRef} />
//         </Container>
//         <SwipeableBottomSheet
//           open={open}
//           onChange={() => setOpen((prev) => !prev)}
//         >
//           <div style={{ height: "710px" }}>
//             {/* <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="512"
//               height="512"
//               viewBox="0 0 512 512"
//             >
//               <title>ionicons-v5-m</title>
//               <path d="M256,48C141.31,48,48,141.31,48,256s93.31,208,208,208,208-93.31,208-208S370.69,48,256,48Zm86.63,272L320,342.63l-64-64-64,64L169.37,320l64-64-64-64L192,169.37l64,64,64-64L342.63,192l-64,64Z" />
//             </svg> */}
//             <CButton onClick={() => setOpen((prev) => !prev)}>
//               <svg
//                 viewPort="0 0 12 12"
//                 version="1.1"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <line
//                   x1="1"
//                   y1="11"
//                   x2="11"
//                   y2="1"
//                   stroke="black"
//                   stroke-width="2"
//                 />
//                 <line
//                   x1="1"
//                   y1="1"
//                   x2="11"
//                   y2="11"
//                   stroke="black"
//                   stroke-width="2"
//                 />
//               </svg>
//             </CButton>
//             <div style={{ display: "flex", flexDirection: "column" }}>
//               <Colorimage element={messageObj} />
//             </div>
//           </div>
//           {/* <div
//             style={{
//               width: "200px",
//               height: "200px",
//               backgroundColor: `rgb(${messageObj.rgb[0][1][0]},${messageObj.rgb[0][1][1]},${messageObj.rgb[0][1][2]})`,
//             }}
//           ></div> */}
//         </SwipeableBottomSheet>
//       </div>
//     </>
//   );
// };

// export default Graph;