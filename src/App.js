import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";
import Main from "./component/Main";
import Graph from "./component/graph";
import styled from "styled-components";

axios.defaults.baseURL = "http://localhost:5000/";
const Container = styled.div`
  max-width: flex;
  min-height: 100vh;
`;
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Container>
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/graph/:search/:a/:b" element={<Graph />}></Route>
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
