import React from "react";
import styled, { css } from "styled-components";
import { AppContext } from "./AppProvider";

const Bar = styled.div`
  display: grid;
  margin-bottom: 4rem;
  grid-template-columns: 180px auto 100px 100px;
`;

const Logo = styled.div`
  font-size: 2rem;
`;

const ControlButtonElement = styled.div`
  cursor: pointer;
  ${(props) =>
    props.active &&
    css`
      color: #f3d798;
      text-shadow: 0px 0px 60px #03ff03;
    `}
  ${(props) =>
    props.hidden &&
    css`
      display: none;
    `}
`;

const CharToUpperCase = (word) => {
  return word.charAt(0).toUpperCase() + word.substring(1);
};

const ControlButton = (props) => {
  // console.log(props);
  const { name } = props;
  return (
    <AppContext.Consumer>
      {({ firstVisit, page, changePage }) => (
        <ControlButtonElement
          active={page === name}
          onClick={() => changePage(name)}
          hidden={firstVisit && name === "dashboard"}
        >
          {CharToUpperCase(name)}
        </ControlButtonElement>
      )}
    </AppContext.Consumer>
  );
};

const AppBar = () => {
  return (
    <Bar>
      <Logo>CryptoDashy</Logo>
      {/* the div below will be given an auto space */}
      <div />
      <ControlButton active name="dashboard" />
      <ControlButton name="settings" />
    </Bar>
  );
};

export default AppBar;
