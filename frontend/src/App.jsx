import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import NavBar from "./layout/Navbar/Navbar";
import Footer from "./layout/footer/Footer";
import Home from "./components/Home/Home";

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
            </Routes>
            {!isAuthPage && <Footer />}
        </>
    );
}

export default App;
