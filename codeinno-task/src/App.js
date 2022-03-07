import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import General from "./components/General/General";
import Restaurant from "./components/Restaurant/Restaurant";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<General />}>
        </Route>
        <Route exact path="/restaurant/:id" element={<Restaurant />}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
