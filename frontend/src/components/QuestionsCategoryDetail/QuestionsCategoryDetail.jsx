import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, Row, Col, Badge } from "react-bootstrap";
import { FaBookOpen } from "react-icons/fa";
import { Link } from 'react-router-dom';

const QuestionsCategoryDetail = () => {
    const [questionsCategories, setQuestionsCategories] = useState([]);

    useEffect(() => {
        const fetchSurahs = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/question-categories/");
                const categories = response.data;
                setQuestionsCategories(categories);
            } catch (error) {
                console.error("Error fetching surahs:", error);
            }
        };
        fetchSurahs();
    }, []);
    return (
        <Row xs={1} md={2} lg={3} className="g-5">
            {questionsCategories.map((category) => (
                <Col key={category.id}>
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                        <Card className="h-100 shadow border-0 rounded-lg overflow-hidden">
                            <div style={{ position: 'relative' }}>
                                <Card.Img variant="top" style={{ height: '200px', objectFit: 'cover' }} src={category.image} />
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}></div>
                            </div>
                            <Card.Body className="d-flex flex-column">
                                <Card.Title className='text-center mb-3 fw-bold'>{category.name}</Card.Title>
                                <Badge className="align-self-center mb-3" style={{ backgroundColor: '#1E5C93', fontSize: "16px" }}>
                                {category.count_questions}  sual
                                </Badge>
                                <Link
                                to={category.count_questions}
                                    className='btn mt-auto fw-bold text-white d-flex align-items-center justify-content-center gap-2'
                                    style={{ backgroundColor: '#1E5C93', transition: 'all 0.3s' }}
                                >
                                    <FaBookOpen />
                                    Testə başla
                                </Link>
                            </Card.Body>
                        </Card>
                    </motion.div>
                </Col>
            ))}
        </Row>
    )
}

export default QuestionsCategoryDetail
