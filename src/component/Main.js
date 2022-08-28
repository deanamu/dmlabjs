import React from 'react';
import { Link } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import IconButton from '@mui/material/Icon';
import InputAdornment from '@mui/material/InputAdornment';
import { SearchOutlined } from '@mui/icons-material';
const Main = (props) => {
	return (
		<>
			<h3>안녕하세요. 메인페이지 입니다.</h3>
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
            <ul>
				<Link to="/product/1"><li>1번상품</li></Link>
				<Link to="/product/2"><li>2번상품</li></Link>
				<Link to="/graph/1"><li>그래프</li></Link>
			</ul>
		</>
	);
};

export default Main;