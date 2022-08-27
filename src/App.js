import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Main from './component/Main';
import Product from './component/Product';
import Graph from './component/graph';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
				<Routes>
					<Route path="/" element={<Main />}></Route>
					<Route path="/product/*" element={<Product />}></Route>
					<Route path="/graph/*" element={<Graph />}></Route>
					{/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
					{/* <Route path="*" element={<NotFound />}></Route> */}
				</Routes>
			</BrowserRouter>
    </div>
  );
}

export default App;
