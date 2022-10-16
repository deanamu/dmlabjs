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
export const Graph = () => {
  const ref = createRef();
  const [pwidth, setPwidth] = useState(20);
  const [cwidth, setCwidth] = useState(20);
  const [gcwidth, setGcwidth] = useState(20);
  const [posts, setPosts] = useState([]);
  const [node, links] = useState([]);
  const [image, setImages] = useState([]);
  const [color, setColors] = useState([]);
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
    const fetchUsers = async () => {
      try {
        // 요청이 시작 할 때에는 error 와 users 를 초기화하고
        setError(null);
        setUsers(null);
        // loading 상태를 true 로 바꿉니다.
        setLoading(true);
        const response = await axios.get(
          'http://localhost:5000/word/similarity/soft/10/0'
        );
        console.log(response.data);
        //setUsers(response.data); // 데이터는 response.data 안에 들어있습니다.
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchUsers();


    async function dynamicImportModule() {
      
      const ForceGraph3D = await (await import("3d-force-graph")).default;
      const myGraph = ForceGraph3D(
      //   {
      //   extraRenderers: [new THREE.CSS2DRenderer()]
      // }
      );
     
     
      const datas = `{
        "keyword": "soft",
        "result": [
          {
            "coordinate": [
              0.022815335541963577, 0.005481179337948561, 0.03207440301775932
            ],
            "keyword": "thin",
            "similarity": 0.7951185703277588
          },
          {
            "coordinate": [
              0.047959327697753906, 0.01577720232307911, 0.038388170301914215
            ],
            "keyword": "thicker",
            "similarity": 0.755044162273407
          },
          {
            "coordinate": [
              0.0018156722653657198, 0.005652955267578363, 0.11265847831964493
            ],
            "keyword": "cream",
            "similarity": 0.7522318363189697
          },
          {
            "coordinate": [
              0.010016270913183689, 0.028387313708662987, 0.04686044156551361
            ],
            "keyword": "thick",
            "similarity": 0.7327376008033752
          },
          {
            "coordinate": [
              0.07132766395807266, 0.041951533406972885, 0.07754577696323395
            ],
            "keyword": "skin",
            "similarity": 0.722896158695221
          },
          {
            "coordinate": [
              0.00847446545958519, 0.027505049481987953, 0.0379103384912014
            ],
            "keyword": "thinner",
            "similarity": 0.7122347354888916
          },
          {
            "coordinate": [
              0.04117174446582794, 0.04774203151464462, 0.013867032714188099
            ],
            "keyword": "rub",
            "similarity": 0.7010282278060913
          },
          {
            "coordinate": [
              -0.08505047857761383, 0.013168980367481709, 0.1654481589794159
            ],
            "keyword": "creamy",
            "similarity": 0.6946989297866821
          },
          {
            "coordinate": [
              -0.05271998792886734, 0.03519152104854584, 0.05347294360399246
            ],
            "keyword": "texture",
            "similarity": 0.6915264129638672
          },
          {
            "coordinate": [
              -0.08255491405725479, 0.03262241557240486, 0.14705143868923187
            ],
            "keyword": "thicken",
            "similarity": 0.6804180145263672
          }
        ]
      }
      `
      const data = JSON.parse(datas);
      var j=0;
      for(var t of data.result) //node를 만들기 위해서 for문
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

      for(var t of data.result) //링크를 만들기 위해서
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