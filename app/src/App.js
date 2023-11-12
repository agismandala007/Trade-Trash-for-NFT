import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navigation from "./components/Navigation"
import {Home} from "./pages/Home"
import {About} from "./pages/About"


function App() {
  return (
    <div className="App">
      <Navigation />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
    </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
