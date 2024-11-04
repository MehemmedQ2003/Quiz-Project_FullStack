import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import NavBar from "./layout/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import EsmaulHusna from "./Pages/EsmaulHusna/EsmaulHusna";
import Contact from "./Pages/Contact/Contact";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Footer from "./layout/footer/Footer";
import QuestionsCategory from "./Pages/QuestionsCategory/QuestionsCategory";

function App() {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const isAuthPage =
        location.pathname === "/login" || location.pathname === "/register";

        
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Spinner animation="grow" role="status" variant='dark'>
                <span className="visually-hidden">Yüklənir...</span>
            </Spinner>
        </div>;
    }

    return (
        <>
            {!isAuthPage && <NavBar />}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/names" element={<EsmaulHusna />} />
              <Route path="/questionscategory" element={<QuestionsCategory />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
            {!isAuthPage && <Footer />}
        </>
    );
}

export default App;
