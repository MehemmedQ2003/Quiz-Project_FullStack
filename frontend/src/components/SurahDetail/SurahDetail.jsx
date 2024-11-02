import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Row,  } from 'react-bootstrap';
import { FaQuran } from 'react-icons/fa';

const SurahDetail = () => {
    const [ayahs, setAyahs] = useState([]);

    useEffect(() => {
        const fetchSurahs = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/ayahs/");
                const randomAyah = response.data.sort(() => 0.5 - Math.random())[0];
                setAyahs([randomAyah]);
            } catch (error) {
                console.error("Error fetching surahs:", error);
            }
        };
        fetchSurahs();
    }, []);

    return (
        <Container>
            <Row>
                <Card className="random-prayer my-5 shadow-lg border-0 rounded-3 overflow-hidden rainbow-border p-0">
                    <Card.Header className="text-white w-100 py-3 rounded-top" style={{backgroundColor: "#1E5C93"}}>
                        <h2 className="text-center">
                            <FaQuran className="me-2" />
                            Ayə
                        </h2>
                    </Card.Header>
                        {ayahs.map((ayah) => (  
                            <Card.Body className="p-4 bg-white rounded-bottom" key={ayah.id}>
                                <Card.Title className="arabic-text text-center mb-4 display-6 fw-bold text-primary">
                                    {ayah.arabic_text}
                                </Card.Title>
                                <Card.Text className="text-center fs-5 mb-3 fw-bold text-secondary">
                                    ({ayah.surah_number}/{ayah.surah_name}, {ayah.number})
                                </Card.Text>
                                <Card.Text className="text-center fs-5 text-muted">
                                    {ayah.translation}
                                </Card.Text>
                            </Card.Body>
                        ))}
                </Card>
            </Row>
        </Container>
    );
};

export default SurahDetail;
