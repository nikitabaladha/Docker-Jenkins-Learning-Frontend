import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer" id="footer">
      <Container>
        <Row>
          <Col xs={12} sm={6} md={4} lg={3}>
            <h5>Stay Updated</h5>
            <Form>
              <Form.Group controlId="newsletter">
                <Form.Label>Newsletter Signup</Form.Label>
                <Form.Control type="email" placeholder="Enter email address" />
                <Button variant="primary" type="submit">
                  Subscribe
                </Button>
              </Form.Group>
            </Form>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/terms">Terms of Service</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
            </ul>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3}>
            <h5>Contact Us</h5>
            <p>
              <i className="fas fa-map-marker-alt" /> 123 Main St, Anytown,
              India
            </p>
            <p>
              <i className="fas fa-phone" /> +91 1234567890
            </p>
            <p>
              <i className="fas fa-envelope" />{" "}
              <Link to="mailto:info@bookapp.com">info@wordworld.com</Link>
            </p>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3}>
            <h5>Copyright</h5>
            <p>&copy; 2024 Word World. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
