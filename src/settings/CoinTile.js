import React from "react";
import { AppContext } from "../App/AppProvider";
import { SelectableTile, DeletableTile, DisabledTile } from "../Shared/Tile";
import CoinHeaderGrid from "./CoinHeaderGrid";
import CoinImage from "../Shared/CoinImage";

const coinTile = ({ coinKey, topSection }) => {
  return (
    <AppContext.Consumer>
      {({ coinList }) => {
        let coin = coinList[coinKey];
        // console.log(coin);
        let TileClass = SelectableTile;

        if (topSection) {
          TileClass = DeletableTile;
        }
        // console.log(coinKey);
        return (
          <TileClass key={coin.Id}>
            <CoinHeaderGrid
              topSection={topSection}
              name={coin.CoinName}
              symbol={coin.Symbol}
            />
            <CoinImage coin={coin} />
            {/* {coinKey} */}
          </TileClass>
        );
      }}
    </AppContext.Consumer>
  );
};

export default coinTile;
