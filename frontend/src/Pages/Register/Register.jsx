import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Bgİmage from '/image/bg_img.jpg';
import { FaRegUserCircle, FaLock, FaUser, FaHome } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { MdDriveFileRenameOutline } from "react-icons/md";
import AOS from 'aos';
import 'aos/dist/aos.css';


const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!firstName || !lastName || !email || !password || !agreeToTerms) {
            setError('Fill in all fields');
        } else {
            setError('');
            console.log('Register attempt with:', { firstName, lastName, email, password });
        }
    };

    return (
        <div style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${Bgİmage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh'
        }} className='d-flex align-items-center justify-content-center'>
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} sm={10} md={8} lg={6} xl={5}>
                        <div className='bg-white p-4 rounded-2 shadow-lg' data-aos="fade-down">
                            <Link to="/" className="text-primary text-decoration-none d-flex align-items-center mb-4">
                                <FaHome className="me-2" />
                                <span className="fw-bold">Home</span>
                            </Link>
                            <div className="text-center mb-4">
                                <FaRegUserCircle className='text-primary fs-1 mb-2' />
                                <h2 className='fw-bold text-dark'>Create an Account</h2>
                                <p className="text-muted">Join us today and start your journey!</p>
                            </div>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="formBasicFirstName">
                                            <InputGroup>
                                                <InputGroup.Text className="bg-light border-end-0">
                                                    <FaUser className="text-primary" />
                                                </InputGroup.Text>
                                                <Form.Control
                                                    className="border-start-0 bg-light"
                                                    placeholder="First Name"
                                                    value={firstName}
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                />
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="formBasicLastName">
                                            <InputGroup>
                                                <InputGroup.Text className="bg-light border-end-0">
                                                    <MdDriveFileRenameOutline className="text-primary" />
                                                </InputGroup.Text>
                                                <Form.Control
                                                    className="border-start-0 bg-light"
                                                    placeholder="Last Name"
                                                    value={lastName}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                />
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <InputGroup>
                                        <InputGroup.Text className="bg-light border-end-0">
                                            <IoMail className="text-primary" />
                                        </InputGroup.Text>
                                        <Form.Control
                                            className="border-start-0 bg-light"
                                            type="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <InputGroup>
                                        <InputGroup.Text className="bg-light border-end-0">
                                            <FaLock className="text-primary" />
                                        </InputGroup.Text>
                                        <Form.Control
                                            className="border-start-0 bg-light"
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check
                                        type="checkbox"
                                        label="I agree to the terms and conditions"
                                        checked={agreeToTerms}
                                        onChange={(e) => setAgreeToTerms(e.target.checked)}
                                        className="text-muted"
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100 py-2 mb-3">
                                    Create Account
                                </Button>
                            </Form>
                            <p className="text-center text-muted">
                                Already have an account? <Link to="/login" className='text-decoration-none fw-bold text-primary'>Log in</Link>
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Register;
