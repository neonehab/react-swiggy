import Header from "./components/header/Header";
import "./App.css";
import { Outlet } from "react-router-dom";
import useCurrentLocation from "./data/useCurrentLocation";

function App() {
  const location = useCurrentLocation();

  return (
    <>
      <Header location={location}></Header>
      <Outlet context={{ location }}></Outlet>
    </>
  );
}

export default App;
