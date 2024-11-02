import SurahDetail from "../../components/SurahDetail/SurahDetail";
import { useEffect, useState } from 'react';
import AOS from 'aos';
import "./Home.css"
import { Container, Spinner, Row, Col, Button } from 'react-bootstrap';
import ImgLogo from '/public/image/tawhid_flag.jpg'
import { FaBookOpen, FaQuestionCircle, FaUserGraduate } from 'react-icons/fa';

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
        });

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner animation="grow" role="status" variant='dark'>
                    <span className="visually-hidden">Yüklənir...</span>
                </Spinner>
            </Container>
        );
    }
    return (
        <div className="home bg-gradient" data-aos="fade-down" data-aos-delay="150">
            <Container className="py-5">
                <Row className="align-items-center mb-5">
                    <Col lg={6} className="mb-4 mb-lg-0">
                        <h1 className="display-3 fw-bold text-white mb-3 rounded-3 animated-title text-center" >Əs Salamun Aleyküm</h1>
                        <Button size="lg" className="pulse-button rainbow-bg w-100 d-flex justify-content-center align-items-center">
                            <FaQuestionCircle className="me-2" />
                            İslami testə xoş gəlmisiniz. Allah elminizi bərəkətli etsin
                        </Button>
                    </Col>
                    <Col lg={6}>
                        <div className="image-container floating">
                            <img src={ImgLogo} alt="Tawhid Flag" className="img-fluid rounded-3 shadow-lg hover-effect" />
                        </div>
                    </Col>
                </Row>

                {<SurahDetail />}

                <Row className="mt-5 text-center feature-row">
                    <Col md={4} className="mb-4">
                        <div className="feature-card bouncing">
                            <div className="feature-icon text-white rounded-circle mb-3">
                                <FaBookOpen className="bi" />
                            </div>
                            <h3 className="fw-bold">Öyrən</h3>
                            <p className="text-muted">İslam haqqında daha çox bilik əldə edin.</p>
                        </div>
                    </Col>
                    <Col md={4} className="mb-4">
                        <div className="feature-card bouncing">
                            <div className="feature-icon text-white rounded-circle mb-3">
                                <FaQuestionCircle className="bi" />
                            </div>
                            <h3 className="fw-bold">Sınaq Et</h3>
                            <p className="text-muted">Biliklərinizi maraqlı testlərlə yoxlayın.</p>
                        </div>
                    </Col>
                    <Col md={4} className="mb-4">
                        <div className="feature-card bouncing">
                            <div className="feature-icon text-white rounded-circle mb-3">
                                <FaUserGraduate className="bi" />
                            </div>
                            <h3 className="fw-bold">İnkişaf Et</h3>
                            <p className="text-muted">Mənəvi və elmi cəhətdən inkişaf edin.</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Home