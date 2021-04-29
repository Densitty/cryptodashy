import Welcome from "./Welcome";
import "./App.css";
/* styled component */
import styled, { css } from "styled-components";

const MyButton = styled.div`
  color: green;
  font-size: 2rem;
  display: inline-block;
  padding: 1rem;
  border: 1px solid #ef9393;
  margin: 0.6rem;
  /* passing a prop */
  ${(props) =>
    props.primary &&
    css`
      background: #260f4e;
      color: #fff;
    `}
`;

/* Extending functionality in styled-components */
const TomatoButton = styled(MyButton)`
  color: tomato;
  border-color: tomato;
`;

function App() {
  return (
    <div className="App">
      <Welcome />
      <MyButton>Click Me</MyButton>
      <MyButton primary>Primary Button</MyButton>
      <TomatoButton>Primary Button</TomatoButton>
    </div>
  );
}

export default App;
