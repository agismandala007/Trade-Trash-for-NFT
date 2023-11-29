import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import {Home} from "./pages/Home";
import {About} from "./pages/About";
import { Kelola } from "./pages/Kelola";
import { NFT } from "./pages/NFT";


function App() {
  return (
    <div className="App">
      <Navigation />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/kelola" element={<Kelola />} />
            <Route path="/nft" element={<NFT />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
