import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import NameDetail from "../../components/NameDetail/NameDetail"
import { useState, useEffect } from 'react';
import BannerImg from '/public/image/Banner2.jpg'
import ArabicImg from '/public/image/arabic.png'
import AOS from 'aos';
import 'aos/dist/aos.css';

const EsmaulHusna = () => {
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
    <Container className="my-5">
        <Row className="justify-content-center my-5" data-aos="fade-down">
            <Col md={12}>
                <Card className="text-center shadow-lg border-0 rounded-3">
                    <p className='text-center fs-4 fw-bold mt-4 px-3' style={{color: "#0b1b28"}}>Allah... O’ndan başka (ibadeti hak eden) hiçbir ilah yoktur. En güzel isimler O’na aittir. <br></br> (20/Tâhâ, 8)</p>
                    <div style={{backgroundImage: `url(${BannerImg})`, position: "relative", backgroundRepeat: "no-repeat", backgroundSize: "100% 100%", height: "500px"}}>
                        <img src={ArabicImg} style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}/>
                    </div>
                    <NameDetail />
                </Card>
            </Col>
        </Row>
    </Container>
  )
}

export default EsmaulHusna
