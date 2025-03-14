// src/pages/CartPage.js
import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // API URL
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';

  // Получение параметров из URL
  const qty = new URLSearchParams(location.search).get('qty') 
    ? Number(new URLSearchParams(location.search).get('qty')) 
    : 1;
  const size = new URLSearchParams(location.search).get('size') || '';
  const color = new URLSearchParams(location.search).get('color') || '';

  // Функция для получения полного URL изображения
  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/100?text=No+Image';
    return imagePath.startsWith('/') ? `${apiUrl}${imagePath}` : imagePath;
  };

  useEffect(() => {
    // Получаем текущую корзину из localStorage
    const existingCart = localStorage.getItem('cartItems') 
      ? JSON.parse(localStorage.getItem('cartItems')) 
      : [];
    
    // Если указан ID товара, добавляем его в корзину
    if (id) {
      const fetchProductAndAddToCart = async () => {
        try {
          // Используем полный URL для API запроса
          const { data } = await axios.get(`${apiUrl}/api/products/${id}`);
          
          // Проверяем, есть ли уже такой товар в корзине
          const existItem = existingCart.find(
            x => x._id === id && x.size === size && x.color === color
          );
          
          let updatedCart;
          
          if (existItem) {
            // Обновляем существующий товар
            updatedCart = existingCart.map(x => 
              x._id === id && x.size === size && x.color === color
                ? { ...x, qty: x.qty + qty } 
                : x
            );
          } else {
            // Добавляем новый товар
            const newItem = {
              _id: data._id,
              name: data.name,
              image: data.image,
              price: data.price,
              countInStock: data.countInStock,
              qty,
              size,
              color
            };
            updatedCart = [...existingCart, newItem];
          }
          
          // Сохраняем корзину в localStorage
          localStorage.setItem('cartItems', JSON.stringify(updatedCart));
          setCartItems(updatedCart);
          
          // Перенаправляем на страницу корзины без параметров
          navigate('/cart');
        } catch (error) {
          console.error('Error adding to cart:', error);
        }
      };
      
      fetchProductAndAddToCart();
    } else {
      // Просто загружаем существующую корзину
      setCartItems(existingCart);
    }
  }, [id, qty, size, color, navigate, apiUrl]);

  // Обработчик удаления товара из корзины
  const removeFromCartHandler = (id, size, color) => {
    const updatedCart = cartItems.filter(
      item => !(item._id === id && item.size === size && item.color === color)
    );
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  // Обработчик изменения количества товара
  const updateQtyHandler = (id, size, color, newQty) => {
    const updatedCart = cartItems.map(item => 
      (item._id === id && item.size === size && item.color === color)
        ? { ...item, qty: Number(newQty) } 
        : item
    );
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  // Обработчик оформления заказа
  const checkoutHandler = () => {
    // Для MVP просто показываем сообщение
    alert('Checkout functionality will be implemented in future updates!');
  };

  // Расчет итоговых сумм
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);
  const taxPrice = (0.15 * itemsPrice).toFixed(2);
  const shippingPrice = (itemsPrice > 100 ? 0 : 10).toFixed(2);
  const totalPrice = (Number(itemsPrice) + Number(taxPrice) + Number(shippingPrice)).toFixed(2);

  return (
    <>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <div className="alert alert-info">
              Your cart is empty <Link to="/">Go Back</Link>
            </div>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map(item => (
                <ListGroup.Item key={`${item._id}-${item.size}-${item.color}`}>
                  <Row>
                    <Col md={2}>
                      <Image 
                        src={getImageUrl(item.image)} 
                        alt={item.name} 
                        fluid 
                        rounded 
                        className="cart-image"
                        onError={(e) => { 
                          e.target.onerror = null; 
                          e.target.src = 'https://via.placeholder.com/100?text=Image+Error'; 
                        }}
                      />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={1}>
                      <div>Size: {item.size}</div>
                      <div>Color: {item.color}</div>
                    </Col>
                    <Col md={2}>
                      <Form.Select
                        value={item.qty}
                        onChange={e => updateQtyHandler(
                          item._id, 
                          item.size, 
                          item.color, 
                          e.target.value
                        )}
                      >
                        {[...Array(Math.min(10, item.countInStock)).keys()].map(x => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item._id, item.size, item.color)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block w-100"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartPage;
