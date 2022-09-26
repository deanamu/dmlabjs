import React from 'react';
import { Link } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import IconButton from '@mui/material/Icon';
import InputAdornment from '@mui/material/InputAdornment';
import { SearchOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import './Main.css';
const Main = (props) => {
  
	return (
		<>
			<div className="search">
      {/* <a href="https://manuel.pinto.dev" class="text-decoration-none"> </a>*/}
      <h3>안녕하세요. 메인페이지 입니다.</h3>
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
      
            <ul>
				<Link to="/graph/"> <Button>버튼</Button></Link>
			</ul>
      </div>
      <div class="right">
  </div> 
		</>
	);
};

export default Main;