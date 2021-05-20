import React from "react";
import styled from "styled-components";
import { AppContext } from "../App/AppProvider";
// import { SelectableTile } from "../Shared/Tile";
import CoinTile from "./CoinTile";

export const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 15px;
  margin-top: 40px;
`;

function getLowerSectionCoins(coinList, filteredCoins) {
  // if we have the filteredCoins, render them or render the first 100 coins if not available
  return (
    (filteredCoins && Object.keys(filteredCoins)) ||
    Object.keys(coinList).slice(0, 100)
  );
}

const getCoinsToDisplay = (coinList, topSection, favorites, filteredCoins) => {
  // console.log(topSection);
  // return only 100 coins instead of the thousands the API returns
  // to display favorites if we are in the top section
  return topSection ? favorites : getLowerSectionCoins(coinList, filteredCoins);
};

const CoinGrid = ({ topSection }) => {
  return (
    <AppContext.Consumer>
      {({ coinList, favorites, filteredCoins }) => {
        // console.log(coinList);
        return (
          <CoinGridStyled>
            {getCoinsToDisplay(
              coinList,
              topSection,
              favorites,
              filteredCoins
            ).map((coin, index) => {
              // console.log(filteredCoins); // name of coin diplayed
              /* console.log(coin); */ /* return <SelectableTile key={index}>{coin}</SelectableTile>; */
              return (
                <CoinTile key={coin} topSection={topSection} coinKey={coin} />
              );
            })}
          </CoinGridStyled>
        );
      }}
    </AppContext.Consumer>
  );
};

export default CoinGrid;
