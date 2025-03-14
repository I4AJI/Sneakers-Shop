// src/pages/LoginPage.js
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  // API URL
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Используем полный URL для запроса
      const { data } = await axios.post(`${apiUrl}/api/users/login`, { email, password });
      
      console.log('Login response:', data); // Для отладки
      
      // Сохраняем данные пользователя и токен
      localStorage.setItem('userInfo', JSON.stringify(data));
      localStorage.setItem('token', data.token);
      
      // Перенаправляем на страницу админа, если это администратор
      if (data.isAdmin) {
        navigate('/admin/products');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error); // Для отладки
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Invalid email or password'
      );
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={6}>
          <h1>Sign In</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Sign In
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
