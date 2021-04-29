import React from "react";
import styled, { css } from "styled-components";

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
      text-shadow: 0px 0px 60px #03ff03;
    `}
`;

const CharToUpperCase = (word) => {
  return word.charAt(0).toUpperCase() + word.substring(1);
};

const ControlButton = ({ name, active }) => {
  return (
    <ControlButtonElement active={active}>
      {CharToUpperCase(name)}
    </ControlButtonElement>
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
