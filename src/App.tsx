import { Route, Routes } from "react-router-dom";
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
