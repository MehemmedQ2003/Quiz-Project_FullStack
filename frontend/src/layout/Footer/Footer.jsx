import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaTwitter, FaGithub, FaWhatsapp } from 'react-icons/fa';
import logo from '/image/islamic_quiz_logo.jpg';

const socialLinks = [
    { Icon: FaInstagram, color: '#E1306C', url: 'https://www.instagram.com/qardasovmehemmed11/' },
    { Icon: FaFacebook, color: '#1877F2', url: 'https://www.facebook.com/profile.php?id=100049465160692' },
    { Icon: FaTwitter, color: '#1DA1F2', url: 'https://x.com/mehemmedq11' },
    { Icon: FaGithub, color: '#000000', url: 'https://github.com/MehemmedQ2003' },
    { Icon: FaWhatsapp, color: "#4DC85A", url: "https://wa.me/+994557135290" }
];

const navLinks = [
    { to: '/', text: 'Ana səhifə' },
    { to: '/about', text: 'Haqqımızda' },
    { to: '/names', text: 'Əsmaul Hüsna' },
    { to: '/questionscategory', text: 'Testlər' },
    { to: '/contact', text: 'Əlaqə' }
];

const Footer = () => (
    <footer className="text-light py-2" style={{ backgroundColor: '#1E5C93' }}>
        <Container>
            <Row className="justify-content-between">
                <Col lg={4} md={6} className="mb-2 d-flex justify-content-center">
                    <img src={logo} alt="logo" className="mb-3" width="50" height="50" />
                </Col>
                <Col lg={4} md={6} className="mb-2">
                    <ul className="list-unstyled">
                        {navLinks.map(({ to, text }) => (
                            <li key={to} className="mb-2">
                                <Link to={to} className="text-white text-decoration-none hover-effect d-flex align-items-center justify-content-center">
                                    <span className="me-2">&#8250;</span> {text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Col>
                <Col lg={4} md={12} className="mb-2">
                    <div className="mt-3 d-flex justify-content-center flex-wrap">
                        {socialLinks.map(({ Icon, color, url }) => (
                            <a key={url} href={url} target="_blank" rel="noopener noreferrer"
                                className="me-3 social-icon hover-effect" style={{ color: 'white', backgroundColor: color, padding: '5px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '50px', height: '50px', transition: 'transform 0.3s' }}>
                                <Icon size={25} />
                            </a>
                        ))}
                    </div>
                </Col>
            </Row>
            <hr className=" bg-light" />
            <p className="text-center small mb-0">
                &copy; {new Date().getFullYear()} İslami Test. Bütün hüquqlar qorunur.
            </p>
        </Container>
    </footer>
);

export default Footer;
