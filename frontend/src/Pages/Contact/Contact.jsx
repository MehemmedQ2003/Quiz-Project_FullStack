import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import { motion } from 'framer-motion';

const Contact = () => {
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
        <Container fluid className="py-5 bg-light">
            <motion.h1
                className="text-center mb-5 display-4 fw-bold"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Əlaqə
            </motion.h1>
            <Row className="justify-content-center">
                <Col lg={10}>
                    <motion.div
                        className="bg-white shadow-lg rounded-3 overflow-hidden"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Row>
                            <Col lg={6} className="p-5">
                                <h2 className="mb-4 fw-bold text-primary">Bizimlə əlaqə saxlayın</h2>
                                <Form>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-4">
                                                <Form.Label>Ad</Form.Label>
                                                <motion.div
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Adınızı daxil edin"
                                                        className="border-0 border-bottom rounded-0 shadow-sm py-2"
                                                        style={{ transition: 'all 0.3s' }}
                                                    />
                                                </motion.div>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-4">
                                                <Form.Label>E-poçt</Form.Label>
                                                <motion.div
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <Form.Control
                                                        type="email"
                                                        placeholder="E-poçt ünvanınızı daxil edin"
                                                        className="border-0 border-bottom rounded-0 shadow-sm py-2"
                                                        style={{ transition: 'all 0.3s' }}
                                                    />
                                                </motion.div>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Form.Group className="mb-4">
                                        <Form.Label>Mövzu</Form.Label>
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Form.Control
                                                type="text"
                                                placeholder="Mesajınızın mövzusunu daxil edin"
                                                className="border-0 border-bottom rounded-0 shadow-sm py-2"
                                                style={{ transition: 'all 0.3s' }}
                                            />
                                        </motion.div>
                                    </Form.Group>
                                    <Form.Group className="mb-4">
                                        <Form.Label>Mesaj</Form.Label>
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Form.Control
                                                as="textarea"
                                                rows={5}
                                                placeholder="Mesajınızı daxil edin"
                                                className="border-0 border-bottom rounded-0 shadow-sm py-2"
                                                style={{ transition: 'all 0.3s', resize: 'none' }}
                                            />
                                        </motion.div>
                                    </Form.Group>
                                    <motion.div
                                        className="d-grid mt-4"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Button type="submit" size="lg" className="btn-primary text-white fw-bold py-3" style={{ backgroundColor: '#1E5C93' }}>
                                            Göndər
                                        </Button>
                                    </motion.div>
                                </Form>
                            </Col>
                            <Col lg={6} className="bg-primary text-white p-5 d-flex flex-column justify-content-between">
                                <div>
                                    <h2 className="mb-4 fw-bold">Əlaqə məlumatları</h2>
                                    <motion.div
                                        className="d-flex align-items-center mb-4"
                                        whileHover={{ x: 10 }}
                                    >
                                        <FaPhone className="me-3 fs-4" />
                                        <p className="mb-0 fs-5">+994 55 713 52 90</p>
                                    </motion.div>
                                    <motion.div
                                        className="d-flex align-items-center mb-4"
                                        whileHover={{ x: 10 }}
                                    >
                                        <FaEnvelope className="me-3 fs-4" />
                                        <p className="mb-0 fs-5">mehemmed.qardasov2003@gmail.com</p>
                                    </motion.div>
                                    <motion.div
                                        className="d-flex align-items-center mb-5"
                                        whileHover={{ x: 10 }}
                                    >
                                        <FaMapMarkerAlt className="me-3 fs-4" />
                                        <p className="mb-0 fs-5">Bakı, Azərbaycan</p>
                                    </motion.div>
                                </div>
                                <motion.div
                                    className="map-container rounded-3 overflow-hidden mt-4"
                                    style={{ height: '250px', width: '100%' }}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 0.5 }}
                                >
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d194473.42999465!2d49.71487086893639!3d40.37494975641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d6bd6211cf9%3A0x343f6b5e7ae56c6b!2zQmFrxLE!5e0!3m2!1sen!2saz!4v1653909825837!5m2!1sen!2saz"
                                        title="Google Maps"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade">
                                    </iframe>
                                </motion.div>
                            </Col>
                        </Row>
                    </motion.div>
                </Col>
            </Row>
        </Container>
    );
};

export default Contact;
