import React from "react";
import { AppContext } from "../App/AppProvider";

const Welcome = () => {
  return (
    <AppContext.Consumer>
      {({ firstVisit }) =>
        firstVisit ? (
          <div>
            Welcome to CrptoDashy, please select your favorite coins to begin
          </div>
        ) : null
      }
      {/* {(value) => console.log(value)} */}
    </AppContext.Consumer>
  );
};

export default Welcome;
