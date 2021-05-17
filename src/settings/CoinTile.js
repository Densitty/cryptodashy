import React from "react";
import { AppContext } from "../App/AppProvider";
import { SelectableTile } from "../Shared/Tile";
import CoinHeaderGrid from "./CoinHeaderGrid";
import CoinImage from "../Shared/CoinImage";

const coinTile = ({ coinKey }) => {
  return (
    <AppContext.Consumer>
      {({ coinList }) => {
        let coin = coinList[coinKey];
        // console.log(coin);
        const TileClass = SelectableTile;
        // console.log(coinKey);
        return (
          <TileClass key={coin.Id}>
            <CoinHeaderGrid name={coin.CoinName} symbol={coin.Symbol} />
            <CoinImage coin={coin} />
            {/* {coinKey} */}
          </TileClass>
        );
      }}
    </AppContext.Consumer>
  );
};

export default coinTile;
