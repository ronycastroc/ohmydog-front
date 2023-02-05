import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer, Header } from "./components";
import { Home } from "./pages";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />}/>
        </Routes>
        <Footer />      
      </BrowserRouter>     
    </>
  );
};
