import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Department.css';

const Dashboard = () => {
  return (
    <Container fluid className="student-dashboard">
      <Row className="mt-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Student Co-Curricular Activities</Card.Title>
              <Card.Text>
                Details about various student Co-curricular Activities within the department.
              </Card.Text>
              <Link to="/cocurricular" className="btn btn-primary">
                Click Here
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Student Extracurricular Activity</Card.Title>
              <Card.Text>
              Details about various student Extra-curricular Activities within the department
              </Card.Text>
              <Link to="/extracurricular" className="btn btn-primary">
                Click Here
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Student Online Course Details</Card.Title>
              <Card.Text>
                List of online course  offered by the department.
              </Card.Text>
              <Link to="/onlinecourse" className="btn btn-primary">
                Click Here
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Student Internship/Inplant Training Details</Card.Title>
              <Card.Text>
                Information about different clubs and their events.
              </Card.Text>
              <Link to="/internship" className="btn btn-primary">
                Click Here
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Student Publication Details</Card.Title>
              <Card.Text>
                List of value-added courses offered by the department.
              </Card.Text>
              <Link to="/publication" className="btn btn-primary">
                Click Here
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Student Awards/Achievements Details</Card.Title>
              <Card.Text>
                List of value-added courses offered by the department.
              </Card.Text>
              <Link to="/awards" className="btn btn-primary">
                Click Here
              </Link>
            </Card.Body>
          </Card>
        </Col>
        {/* <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Student Industrial Visit/Educational Tour Details</Card.Title>
              <Card.Text>
                List of value-added courses offered by the department.
              </Card.Text>
              <Link to="/tour" className="btn btn-primary">
                Click Here
              </Link>
            </Card.Body>
          </Card>
        </Col> */}
      </Row>
    </Container>
  );
};

export default Dashboard;
