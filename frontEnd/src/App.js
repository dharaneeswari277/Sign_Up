import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Login from "./Login";

function App() {
  return (
    <Container>
      <Row>
        <Col>
            <Routes>
              <Route path="/home" element={<Home />}/>
              <Route path="/" element={<Login />} />
            </Routes>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
