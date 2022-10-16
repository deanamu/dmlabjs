import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Navbar = () => {
  return (
    <Nav>
      <LeftLinks>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/store">Store</NavLink>
      </LeftLinks>
      <RightLinks>
        <NavLink to="/gmail">Gmail</NavLink>
        <NavLink to="/images">Images</NavLink>
        <NavLink to="/"></NavLink>
      </RightLinks>
    </Nav>
  );
};

export default Navbar;
