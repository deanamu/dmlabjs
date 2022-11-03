import React from "react";
import { useEffect, useState, useRef } from "react";
import ForceGraph3D from "3d-force-graph";
import SwipeableBottomSheet from "react-swipeable-bottom-sheet";
//import { useSwipeable } from "react-swipeable";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/navigation";
import "../assets/styles/graph.css";
import SideBar from "./sidebar";
import axios from "axios";
import SpriteText from "three-spritetext";
import { useParams } from "react-router-dom";
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

// const ColorSpan = styled.span`
//   height: 40px;
//   flex-direction: column;
// `;

const CButton = styled.button`
position: absolute;
border:0;
outline:0;
width: 50px;
height: 50px;
color: black;
background: transparent;
top: 0px;
right: 10px;
font-Size: 20px;
`;

// const swipeOpenMenuStyles = {
//   float: "left",
//   position: "fixed",
//   width: "33%",
//   height: "100%",
//   border: "2px dashed gray",
// };
export const Graph = (props) => {
  const [open, setOpen] = React.useState(false);
  const [messageObj, setMessage] = useState({
    rgb: [
      [111, 222, 212],
      [100, 150, 200],
      [100, 120, 200],
      [100, 140, 200],
      [100, 140, 200],
    ],
    image: [""],
  });
  //const { onSearch, match } = props;
  //const ref = createRef();
  //const [isOpen, setOpen] = React.useState(false);
  var gData = {
    nodes: [],
    links: [],
  };
  const { search, a, b } = useParams();
  console.log(search);
  console.log(a);
  console.log(b);
  var nodedic = {};
  // const handlers = useSwipeable({
  //   //trackMouse: true,
  //   onSwipedRight: () => setOpen(true),
  // });
  const containerRef = useRef(null);
  async function dynamicColorinfo(word) {
    //setcolors([""]);
    const colorsrgb = await axios.get(
      `http://dmlab-color.com:5000/color/harmony/${word.name}/10/10`
      //`http://localhost:5000/color/harmony/${word.name}/10/10`
    );
    let restimage = [];
    for (let i = 1; i <= 10; i++) {
      const imageUrl = `http://dmlab-color.com:5000/image/${word.name}/${i}`;
      const res = await fetch(imageUrl);
      const imageBlob = await res.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      restimage.push(imageObjectURL);
    }
    const colorsarray = Object.values(colorsrgb.data);
    // console.log("--------------");
    // console.log(colorsarray);
    // console.log(typeof colorsarray);
    // console.log("--------------");
    setMessage({
      rgb: colorsarray,
      image: restimage,
    });
    //setMessage((rgbs = colorsarray), (image = restimage));
    //console.log(colorsrgb.data);
    // .onNodeRightClick((node) => {
    //   console.log(node);
    // });
  }
  async function dynamicImportModule() {
    const response = await axios.get(
      `http://dmlab-color.com:5000/word/similarity/${search}/${a}/${b}`
    );

    var j = 0;
    console.log(response.data);
    for (var t of response.data) {
      for (var t2 of t.result) {
        if (!(Object.values(nodedic).indexOf(t2.keyword) > -1)) {
          gData.nodes.push({
            id: t2.keyword,
            name: t2.keyword,
            x: t2.coordinate[0],
            y: t2.coordinate[1],
            z: t2.coordinate[2],
          });
          nodedic[t2.keyword] = t2.keyword;
          j++;
        }
      }
    }
    for (var t of response.data) {
      for (var t2 of t.result) {
        gData.links.push({ source: t.keyword, target: t2.keyword });
      }
    }
    const Graph = ForceGraph3D({ controlType: "orbit" })(containerRef.current)
      .graphData(gData)
      //.graphData(data)
      .numDimensions(3)
      .backgroundColor("#000")
      .showNavInfo(true)
      .nodeAutoColorBy("group")
      .nodeLabel("id")
      .onNodeDragEnd((node) => {
        node.fx = node.x;
        node.fy = node.y;
        node.fz = node.z;
      })
      .nodeThreeObject((node) => {
        const sprite = new SpriteText(node.id);
        sprite.material.depthWrite = false;
        sprite.color = node.color;
        sprite.textHeight = 8;
        return sprite;
      })

      .linkThreeObjectExtend(true)

      .onNodeClick((node) => {
        const distance = 40;
        const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
        Graph.cameraPosition(
          {
            x: node.x * distRatio,
            y: node.y * distRatio,
            z: node.z * distRatio,
          },
          node,
          3000
        );
        setOpen((prev) => !prev);
        dynamicColorinfo(node);
      });

    Graph.onEngineStop(() => Graph.zoomToFit(400));
    const bloomPass = new UnrealBloomPass();
    bloomPass.strength = 1;
    bloomPass.radius = 1;
    bloomPass.threshold = 0.1;
    Graph.postProcessingComposer().addPass(bloomPass);
  }
  useEffect(() => {
    dynamicImportModule();
  }, [search, a, b]);
  return (
    <>
      <div>
        <SideBar
          pageWrapId={"page-wrap"}
          outerContainerId={"App"}
          onSearch={search}
        />
        <Container>
          <div style={{ width: "100vw", height: "100vh" }} ref={containerRef} />
        </Container>
        <SwipeableBottomSheet
          open={open}
          onChange={() => setOpen((prev) => !prev)}
        >
          <div style={{ height: "710px" }}>
            <CButton onClick={() => setOpen((prev) => !prev)} >
              X
            </CButton>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {messageObj.rgb.map((item,i) => {
                return (
                  <div style={{ display: "flex", justifyContent: "center", padding:"40px"}}>
                    {item.map((rgb) => {
                      return (
                        <div
                          style={{
                            width: "100px",
                            height: "100px",
                            backgroundColor: `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`,
                          }}
                        ></div>
                      );
                    })}
                    <div style={{
                             width: "120px",
                             height: "20px",
                             backgroundColor: 'transparent',
                           }}></div>
                    <img width={100} height={100} src={messageObj.image[i]} alt={i}/>
                  </div>
                );
              })}
            </div>
          </div>
        </SwipeableBottomSheet>
      </div>
    </>
  );
};

export default Graph;
