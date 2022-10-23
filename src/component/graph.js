import React from "react";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { createRef, useEffect, useState, useRef } from "react";
import ForceGraph3D from "3d-force-graph";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/Icon";
import InputAdornment from "@mui/material/InputAdornment";
import { Swiper, SwiperSlide } from "swiper/react";
import SwipeableBottomSheet from "react-swipeable-bottom-sheet";
import { SearchOutlined } from "@mui/icons-material";
//import data from "./data";
import { useSwipeable } from "react-swipeable";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import styled, { keyframes } from "styled-components";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
//import * as d3 from "d3";
//import IconButton from '@mui/material/Icon/s';
import "../assets/styles/graph.css";
import SideBar from "./sidebar";
// import SpriteText from "three-spritetext";
// import * as THREE from '../utils/css2D';
// import * as THREE from '//cdn.rawgit.com/mrdoob/three.js/master/examples/jsm/renderers/CSS2DRenderer.js';
// import * as THREE from '../utils/three';
import axios from "axios";
import * as THREE from "three";
import SpriteText from "three-spritetext";
import { useParams } from "react-router-dom";
import { Navigation } from "swiper";
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ColorSpan = styled.span`
  height: 40px;
  flex-direction: column;
`;
const swipeOpenMenuStyles = {
  float: "left",
  position: "fixed",
  width: "33%",
  height: "100%",
  border: "2px dashed gray",
};
export const Graph = (props) => {
  const [open, setOpen] = React.useState(false);
  const [colors, setcolors] = useState([""]);
  const [image, setImage] = useState("");
  const [base64, setBase64] = useState();
  const [img, setImg] = useState();
  const { onSearch, match } = props;
  const ref = createRef();
  //const [isOpen, setOpen] = React.useState(false);
  var gData = {
    nodes: [],
    links: [],
  };
  const { search } = useParams();
  console.log(search);
  var nodedic = {};
  const handlers = useSwipeable({
    //trackMouse: true,
    onSwipedRight: () => setOpen(true),
  });
  const containerRef = useRef(null);
  // const response = await axios.get(
  //   "http://localhost:5000/word/similarity/dream/10/10"
  //   //"http://localhost:5555/most_similar_word/"
  // );
  function rgb(values) {
    return "rgb(" + values.join(", ") + ")";
  }
  async function dynamicColorinfo() {
   
    const colorsrgb = await axios.get(
      `http://localhost:5000/color/harmony/dream/10/10`
    );
   
    var j = 0;
    
    for (let i = 0; i < Object.keys(colorsrgb.data).length; i++) {
      console.log(colorsrgb.data[i]);
      for (let ji = 0; ji < colorsrgb.data[i].length; ji++) {
        colors.push(rgb(colorsrgb.data[i][ji]));
      }
    }
   
    // .onNodeRightClick((node) => {
    //   console.log(node);
    // });
  }
  async function dynamicImportModule() {
    const response = await axios.get(
      `http://localhost:5000/word/similarity/dream/10/10`
      //`http://localhost:5000/word/similarity/${searchtext}/10/10`
      //"http://localhost:5555/most_similar_word/"
    );
    // const colorsrgb = await axios.get(
    //   `http://localhost:5000/color/harmony/dream/10/10`
    // );
    // const imagedata = await axios.get(
    //   //`http://localhost:5000/color/harmony/${search}/10/10`
    //   `http://localhost:5000//image/dream/1`
    // ).then((res) => {
    //   const base64 = btoa(
    //     new Uint8Array(res.data).reduce(
    //       (data, byte) => data + String.fromCharCode(byte),
    //       ""
    //     )
    //   );
    //   setImage(base64);
    // });
    // const resonse = await axios
    // .get(
    //   `http://localhost:5000/image/dream/1`,
    //   {
    //     responseType: "arraybuffer",
    //   }
    // )
    // .then((response) =>
    //   setBase64(Buffer.from(response.data, "binary").toString("base64"))
    // );
    // const getImage = (i) => {
    //   axios
    //     .get(`http://localhost:5000/${search}/${i}`, {
    //       responseType: "arraybuffer",
    //     })
    //     .then((res) => {
    //       const base64 = btoa(
    //         new Uint8Array(res.data).reduce(
    //           (data, byte) => data + String.fromCharCode(byte),
    //           ""
    //         )
    //       );
    //       setImage(base64);
    //     });
    // };
    var j = 0;
    //console.log(imagedata);
    //console.log(imagedata.data);
    //console.log(typeof imagedata.data);
    //console.log(colorsrgb.data);
    console.log(response.data);
    //console.log(resonse.data);
    for (var t of response.data) {
      //node를 만들기 위해서 for문
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
    // for (let i = 0; i < Object.keys(colorsrgb.data).length; i++) {
    //   console.log(colorsrgb.data[i]);
    //   for (let ji = 0; ji < colorsrgb.data[i].length; ji++) {
    //     //console.log(colorsrgb.data[i][ji]);
    //     //setcolors(colorsrgb.data[i][ji]);
    //     //colors.push(rgb(colorsrgb.data[i][ji]));
    //     colors.push(rgb(colorsrgb.data[i][ji]));
    //   }
    // }
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
      /**
       * 4、Link styling
       */
      /* 边标签文字 */
      .linkThreeObjectExtend(true)
      // .linkThreeObject((link) => {
      //   const sprite = new SpriteText(`value：${link.value}`);
      //   sprite.color = "lightgrey";
      //   sprite.textHeight = 1.5;
      //   return sprite;
      // })
      // .linkPositionUpdate((sprite, { start, end }) => {
      //   const middlePos = Object.assign(
      //     ...["x", "y", "z"].map((c) => ({
      //       [c]: start[c] + (end[c] - start[c]) / 2, // calc middle point
      //     }))
      //   );
      //   Object.assign(sprite.position, middlePos);
      // })
      .onNodeClick((node) => {
        // Aim at node from outside it
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
      });
    // .onNodeRightClick((node) => {
    //   console.log(node);
    // });
    Graph.onEngineStop(() => Graph.zoomToFit(400));
    const bloomPass = new UnrealBloomPass();
    bloomPass.strength = 1;
    bloomPass.radius = 1;
    bloomPass.threshold = 0.1;
    Graph.postProcessingComposer().addPass(bloomPass);
  }
  const imageUrl = `http://localhost:5000/image/dream/1`;
  const fetchImage = async () => {
    const res = await fetch(imageUrl);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setImg(imageObjectURL);
    console.log(typeof(img));
  };
  useEffect(() => {
    // axios
    //   .get(
    //     `http://localhost:5000/image/dream/1`,
    //     {
    //       responseType: "arraybuffer",
    //     }
    //   )
    //   .then((response) =>
    //     setBase64(Buffer.from(response.data, "binary").toString("base64"))
    //   );

    // if (typeof window !== "undefined") {
    //   dynamicImportModule();
    // }
    fetchImage();
    dynamicImportModule();
    dynamicColorinfo();
  }, []);

  return (
    <>
      <Container>
        <div style={{ width: "100vw", height: "100vh" }} ref={containerRef} />
      </Container>
      <SwipeableBottomSheet
        open={open}
        onChange={() => setOpen((prev) => !prev)}
      >
        <div style={{ height: "710px" }}>
          <button onClick={() => setOpen((prev) => !prev)}>close</button>
          <div>
            <span style={{ background: `${colors[0]}` }}>1</span>
            <span style={{ background: `${colors[1]}` }}>2</span>
            <span style={{ background: `${colors[2]}` }}>3</span>
            <span style={{ background: `${colors[3]}` }}>4</span>
            <span style={{ background: `${colors[4]}` }}>5</span>
            <span style={{ background: `${colors[5]}` }}>6</span>
            <span style={{ background: `${colors[6]}` }}>7</span>
            <span style={{ background: `${colors[7]}` }}>8</span>
            <span style={{ background: `${colors[8]}` }}>9</span>
            <span style={{ background: `${colors[9]}` }}>10</span>
          </div>
          <div>
            <span style={{ background: `${colors[10]}` }}>1</span>
            <span style={{ background: `${colors[11]}` }}>2</span>
            <span style={{ background: `${colors[12]}` }}>3</span>
            <span style={{ background: `${colors[13]}` }}>4</span>
            <span style={{ background: `${colors[14]}` }}>5</span>
            <span style={{ background: `${colors[15]}` }}>6</span>
            <span style={{ background: `${colors[16]}` }}>7</span>
            <span style={{ background: `${colors[17]}` }}>8</span>
            <span style={{ background: `${colors[18]}` }}>9</span>
            <span style={{ background: `${colors[19]}` }}>10</span>
          </div>
          <div style={{ width: "100%" }}>
            <span style={{ background: `${colors[20]}`, width: "100px" }}>
              1
            </span>
            <span style={{ background: `${colors[21]}` }}>2</span>
            <span style={{ background: `${colors[22]}` }}>3</span>
            <span style={{ background: `${colors[23]}` }}>4</span>
            <span style={{ background: `${colors[24]}` }}>5</span>
            <span style={{ background: `${colors[25]}` }}>6</span>
            <span style={{ background: `${colors[26]}` }}>7</span>
            <span style={{ background: `${colors[27]}` }}>8</span>
            <span style={{ background: `${colors[28]}` }}>9</span>
            <span style={{ background: `${colors[29]}` }}>10</span>
          </div>
          <div>
            <span style={{ background: `${colors[30]}` }}>1</span>
            <span style={{ background: `${colors[31]}` }}>2</span>
            <span style={{ background: `${colors[32]}` }}>3</span>
            <span style={{ background: `${colors[33]}` }}>4</span>
            <span style={{ background: `${colors[34]}` }}>5</span>
            <span style={{ background: `${colors[35]}` }}>6</span>
            <span style={{ background: `${colors[36]}` }}>7</span>
            <span style={{ background: `${colors[37]}` }}>8</span>
            <span style={{ background: `${colors[38]}` }}>9</span>
            <span style={{ background: `${colors[39]}` }}>10</span>
          </div>
          <div>
            <span style={{ background: `${colors[40]}` }}>1</span>
            <span style={{ background: `${colors[41]}` }}>2</span>
            <span style={{ background: `${colors[42]}` }}>3</span>
            <span style={{ background: `${colors[43]}` }}>4</span>
            <span style={{ background: `${colors[44]}` }}>5</span>
            <span style={{ background: `${colors[45]}` }}>6</span>
            <span style={{ background: `${colors[46]}` }}>7</span>
            <span style={{ background: `${colors[47]}` }}>8</span>
            <span style={{ background: `${colors[48]}` }}>9</span>
            <span style={{ background: `${colors[49]}` }}>10</span>
          </div>
        </div>
        <div>
          <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
            <SwiperSlide>
              <img width={100} height={100} src={img} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={`data:image/jpeg;charset=utf-8;base64,${base64}`} />
            </SwiperSlide>
            <SwiperSlide>
            <img src={`data:image/jpeg;charset=utf-8;base64,${base64}`} />
              </SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide>
          </Swiper>
        </div>
      </SwipeableBottomSheet>
    </>
    // <div className="result">
    //   <div {...handlers} style={swipeOpenMenuStyles} />
    //   <SideBar
    //     isOpen={isOpen}
    //     onStateChange={(s) => setOpen(s.isOpen)}
    //     pageWrapId={"page-wrap"}
    //     outerContainerId={"App"}
    //   />
    // </div>
    // <div className="result">
    // </div>
  );
};

export default Graph;
