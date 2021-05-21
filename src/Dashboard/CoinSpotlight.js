import React from "react";
import { Tile } from "../Shared/Tile";
import CoinImage from "../Shared/CoinImage";
import { AppContext } from "../App/AppProvider";
import styled from "styled-components";

const SpotlightName = styled.h3`
  text-align: center;
`;

const CoinSpotlight = () => {
  return (
    <AppContext.Consumer>
      {({ currentFavorite, coinList }) => {
        return (
          <Tile>
            <SpotlightName>
              {coinList[currentFavorite]["CoinName"]}
            </SpotlightName>
            <CoinImage spotLight coin={coinList[currentFavorite]} />
          </Tile>
        );
      }}
    </AppContext.Consumer>
  );
};

export default CoinSpotlight;
