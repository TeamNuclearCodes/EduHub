import "./App.css";
import { Navbar, Footer } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
