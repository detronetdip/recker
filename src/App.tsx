import { Route, Routes } from "react-router-dom";
import AllPages from "./pages/AllPages";
function App() {
  return (
    <>
      <Routes>
        <Route path="/"  element={<AllPages />}>
        </Route>
      </Routes>
    </>
  );
}

export default App;
