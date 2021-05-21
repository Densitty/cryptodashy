import React from "react";
import { AppContext } from "../App/AppProvider";
import styled from "styled-components";
import PriceTile from "./PriceTile";

const PriceDisplay = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 15px;
  margin-top: 40px;
`;

const PriceGrid = () => {
  return (
    <AppContext.Consumer>
      {({ prices }) => (
        <PriceDisplay>
          {prices.map((price, index) => {
            return <PriceTile key={index} index={index} price={price} />;
          })}
        </PriceDisplay>
      )}
    </AppContext.Consumer>
  );
};

export default PriceGrid;
