import Welcome from "./Welcome";
import "./App.css";
import AppLayout from "./AppLayout";
import AppBar from "./AppBar";
import { AppProvider } from "./AppProvider";

function App() {
  return (
    <AppLayout>
      <AppProvider>
        <AppBar />
        <Welcome />
      </AppProvider>
    </AppLayout>
  );
}

export default App;
