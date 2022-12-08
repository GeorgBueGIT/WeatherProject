import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  return (

      <Container className='container'>
      <Row>

        <div className='weatherData'>

        </div>
      </Row>
      <Row>
        <Col>
          <Form.Control
            type="text"
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
          />
        </Col>
        <Col>
          <Button variant="dark">Primary</Button>
        </Col>
      </Row>
      </Container>
  );
}

export default App;
