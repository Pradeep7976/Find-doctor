import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider, theme } from "@chakra-ui/react";

import Home from "./pages/Home/Home";
import LoginP from "./pages/login/Loginp";
// import RegesterR from "./pages/Regester_Receps/RegesterR";

import Doctors from "./pages/Doctors/Doctors";
// import Nav from "./components/Navbar";
// import WaveB from "./components/WaveB/WaveB";
import PReg from "./pages/PReg/PReg";
import Temp from "./pages/Temp/Temp";
import Docadd from "./pages/Docadd/Docadd";
import Docdetail from "./pages/Docdetail/Docdetail";
import NoMatch from "./pages/Nomatch/NoMatch";

import "./App.css";
import Rate from "./components/Rating/Rate";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        {/* <Nav /> */}
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginP />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/Preg" element={<PReg />} />
            <Route path="/temp" element={<Temp />} />
            <Route path="/docadd" element={<Docadd />} />
            <Route path="/details/:did" element={<Docdetail />} />
            <Route path="/rating" element={<Rate />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </Router>
      </div>
    </ChakraProvider>
  );
}

export default App;
