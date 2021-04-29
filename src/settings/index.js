import React from "react";
import Welcome from "./Welcome";
import ConfirmButton from "./ConfirmButton";
import Page from "../Shared/Page";

const index = () => {
  return (
    <Page name="settings">
      <Welcome />
      <ConfirmButton />
    </Page>
  );
};

export default index;
