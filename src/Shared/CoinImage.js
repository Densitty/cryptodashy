import React from "react";

const CoinImage = ({ coin, style }) => {
  return (
    <img
      src={`http://cryptocompare.com/${coin.ImageUrl}`}
      alt={coin.CoinSymbol}
      style={style || { height: "50px", marginTop: "40px" }}
    />
  );
};

export default CoinImage;
