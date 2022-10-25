import React from "react";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { createRef, useEffect, useState, useRef } from "react";
import ForceGraph3D from "3d-force-graph";
import { Swiper, SwiperSlide } from "swiper/react";
import SwipeableBottomSheet from "react-swipeable-bottom-sheet";
import { SearchOutlined } from "@mui/icons-material";
//import data from "./data";
import { useSwipeable } from "react-swipeable";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import styled from "styled-components";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "../assets/styles/graph.css";
import SideBar from "./sidebar";
// import SpriteText from "three-spritetext";
// import * as THREE from '../utils/css2D';
// import * as THREE from '//cdn.rawgit.com/mrdoob/three.js/master/examples/jsm/renderers/CSS2DRenderer.js';
// import * as THREE from '../utils/three';
import axios from "axios";
import SpriteText from "three-spritetext";
import { useParams } from "react-router-dom";
import { Navigation } from "swiper";
import Sidebar from "./sidebar";
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
  const [colors, setcolors] = useState([
    [111, 222, 212],
    [100, 150, 200],
    [100, 120, 200],
    [100, 140, 200],
  ]);
  const [image, setImage] = useState([""]);
  const [rgbs, setRgbs] = useState([
    [111, 222, 212],
    [100, 150, 200],
    [100, 120, 200],
    [100, 140, 200],
  ]);
  const [base64, setBase64] = useState();
  const [img, setImg] = useState();
  const { onSearch, match } = props;
  const ref = createRef();
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
  const handlers = useSwipeable({
    //trackMouse: true,
    onSwipedRight: () => setOpen(true),
  });
  const containerRef = useRef(null);
  async function dynamicColorinfo(word) {
    //setcolors([""]);
    const colorsrgb = await axios.get(
      `http://localhost:5000/color/harmony/${word.name}/10/10`
    );

    const colorsarray = Object.values(colorsrgb.data);
    setcolors(colorsarray);
    //console.log(colorsrgb.data);
    // .onNodeRightClick((node) => {
    //   console.log(node);
    // });
  }
  async function dynamicImportModule() {
    const response = await axios.get(
      `http://localhost:5000/word/similarity/${search}/${a}/${b}`
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
        let restimage = [];
        fetchImage(node);
        setImage(restimage);
      });

    Graph.onEngineStop(() => Graph.zoomToFit(400));
    const bloomPass = new UnrealBloomPass();
    bloomPass.strength = 1;
    bloomPass.radius = 1;
    bloomPass.threshold = 0.1;
    Graph.postProcessingComposer().addPass(bloomPass);
  }
  const fetchImage = async (word) => {
    let restimage = [];
    for (let i = 1; i <= 10; i++) {
      const imageUrl = `http://localhost:5000/image/${word.name}/${i}`;
      const res = await fetch(imageUrl);
      const imageBlob = await res.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      restimage.push(imageObjectURL);
    }
    setImage(restimage);
  };
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
            <button onClick={() => setOpen((prev) => !prev)}>close</button>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {colors.map((item) => {
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
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
            >
              <SwiperSlide>
                <img width={100} height={100} src={image[0]} />
              </SwiperSlide>
              <SwiperSlide>
                <img width={100} height={100} src={image[1]} />
              </SwiperSlide>
              <SwiperSlide>
                <img width={100} height={100} src={image[2]} />
              </SwiperSlide>
              <SwiperSlide>
                <img width={100} height={100} src={image[3]} />
              </SwiperSlide>
              <SwiperSlide>
                <img width={100} height={100} src={image[4]} />
              </SwiperSlide>
              <SwiperSlide>
                <img width={100} height={100} src={image[5]} />
              </SwiperSlide>
              <SwiperSlide>
                <img width={100} height={100} src={image[6]} />
              </SwiperSlide>
              <SwiperSlide>
                <img width={100} height={100} src={image[7]} />
              </SwiperSlide>
              <SwiperSlide>
                <img width={100} height={100} src={image[8]} />
              </SwiperSlide>
              <SwiperSlide>
                <img width={100} height={100} src={image[9]} />
              </SwiperSlide>
            </Swiper>
          </div>
        </SwipeableBottomSheet>
      </div>
    </>
  );
};

export default Graph;
