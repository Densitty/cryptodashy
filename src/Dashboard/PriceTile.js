import React from "react";
import styled, { css } from "styled-components";
import { SelectableTile } from "../Shared/Tile";
import { fontSize3, fontSizeBig, greenBoxShadow } from "../Shared/Styles";
import { CoinHeaderGridStyled } from "../settings/CoinHeaderGrid";
import { AppContext } from "../App/AppProvider";

const PriceTileStyled = styled(SelectableTile)`
  ${(props) =>
    props.compact &&
    css`
      ${fontSize3}
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 5px;
      justify-items: right;
    `}
  ${(props) =>
    props.currentFavorite &&
    css`
      ${greenBoxShadow};
      pointer-events: none;
    `}
`;

const JustifyLeft = styled.div`
  justify-self: left;
`;

const JustifyRight = styled.div`
  justify-self: right;
`;

const TickerPrice = styled.div`
  ${fontSizeBig}
`;

const numberFormat = (number) => {
  /* number + string = string */
  return parseFloat((number + "").slice(0, 7));
};

const ChangePercentColor = styled.div`
  color: green;
  ${(props) =>
    props.red &&
    css`
      color: red;
    `}
`;

const ChangePercent = ({ data }) => {
  return (
    <JustifyRight>
      <ChangePercentColor red={data.CHANGEPCT24HOUR < 0}>
        {numberFormat(data.CHANGEPCT24HOUR)}%
      </ChangePercentColor>
    </JustifyRight>
  );
};

function Price({ symbol, data, currentFavorite, setCurrentFavorite }) {
  // console.log(data);
  return (
    <PriceTileStyled
      currentFavorite={currentFavorite}
      onClick={setCurrentFavorite}
    >
      <CoinHeaderGridStyled>
        <div>{symbol}</div>
        <ChangePercent data={data} />
      </CoinHeaderGridStyled>
      <TickerPrice>${numberFormat(data.PRICE)}</TickerPrice>
    </PriceTileStyled>
  );
}

/* component to display the lower row of Price component differently */
const PriceCompact = ({
  symbol,
  data,
  currentFavorite,
  setCurrentFavorite,
}) => {
  return (
    <PriceTileStyled
      compact
      currentFavorite={currentFavorite}
      onClick={setCurrentFavorite}
    >
      <JustifyLeft>{symbol}</JustifyLeft>
      <ChangePercent data={data} />
      <div>${numberFormat(data.PRICE)}</div>
    </PriceTileStyled>
  );
};

const PriceTile = ({ price, index }) => {
  // console.log(price); // console.log(price[symbol]["USD"])
  const symbol = Object.keys(price)[0];
  const data = price[symbol]["USD"];
  // let coinPrice = data.PRICE;
  // console.log(coinPrice);
  let TileClass = index < 5 ? Price : PriceCompact;
  return (
    <AppContext.Consumer>
      {({ currentFavorite, setCurrentFavorite }) => {
        // console.log(currentFavorite === symbol);
        return (
          <TileClass
            symbol={symbol}
            data={data}
            compact={index >= 5}
            currentFavorite={currentFavorite === symbol}
            setCurrentFavorite={() => setCurrentFavorite(symbol)}
          ></TileClass>
        );
      }}
    </AppContext.Consumer>
  );
};

export default PriceTile;
