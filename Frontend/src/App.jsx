import { Route, Routes, useSearchParams } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Placeorder from "./pages/Placeorder/Placeorder";
import Cart from "./pages/Cart/Cart";
import Footer from "./components/Footer/Footer";
import { useState } from "react";
import LoginPopUp from "./components/LoginPopUp/LoginPopUp";
import Verify from "./pages/Verify/Verify";
import Myorders from "./pages/Myorders/Myorders";

const App = () => {
  const [showLogin, setshowLogin] = useState(false);
  return (
    <>
      {showLogin ? <LoginPopUp setshowLogin={setshowLogin} /> : <></>}
      <div className="app">
        <Navbar setshowLogin={setshowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Placeorder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<Myorders />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};
export default App;
