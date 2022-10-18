//돌아가는것
import React from "react";
import Slider, { SliderThumb } from '@mui/material/Slider';
import { createRef, useEffect, useState } from "react";
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/Icon';
import InputAdornment from '@mui/material/InputAdornment';
import { SearchOutlined } from '@mui/icons-material';
import { useSwipeable } from "react-swipeable";
//import IconButton from '@mui/material/Icon/s';
import "../assets/styles/graph.css";
import SideBar from "./sidebar";
// import SpriteText from "three-spritetext";
// import * as THREE from '../utils/css2D';
// import * as THREE from '//cdn.rawgit.com/mrdoob/three.js/master/examples/jsm/renderers/CSS2DRenderer.js';
// import * as THREE from '../utils/three';
import axios from 'axios';
import * as THREE from 'three';
import SpriteText from "three-spritetext";
const swipeOpenMenuStyles = {
    float: "left",
    position: "fixed",
    width: "33%",
    height: "100%",
    border: "2px dashed gray"
  };
export const Graph = (props) => {
  const { 
    onSearch 
  } = props;
  const ref = createRef();
  const [isOpen, setOpen] = React.useState(false);
  
  var gData = {
    nodes: [],
    links: []
};

var nodedic={}
  const handlers = useSwipeable({
    //trackMouse: true,
    onSwipedRight: () => setOpen(true)
  });
  useEffect(() => {

    async function dynamicImportModule() {
      
      const ForceGraph3D = await (await import("3d-force-graph")).default;
      const myGraph = ForceGraph3D(
      //   {
      //   extraRenderers: [new THREE.CSS2DRenderer()]
      // }
      );
    
      const response = await axios.get(
        'http://localhost:5000/word/similarity/soft/10/10'
      );
      console.log(response.data);
      var j=0;
      for(var t of response.data) //node를 만들기 위해서 for문
      {
          for(var t2 of t.result)
          {
              console.log(t2.keyword) 
              console.log(t2.similarity) 
              console.log(t2.coordinate) 
              console.log(t2.coordinate[0]) 
              if (!(Object.values(nodedic).indexOf(t2.keyword) > -1)) //이미 있는것은 추가 안함
              {
                  gData.nodes.push({id:t2.keyword, name:t2.keyword,x:t2.coordinate[0],y:t2.coordinate[1],z:t2.coordinate[2]});
                  nodedic[t2.keyword]=t2.keyword;
                  j++;
              }
          }
      }

      for(var t of response.data) //링크를 만들기 위해서
      {
          for(var t2 of t.result)
          {
              gData.links.push({source:t.keyword,target:t2.keyword});
          }
      }
      const graph = myGraph(ref.current);
     

      graph
        .graphData(gData);
    }
    dynamicImportModule();
  }, []);
  return (
    <div className="result">
      <div {...handlers} style={swipeOpenMenuStyles} />
      <SideBar
        onSearch={onSearch}
        isOpen={isOpen}
        onStateChange={s => setOpen(s.isOpen)}
        pageWrapId={"page-wrap"}
        outerContainerId={"App"}
      />
      <div className="graph">
        <div ref={ref}></div>
      </div>
    </div>
  );
};

export default Graph;