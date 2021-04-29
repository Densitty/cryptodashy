import Welcome from "./Welcome";
import "./App.css";
/* styled component */
import styled, { css } from "styled-components";
import AppLayout from "./AppLayout";

function App() {
  return (
    <AppLayout>
      <Welcome />
    </AppLayout>
  );
}

export default App;
