import React from "react";
import { AppContext } from "../App/AppProvider";

const Content = (props) => {
  return (
    <AppContext.Consumer>
      {({ coinList }) => {
        return coinList ? (
          <div>{props.children}</div>
        ) : (
          <div>Loading Coins</div>
        );
      }}
    </AppContext.Consumer>
  );
};

export default Content;
