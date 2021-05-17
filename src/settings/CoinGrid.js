import React from "react";
import styled, { css } from "styled-components";
import { AppContext } from "../App/AppProvider";
import { SelectableTile } from "../Shared/Tile";
import CoinTile from "./CoinTile";

export const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 15px;
  /* margin-top: 40px; */
`;

const getCoinsToDisplay = (coinList) => {
  // return only 100 coins instead of the thousands the API returns
  return Object.keys(coinList).slice(0, 100);
};

const CoinGrid = () => {
  return (
    <AppContext.Consumer>
      {({ coinList }) => {
        // console.log(coinList);
        return (
          <CoinGridStyled>
            {getCoinsToDisplay(coinList).map((coin, index) => {
              console.log(coin);
              /* return <SelectableTile key={index}>{coin}</SelectableTile>; */
              return <CoinTile coinKey={coin} />;
            })}
          </CoinGridStyled>
        );
      }}
    </AppContext.Consumer>
  );
};

export default CoinGrid;
