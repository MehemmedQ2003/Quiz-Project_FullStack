import { Card, Row } from 'react-bootstrap';
import { FaPray } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import 'aos/dist/aos.css';
import axios from "axios";


const NameDetail = () => {
  const [esmaulHusna, setEsmaulHusna] = useState([]);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/esmaul-husna/");
        const randomName = response.data.sort(() => 0.5 - Math.random())[0];
        setEsmaulHusna([randomName]);
      } catch (error) {
        console.error("Error fetching surahs:", error);
      }
    };
    fetchSurahs();
  }, []);

  return (
    <Row>
      {esmaulHusna.map((husna) => (
        <Card key={husna.id} className="p-4 shadow-lg border-0 rounded-3" style={{ backgroundColor: '#f8f9fa', transition: 'transform 0.7s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
          <Card.Title className="d-flex align-items-center justify-content-center display-4 text-primary fw-semibold mb-3 px-4">
            <FaPray className="me-2" />
            {husna.name}
          </Card.Title>
          <Card.Subtitle className="mb-2 fs-3 text-muted px-4">
            {husna.description}
          </Card.Subtitle>
          <Card.Text className="text-secondary mb-4 px-2 fs">
            {husna.dua}
          </Card.Text>
        </Card>
      ))}
    </Row>
  )
}

export default NameDetail
