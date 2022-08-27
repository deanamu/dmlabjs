import React from "react";
import Slider, { SliderThumb } from '@mui/material/Slider';
import { createRef, useEffect, useState } from "react";
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/Icon';
import InputAdornment from '@mui/material/InputAdornment';
import { SearchOutlined } from '@mui/icons-material';
//import IconButton from '@mui/material/Icon/s';
import "../assets/styles/graph.css";
// import SpriteText from "three-spritetext";
// import * as THREE from '../utils/css2D';
// import * as THREE from '//cdn.rawgit.com/mrdoob/three.js/master/examples/jsm/renderers/CSS2DRenderer.js';
// import * as THREE from '../utils/three';
import * as THREE from 'three';
import SpriteText from "three-spritetext";
function ValueLabelComponent(props) {
    const { children, value } = props;
  
    return (
      <Tooltip enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  }
export const Graph = () => {
  const ref = createRef();
  const [pwidth, setPwidth] = useState(20);
  const [cwidth, setCwidth] = useState(20);
  const [gcwidth, setGcwidth] = useState(20);

  useEffect(() => {
    async function dynamicImportModule() {
      const ForceGraph3D = await (await import("3d-force-graph")).default;
      const myGraph = ForceGraph3D(
      //   {
      //   extraRenderers: [new THREE.CSS2DRenderer()]
      // }
      );
     
      let bodyWidth = document.querySelector("body").clientWidth;
      console.log("bodyWidth ", bodyWidth);
      // let clientHeight = document.querySelector("body").clientHeight;
      // if (bodyWidth < 1000) {
      //   bodyWidth = bodyWidth - 50;
      // } else {
      //   bodyWidth = 1200;
      // }
      // if (clientHeight < 800) {
      //   clientHeight = clientHeight - 300;
      // }

      let nodes = [
        "Values",
        "Freedom",
        "Respect",
        "Equality",
        // "Humans",
        // "Sustainability",
        // "Reconnection",
        "Accessibility",
        // "Relate",
        "Love",
        "Openness",
        "Education",
        "Culture",
        // "Open Source",
        // "Decentralized",
        // "Purposefulness",
        // "Inclusiveness",
        // "Trust",
        "Repatriation",
      ];
      let nodes2 = [
        "People",
        "Scanner",
        "Artist",
        "Sculptor",
        "Designer",
        "Painter",
        "Engineer",
        "Maker",
        "Location",
        "Writer",
        "Author",
        "Storyteller",

        // "Photographer",
        // "Remixer",
        // "Curator",
        // "Animator",
        // "Illustrator",
        // "XR Designer",
      ];
      let allNodes = [
        {
          id: "Test",
          label: "",
          size: 60,
          // size: 20,
        },
        {
          id: "Artefact",
          label: "",
          size: 60,
          // size: 20,
        },
        ...nodes.map((node) => ({
          id: node,
          label: node,
          caption: node,
          type: "roles",
          size: 6,
        })),
        ...nodes2.map((node) => ({
          id: node,
          label: node,
          caption: node,
          check: "values",
          size: 6,
        })),
      ];
      const graph = myGraph(ref.current);
      let rotating;

      graph
        .graphData({
          nodes: allNodes,
          links: [
            {
              target: "Test",
              source: "Artefact",
              distance: 30,
            },
            {
              target: "Values",
              source: "Test",
              distance: 20,
            },
            {
              target: "Freedom",
              source: "Values",
              distance: 20,
            },
            {
              target: "Respect",
              source: "Values",
              distance: 20,
            },
            {
              target: "Repatriation",
              source: "Respect",
              distance: 40,
            },
            {
              target: "Accessibility",
              source: "Values",
              distance: 20,
            },
            {
              target: "Openness",
              source: "Accessibility",
              distance: 30,
            },
            {
              target: "Education",
              source: "Values",
              distance: 20,
            },
            {
              target: "Love",
              source: "Values",
              distance: 20,
            },
            {
              target: "Equality",
              source: "Love",
              distance: 40,
            },
            {
              target: "Culture",
              source: "Love",
              distance: 40,
            },
            {
              target: "People",
              source: "Test",
              distance: 30,
            },
            {
              target: "Scanner",
              source: "People",
              distance: 60,
            },
            {
              target: "Artist",
              source: "People",
              distance: 40,
            },
            {
              target: "Sculptor",
              source: "Artist",
              distance: 50,
            },
            {
              target: "Designer",
              source: "Artist",
              distance: 50,
            },
            {
              target: "Painter",
              source: "Artist",
              distance: 50,
            },
            {
              target: "Engineer",
              source: "People",
              distance: 40,
            },
            {
              target: "Maker",
              source: "Engineer",
              distance: 50,
            },
            {
              target: "Location",
              source: "People",
              distance: 40,
            },
            {
              target: "Writer",
              source: "People",
              distance: 40,
            },
            {
              target: "Writer",
              source: "People",
              distance: 40,
            },
            {
              target: "Author",
              source: "Writer",
              distance: 50,
            },
            {
              target: "Storyteller",
              source: "Writer",
              distance: 50,
            },
            // ...allNodes.map((node, i, arr) => {
            //   return arr.map((n, j) => {
            //     if (
            //       j > i &&
            //       i < arr.length - 1 &&
            //       j < allNodes.length &&
            //       i === 0
            //     ) {
            //       return {
            //         target: allNodes[i],
            //         source: arr[j],
            //         distance: j * 2 + i,
            //       };
            //     }
            //   });
            // }),
            // {
            //   target: "Values",
            //   source: "Artefact",
            //   distance: 20,
            // },
            // {
            //   target: "Freedom",
            //   source: "Values",
            //   distance: 30,
            // },
            // {
            //   target: "Respect",
            //   source: "Values",
            //   distance: 30,
            // },
            // {
            //   target: "Respect",
            //   source: "Repatriation",
            //   distance: 50,
            // },
            // {
            //   target: "Accessibility",
            //   source: "Values",
            //   distance: 30,
            // },
            // {
            //   target: "Openness",
            //   source: "Accessibility",
            //   distance: 50,
            // },
            // {
            //   target: "Education",
            //   source: "Values",
            //   distance: 30,
            // },
            // {
            //   target: "Love",
            //   source: "Values",
            //   distance: 30,
            // },
            // {
            //   target: "Equality",
            //   source: "Love",
            //   distance: 50,
            // },
            // {
            //   target: "Culture",
            //   source: "Love",
            //   distance: 50,
            // },
          ]

            .flatMap((d) => d)
            .filter((d) => d),
        })
        .onNodeHover((node) => {
          if (rotating && node) {
            clearInterval(rotating);
          } else {
            rotate();
          }
          ref.current.style.cursor = node ? "pointer" : null;
          ref.current.style.color = "#000";
        })
        .nodeColor((node) => {
          return node.type === "roles"
            ? "#ff0000"
            : node.id === "Test"
            ? "blue"
            : "#000000";
        })
        .nodeVal("size")
        .linkColor((node) => {
          console.log('node ', node);
          return  node.target === "Test"
            ? "#fff"
            : "#000000";
        })

        .backgroundColor("#f5f5f5")
        // .nodeVisibility(true)
        .nodeLabel(
          (node) =>{
            console.log('node ', node);
           return `<span style="font-weight: bold;color: #000">${node.label}</span>`
          }
        )
        // .nodeThreeObject(node => {
        //   const nodeEl = document.createElement('div');
        //   nodeEl.textContent = node.id;
        //   // nodeEl.style.color = node.color;
        //   nodeEl.className = 'node-label';
        //   return new THREE.CSS2DObject(nodeEl);
        // })
        // .nodeThreeObjectExtend(true)
        .nodeThreeObject(node => {
          const sprite = new SpriteText(node.id);
          sprite.material.depthWrite = false; // make sprite background transparent
          sprite.color = 'black';
          sprite.textHeight = 14;
          sprite.zIndex = -99;
          sprite.fontWeight = 'bold';
          return node.id === 'Artefact' ? sprite: null;
        })
        // .nodeThreeObject(node => {
        //   const imgTexture = new THREE.TextureLoader().load(`../images/artefact.png`);
        //   const material = new THREE.SpriteMaterial({ map: imgTexture });
        //   const sprite = new THREE.Sprite(material);
        //   sprite.scale.set(12, 12);
        //   // return sprite;
        //   return node.id === 'Artefact' ? sprite: null;
        // })
        .cameraPosition({ x: 200, y: 200, z: 200 })
        // .cameraPosition({ x: 200, y: 200, z: 200 })
        // .cameraPosition({ x: 200, y: 0, z: 200 })
        .onNodeClick(function () {
          window.location = "/manifesto";
        })
        // .width("auto")
        .height(375)
        .enableNavigationControls(false)

        // .nodeThreeObject((node) => {
        //   const sprite = new SpriteText(node.id);
        //   sprite.color =
        //     node.type === "roles"
        //       ? "#ff0000"
        //       : node.label === "Artefact"
        //       ? "blue"
        //       : "#000000";
        //   sprite.textHeight =
        //     node.type === "roles" ? 8 : node.label === "Artefact" ? 24 : 8;
        //   return sprite;
        // })
        .d3Force("link")
        .distance((link) => link.distance);
      let angle = 0;
      // auto rotating when zoom is not there..
      function rotate() {
        rotating = setInterval(() => {
          graph.cameraPosition({
            x: 300 * Math.sin(angle),
            y: 300 * Math.sin(angle),
            z: 350 * Math.cos(angle),
          });
          angle += Math.PI / 200;
        }, 50);
      }
      rotate();
      // var GraphCanvas = document.getElementsByTagName("canvas")[0];
      // let mouseClicked = false;

      // GraphCanvas.addEventListener("mousedown", function (e) {
      //   mouseClicked = true;

      //   if (window.event.which == 2) {
      //     graph.enableNavigationControls(false);
      //   }
      // });
      // trying to rotate without zooming
      // GraphCanvas.addEventListener("mousemove", function (e) {
      //   if (mouseClicked) {
      //     console.log(e.clientX);
      //     graph.cameraPosition({
      //       x: 200 * Math.sin(e.clientX),
      //     });
      //   }
      // });
      // GraphCanvas.addEventListener("mouseup", function (e) {
      //   mouseClicked = false;
      //   if (window.event.which == 2) {
      //     graph.enableNavigationControls(false);
      //     graph.enableNavigationControls(true);
      //   }
      // });
    }

    if (typeof window !== "undefined") {
      dynamicImportModule();
    }
  }, []);
  return (
    <div className="graph">
      <div ref={ref}></div>
      <div className="search">
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          label="Search"
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton>
                  <SearchOutlined />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </div>
      <Typography gutterBottom>A</Typography>
      <Slider
        valueLabelDisplay="auto"
        components={{
          ValueLabel: ValueLabelComponent,
        }}
        aria-label="custom thumb label"
        defaultValue={20}
      />
      <Typography gutterBottom>B</Typography>
      <Slider
        valueLabelDisplay="auto"
        components={{
          ValueLabel: ValueLabelComponent,
        }}
        aria-label="custom thumb label"
        defaultValue={20}
      />
    </div>
  );
};

export default Graph;