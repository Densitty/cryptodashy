import Settings from "../settings";
import "./App.css";
import AppLayout from "./AppLayout";
import AppBar from "./AppBar";
import { AppProvider } from "./AppProvider";

function App() {
  return (
    <AppLayout>
      <AppProvider>
        <AppBar />
        <Settings />
      </AppProvider>
    </AppLayout>
  );
}

export default App;
