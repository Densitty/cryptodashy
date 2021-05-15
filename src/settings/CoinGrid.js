import React from "react";
import styled, { css } from "styled-components";
import { AppContext } from "../App/AppProvider";

export const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

const CoinGrid = () => {
  return (
    <AppContext.Consumer>
      {({ coinList }) => {
        // console.log(coinList);
        return (
          <CoinGridStyled>
            {Object.keys(coinList).map((coin, index) => {
              // console.log(coin);
              return <div key={index}>{coin}</div>;
            })}
          </CoinGridStyled>
        );
      }}
    </AppContext.Consumer>
  );
};

export default CoinGrid;
