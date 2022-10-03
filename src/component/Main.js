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
    <div>
    <div class="up">
      {/* <a href="https://manuel.pinto.dev" class="text-decoration-none"> </a>*/}
      <h3>color emotions</h3>
      <h3>단어를 검색해 보세요</h3>
   
      </div>
      <div class="down">
        <div>
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
      
  </div>
    </div>
			 
		</>
	);
};

export default Main;