import React from "react";
import Welcome from "./Welcome";
import ConfirmButton from "./ConfirmButton";
import Page from "../Shared/Page";
import CoinGrid from "./CoinGrid";

const index = () => {
  return (
    <Page name="settings">
      <Welcome />
      <ConfirmButton />
      <CoinGrid />
    </Page>
  );
};

export default index;
