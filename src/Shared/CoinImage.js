import React from "react";
import styled, { css } from "styled-components";

const CoinImageStyled = styled.img`
  height: 50px;
  ${(props) =>
    props.spotLight &&
    css`
      height: 200px;
      display: block;
      margin: auto;
    `}
`;

const CoinImage = ({ coin, spotLight }) => {
  return (
    <CoinImageStyled
      src={`http://cryptocompare.com/${coin.ImageUrl}`}
      alt={coin.CoinSymbol}
      spotLight={spotLight}
    />
  );
};

export default CoinImage;
