import React from "react";
import { slide as Menu } from "react-burger-menu";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import { Link, redirect } from "react-router-dom";
//import TextField from "@mui/material/TextField";
//import InputAdornment from "@mui/material/InputAdornment";
import Slider from "@mui/material/Slider";
import Tooltip from "@mui/material/Tooltip";
//import IconButton from "@mui/material/Icon";
//import { SearchOutlined } from "@mui/icons-material";
import styled from "styled-components";
const Form = styled.form``;
const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 14px;
  background: #fff;
  border: 1px solid #dfe1e5;
  box-shadow: none;
  border-radius: 24px;
  z-index: 3;
  height: 44px;
  margin: 0 auto;
  max-width: 584px;
`;
const SearchIcon = styled.span`
  color: #9aa0a6;
  height: 30px;
  width: 30px;
  padding-right: 10px;
  display: flex;
  align-items: center;
  & svg {
    fill: #9aa0a6;
  }
`;
const IButton = styled.button`
  all: unset;
  cursor: pointer;
  width: 34px;
  height: 34px;
`;
const SearchInput = styled.input`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  height: 40px;
  background-color: transparent;
  border: none;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.87);
  word-wrap: break-word;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  height: 34px;
  font-size: 16px;
`;

function ValueLabelComponent(props) {
  const { children, value } = props;
  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}
export default (props) => {
  const [searchText, setSearchText] = useState("");
  const [a, seta] = useState(10);
  const [b, setb] = useState(10);
  const handleInput = (e) => {
    const text = e.target.value;
    setSearchText(text);
  };

  const handleEnterKeyPressed = (e) => {
    if (e.key === "Enter") {
      // <Link to={`/graph/${searchText}`}>

      // </Link>;
      redirect(`/graph/${searchText}/${a}/${b}`);
      //window.location.reload();
    }
  };
  const handleChangea = (event, newValue) => {
    seta(newValue);
  };
  const handleChangeb = (event, newValue) => {
    setb(newValue);
  };
  return (
    // Pass on our props
    <Menu {...props}>
      <Form action="/" method="GET" role="search">
        <Search>
          <SearchInput
            type="text"
            onChange={handleInput}
            onKeyPress={handleEnterKeyPressed}
            value={searchText}
          />
          {/* <IButton>
              <svg
                focusable="false"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
            </IButton> */}
          <SearchIcon>
            <Link to={`/graph/${searchText}/${a}/${b}`}>
              <IButton>
                {/* <svg
                  focusable="false"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <button>확인하기</button>
                  <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg> */}
                <svg viewBox="110 0 1024 1024">
                  <path
                    class="path1"
                    d="M848.471 928l-263.059-263.059c-48.941 36.706-110.118 55.059-177.412 55.059-171.294 0-312-140.706-312-312s140.706-312 312-312c171.294 0 312 140.706 312 312 0 67.294-24.471 128.471-55.059 177.412l263.059 263.059-79.529 79.529zM189.623 408.078c0 121.364 97.091 218.455 218.455 218.455s218.455-97.091 218.455-218.455c0-121.364-103.159-218.455-218.455-218.455-121.364 0-218.455 97.091-218.455 218.455z"
                  ></path>
                </svg>
              </IButton>
            </Link>
          </SearchIcon>
        </Search>
      </Form>
      <Typography gutterBottom>A</Typography>
      <Slider
        min={0}
        max={10}
        valueLabelDisplay="auto"
        components={{
          ValueLabel: ValueLabelComponent,
        }}
        onChange={handleChangea}
        value={a}
        aria-label="custom thumb label"
        defaultValue={10}
      />
      <Typography gutterBottom>B</Typography>
      <Slider
        min={0}
        max={10}
        valueLabelDisplay="auto"
        components={{
          ValueLabel: ValueLabelComponent,
        }}
        onChange={handleChangeb}
        value={b}
        aria-label="custom thumb label"
        defaultValue={10}
      />
    </Menu>
  );
};
