// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Обновляем состояние пользователя при изменении pathname или localStorage
  useEffect(() => {
    const checkUserLogin = () => {
      const userInfoFromStorage = localStorage.getItem('userInfo') 
        ? JSON.parse(localStorage.getItem('userInfo')) 
        : null;
      
      setUserInfo(userInfoFromStorage);
    };
    
    checkUserLogin();
    
    // Добавляем обработчик события storage для синхронизации между вкладками
    window.addEventListener('storage', checkUserLogin);
    
    return () => {
      window.removeEventListener('storage', checkUserLogin);
    };
  }, [location.pathname]); // Перепроверяем при изменении пути

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    setUserInfo(null);
    
    // Перебрасываем на домашнюю страницу после выхода
    navigate('/');
    
    // Вызываем событие storage для синхронизации между вкладками
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to="/">SneakerShop</Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/cart">
                <i className="fas fa-shopping-cart"></i> Cart
              </Nav.Link>
              
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <NavDropdown.Item as={Link} to="/profile">
                    Profile
                  </NavDropdown.Item>
                  
                  {userInfo.isAdmin && (
                    <NavDropdown.Item as={Link} to="/admin/products">
                      Manage Products
                    </NavDropdown.Item>
                  )}
                  
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to="/login">
                  <i className="fas fa-user"></i> Sign In
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
