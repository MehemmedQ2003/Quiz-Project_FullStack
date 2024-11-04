import { useState, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from "framer-motion";
import QuestionsCategoryDetail from '../../components/QuestionsCategoryDetail/QuestionsCategoryDetail';

const QuestionsCategory = () => {
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
    <Container className="categories py-5">
        <Container>
            <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h1 className="text-center fs-1 mb-5 fw-bold" style={{ color: '#1E5C93' }}>Mövzular</h1>
            </motion.div>
            <QuestionsCategoryDetail />
        </Container>
    </Container>
  )
}

export default QuestionsCategory
