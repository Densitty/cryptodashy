import React from "react";
import highchartsConfig from "./HighchartsConfig";
import { Tile } from "../Shared/Tile";
import { AppContext } from "../App/AppProvider";
import ReactHighcharts from "react-highcharts";

const PriceChart = () => {
  return (
    <AppContext.Consumer>
      {() => {
        return (
          <Tile>
            <ReactHighcharts config={highchartsConfig()} />
          </Tile>
        );
      }}
    </AppContext.Consumer>
  );
};

export default PriceChart;
