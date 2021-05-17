import React from "react";

const CoinImage = ({ coin, style }) => {
  return (
    <img
      src={`http://cryptocompare.com/${coin.ImageUrl}`}
      alt={coin.CoinSymbol}
      style={style || { height: "50px", marginTop: "20px" }}
    />
  );
};

export default CoinImage;
