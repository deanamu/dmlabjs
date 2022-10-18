import React, { Component,useState } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Main from './component/Main';
import Product from './component/Product';
import Graph from './component/graph';
import Home from './component/Home';
import axios from 'axios';
function App() {
	const [state, setState] = useState({
		results: []
	  });
	
	  const onSearch = async (text) => {

		const results = await axios.get(
			`http://localhost:5000/word/similarity/${text}/10/0`
		  );
	
		setState(prevState => {
		  return { ...prevState, results: results }
		})
	  };
  return (
    <div className="App">
      <BrowserRouter>
				<Routes>
					<Route path="/" element={<Main onSearch={onSearch}/>}></Route>
					<Route path="/graph/" element={<Graph onSearch={onSearch}/>}></Route>
					{/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
					{/* <Route path="*" element={<NotFound />}></Route> */}
				</Routes>
			</BrowserRouter>
    </div>
  );
}

export default App;
