import { Box } from "@mui/system";
import "./App.css";
import Homepage from "./Containers/Homepage";
import { ShiftContextProvider } from "./Context/shifts";

function App() {
  return (
    <div className="App">
      <ShiftContextProvider>
        <Box width={"30%"} margin="0 auto">
          <Homepage />
        </Box>
      </ShiftContextProvider>
    </div>
  );
}

export default App;
