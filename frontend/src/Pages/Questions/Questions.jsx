import axios from 'axios';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Alert, Spinner } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const StyledContainer = styled(Container)`
  background-color: #f0f4f8;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const QuestionCard = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &.correct {
    background-color: #8bca84;
  }

  &.incorrect {
    background-color: #ee6e6b;
  }
`;

const AnswerLabel = styled.label`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e9ecef;
  }
`;

const StyledButton = styled(Button)`
  background-color: #1E5C93;
  border: none;
  padding: 0.75rem 1.5rem;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    background-color: #1E5C77;
    transform: translateY(-2px);
  }
`;


const Questions = () => {
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [currentCategoryData, setCurrentCategoryData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const categoryId = location.state?.categoryId;

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/questions/");
                const tests = response.data;
                const filteredQuestions = tests.questions ? tests.questions.filter(question => question.categoryId === categoryId) : [];
                setQuestions(filteredQuestions);
                setCurrentCategoryData(tests.categoryData || {});
            } catch (error) {
                console.error("Error fetching questions:", error);
                setShowAlert(true);
            }
        };
        fetchQuestions();
    }, [categoryId]);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
        });

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

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

    if (questions.length === 0 && currentCategoryData.questions && currentCategoryData.questions.length === 0) {
        return (
            <Container fluid className="d-flex align-items-center justify-content-center" style={{ minHeight: 'calc(100vh - 312px)' }}>
                <Row>
                    <Col>
                        <div className="text-center p-5 rounded-lg shadow-lg" style={{ backgroundColor: '#1E5C93' }}>
                            <i className="fas fa-question-circle fa-4x mb-4" style={{ color: '#FFA500' }}></i>
                            <h2 className="text-white mb-3">Suallar tapılmadı</h2>
                            <p className="text-light">Bu kateqoriyada hələ suallar əlavə edilməyib.</p>
                            <Button variant="outline-light" className="mt-3" onClick={() => window.history.back()}>
                                Geri qayıt
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }

    const handleAnswerSelect = (questionIndex, answer) => {
        setUserAnswers(prevAnswers => {
            const currentAnswers = prevAnswers[questionIndex] || [];
            if (currentAnswers.includes(answer)) {
                return {
                    ...prevAnswers,
                    [questionIndex]: currentAnswers.filter(a => a !== answer)
                };
            } else {
                return {
                    ...prevAnswers,
                    [questionIndex]: [...currentAnswers, answer]
                };
            }
        });
    };

    const handleShowResults = () => {
        if (!currentCategoryData.questions || Object.keys(userAnswers).length < currentCategoryData.questions.length) {
            setShowAlert(true);
        } else {
            setShowResults(true);
            setShowAlert(false);
        }
    };

    const getAnswerStatus = (question, userAnswer) => {
        const correctAnswers = question.correctAnswers;
        return JSON.stringify(userAnswer?.sort()) === JSON.stringify(correctAnswers.sort()) ? 'correct' : 'incorrect';
    };

    const getCorrectAndIncorrectCount = () => {
        let correctCount = 0;
        let incorrectCount = 0;

        questions.forEach((question) => {
            if (getAnswerStatus(question, userAnswers[question.id] || []) === 'correct') {
                correctCount++;
            } else {
                incorrectCount++;
            }
        });

        return { correctCount, incorrectCount };
    };

    const { correctCount, incorrectCount } = getCorrectAndIncorrectCount();
  return (
    <StyledContainer className="my-4 questions-page">
        <Link to="/questionscategory" className='d-flex align-items-center gap-2 mb-4 text-decoration-none'>
            <FaArrowLeft className='fs-1 text-white' style={{ cursor: 'pointer', backgroundColor: '#1E5C93', padding: '10px', borderRadius: '50%' }} />
            <p className='fs-4 text-dark fw-bold mb-0'>Əvvəlki səhifə</p>
        </Link>
        <div className='d-flex align-items-center justify-content-center gap-3 mb-4'>
            <h1 className="text-center fw-bold">{currentCategoryData.category} Testi</h1>
        </div>
        {questions.length > 0 ? questions.map((question) => (
            <QuestionCard
                key={question.id}
                className={`${showResults ? getAnswerStatus(question, userAnswers[question.id]) : ''}`}
            >
                <h2 className="mb-3"><b>{question.id}.</b> {question.questionTitle}</h2>
                <ul className="list-unstyled">
                    {question.answers.map((answer) => (
                        <li key={answer}>
                            <AnswerLabel className='fs-5'>
                                <input
                                    type={question.correctAnswers.length === 1 ? "radio" : "checkbox"}
                                    className='me-2'
                                    name={`question-${question.id}`}
                                    value={answer}
                                    checked={userAnswers[question.id]?.includes(answer)}
                                    onChange={() => handleAnswerSelect(question.id, answer)}
                                    disabled={showResults}
                                />
                                {answer}
                            </AnswerLabel>
                        </li>
                    ))}
                </ul>
                {showResults && getAnswerStatus(question, userAnswers[question.id]) === 'incorrect' && (
                    <div className="result-text mt-3 p-2 bg-light rounded">
                        <p className='mb-1'><b>Doğru cavab:</b></p>
                        <ul>
                            {question.correctAnswers.map((correctAnswer) => (
                                <li key={correctAnswer}>{correctAnswer}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </QuestionCard>
        )) : (
            <div className="text-center mt-4">
                <p className="text-danger">Bu kateqoriyada suallar yoxdur.</p>
            </div>
        )}
        {!showResults && (
            <div className="text-center mt-4">
                <StyledButton onClick={handleShowResults}>
                    Nəticələri göstər
                </StyledButton>
            </div>
        )}
        {showAlert && (
            <Alert variant="danger" className="mt-4 bg-danger text-white" onClose={() => setShowAlert(false)} dismissible>
                Zəhmət olmasa bütün sualları cavablandırın.
            </Alert>
        )}
        {showResults && (
            <div className="results-summary text-center mt-4 p-4 bg-white rounded shadow">
                <h4 className="fw-bold fs-2 mb-3">Nəticə:</h4>
                <p className='fs-4 text-success fw-bold'>Doğru cavabların sayı: {correctCount}</p>
                <p className='fs-4 text-danger fw-bold'>Səhv cavabların sayı: {incorrectCount}</p>
            </div>
        )}
    </StyledContainer>
  )
}

export default Questions
