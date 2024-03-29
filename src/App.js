import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import AppRoutes from './AppRoutes';
import { NavBar, Footer } from './layouts';
import './App.css';

function App() {
  return (
    <div className="bg-dark text-light min-vh-100">
      <Container>
        <Row className='justify-content-center'>
          <Col md={12}lg={10}>
            <NavBar />
            <AppRoutes />
            <hr />
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className='justify-content-center'>
          <Col md={12} lg={10}>
            <Footer />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default App;
