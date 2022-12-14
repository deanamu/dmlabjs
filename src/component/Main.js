import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

//import "./Main.css";
const gradient = keyframes`
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const LogoSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: left;
  align-items: center;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  min-height: 50vh;
  height: calc(100% - 560px);
  animation: ${gradient} 15s ease infinite;
  .paused {
    -webkit-animation-play-state: paused; /* Safari 4.0 - 8.0 */
    animation-play-state: paused;
  }
  img {
    width: 272px;
    height: 92px;
    margin-top: auto;
  }
  h3 {
    align-items: left;
    font-size: 18px;
  }
`;

const SearchSection = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

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

const ButtonSection = styled.div`
  display: flex;
  justify-content: center;
  height: 70px;
  padding-top: 18px;
  top: 53px;
  z-index: 0;
  button {
    background-color: #f8f9fa;
    border: 1px solid #f8f9fa;
    border-radius: 4px;
    color: #3c4043;
    font-family: Roboto, arial, sans-serif;
    font-size: 14px;
    margin: 11px 4px;
    padding: 0 16px;
    line-height: 27px;
    height: 36px;
    min-width: 54px;
    text-align: center;
    cursor: pointer;
    user-select: none;
  }
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

const ISVG = styled.svg`
  color: #fff;
  fill: currentColor;
  width: 24px;
  height: 24px;
  padding: 10px;
`;

const IButton = styled.button`
  all: unset;
  cursor: pointer;
  width: 44px;
  height: 44px;
`;

const H3Title = styled.text`
  position: absolute;
  top: 0px;
  left: 10px;
  color: #fff;
  textalign: "left";
`;
const H1Title = styled.h1`
margin: 0;
position: absolute;
top: 85%;
left: 50%;
margin-right: -50%;
color: #fff;
transform: translate(-50%, -50%)
`;
const Main = (props) => {
  const { onSearch } = props;

  const [searchText, setSearchText] = useState("");

  const handleInput = (e) => {
    const text = e.target.value;
    setSearchText(text);
  };

  const handleEnterKeyPressed = (e) => {
    if (e.key === "Enter") {
      <Link to={`/graph/${searchText}/10/10`}></Link>;
    }
  };

  return (
    <Container>
      <LogoSection>
        {/* <img
          src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
          alt="google-logo"
        /> */}
        <H3Title>color emotions</H3Title>
        <H1Title>????????? ????????? ?????????</H1Title>
      </LogoSection>
      <SearchSection>
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
              <Link to={`/graph/${searchText}/10/10`}>
                <IButton>
                  <svg viewBox="0 0 1024 1024">
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
        {/* <ButtonSection>
          <Link to={`/graph/${searchText}/10/10`}>
            <button>????????????</button>
          </Link>
        </ButtonSection> */}
      </SearchSection>
    </Container>
  );
};

export default Main;
