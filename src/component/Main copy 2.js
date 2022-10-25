// import React from 'react';
// import { useState } from "react";
// import { Link } from 'react-router-dom';
// import TextField from "@mui/material/TextField";
// import IconButton from '@mui/material/Icon';
// import InputAdornment from '@mui/material/InputAdornment';
// import { SearchOutlined } from '@mui/icons-material';
// import { Button } from '@mui/material';
// import styled,{ keyframes } from 'styled-components';

// //import './Main.css';
// const gradient =keyframes`
// 	0% {
// 		background-position: 0% 50%;
// 	}
// 	50% {
// 		background-position: 100% 50%;
// 	}
// 	100% {
// 		background-position: 0% 50%;
// 	}`;

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
// `;
// const LogoSection = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   background: linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB);
//   background-size: 400% 400%;
//   min-height: 50vh;
//   height: calc(100% - 560px);
//   animation: ${gradient} 15s ease infinite;
//   .paused {
//     -webkit-animation-play-state: paused; /* Safari 4.0 - 8.0 */
//     animation-play-state: paused;
//   }
//   img {
//     width: 272px;
//     height: 92px;
//     margin-top: auto;
//   }
//   h3 {
//     align-items: left;
//     font-size: 18px;
//   }
// `;

// const SearchSection = styled.div`
//   padding: 20px;
//   display: flex;
//   justify-content: center;
//   flex-direction: column;
// `;

// const Form = styled.form``;

// const Search = styled.div`
//   display: flex;
//   align-items: center;
//   padding: 0px 14px;
//   background: #fff;
//   border: 1px solid #dfe1e5;
//   box-shadow: none;
//   border-radius: 24px;
//   z-index: 3;
//   height: 44px;
//   margin: 0 auto;
//   max-width: 584px;
// `;

// const ButtonSection = styled.div`
//   display: flex;
//   justify-content: center;
//   height: 70px;
//   padding-top: 18px;
//   top: 53px;
//   z-index: 0;
//   button {
//     background-color: #f8f9fa;
//     border: 1px solid #f8f9fa;
//     border-radius: 4px;
//     color: #3c4043;
//     font-family: Roboto, arial, sans-serif;
//     font-size: 14px;
//     margin: 11px 4px;
//     padding: 0 16px;
//     line-height: 27px;
//     height: 36px;
//     min-width: 54px;
//     text-align: center;
//     cursor: pointer;
//     user-select: none;
//   }
// `;

// const SearchIcon = styled.span`
//   color: #9aa0a6;
//   height: 30px;
//   width: 30px;
//   padding-right: 10px;
//   display: flex;
//   align-items: center;
//   & svg {
//     fill: #9aa0a6;
//   }
// `;

// const SearchInput = styled.input`
//   display: flex;
//   flex: 1;
//   flex-wrap: wrap;
//   height: 40px;
//   background-color: transparent;
//   border: none;
//   margin: 0;
//   padding: 0;
//   color: rgba(0, 0, 0, 0.87);
//   word-wrap: break-word;
//   outline: none;
//   -webkit-tap-highlight-color: transparent;
//   height: 34px;
//   font-size: 16px;
// `;

// const MicIcon = styled.div`
//   display: flex;
//   cursor: pointer;
//   align-items: center;
//   border: 0;
//   background: transparent;
//   outline: none;
//   padding: 0 8px;
//   width: 40px;
//   line-height: 44px;
//   height: 44px;
//   svg {
//     height: 24px;
//     width: 24px;
//     vertical-align: middle;
//   }
// `;

// const ISVG = styled.svg`
//   color: #fff;
//   fill: currentColor;
//   width: 24px;
//   height: 24px;
//   padding: 10px;
// `;

// const IButton = styled.button`
//   all: unset;
//   cursor: pointer;
//   width: 44px;
//   height: 44px;
// `;

// const Main = (props) => {
//   const { onSearch } = props;

//   const [searchText, setSearchText] = useState('')

//   const handleInput = (e) => {
//     const text = e.target.value
//     setSearchText(text)
//   }

//   const handleEnterKeyPressed = (e) => {
//     if(e.key=== 'Enter') {
//       onSearch(searchText)
//       window.location.href = `/graph/${searchText}`;
//     }
//   }

// 	return (
//     <Container>
//       <LogoSection>
//         {/* <img
//           src='https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
//           alt='google-logo'
//         /> */}
//          <h3>color emotions</h3>
//          <h1>단어를 검색해 보세요</h1>
//       </LogoSection>
//       <SearchSection>
//         <Form action='/' method='GET' role='search'>
//           <Search>
//             <SearchInput type='text' onChange={handleInput}
//           onKeyPress={handleEnterKeyPressed}  value={searchText}/>
//           <button type="submit"><i class="fa fa-search"></i></button>
//             <SearchIcon>
//               <svg
//                 focusable='false'
//                 xmlns='http://www.w3.org/2000/svg'
//                 viewBox='0 0 24 24'
//               >
//                 <path d='M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' />
//               </svg>
//             </SearchIcon>
//           </Search>
//         </Form>
//         <ButtonSection>
//            <Link to={`/graph/${searchText}`}>
//             <button>확인하기</button>
//           </Link>
//         </ButtonSection>
//       </SearchSection>
//     </Container>
// 	);
// };

// export default Main;