import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AllPages from "./pages/AllPages";
import AddData from "./pages/AddData";
import History from "./pages/History";
import Auth from "./pages/Auth";
import Welcome from "./pages/Welcome";

function App() {
  // window.onbeforeunload = function () {
  //   localStorage.removeItem("userId");
  //   return "";
  // };
  return (
    <>
      <Routes>
        <Route path="/" element={<AllPages />}>
          <Route index element={<HomePage />} />
          <Route path="/add" element={<AddData />} />
          <Route path="/history" element={<History />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
        <Route path="/Welcome" element={<Welcome />} />
      </Routes>
    </>
  );
}

export default App;
