import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminProductPage = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [sizes, setSizes] = useState('');
  const [colors, setColors] = useState('');
  const [image, setImage] = useState(null);
  const [countInStock, setCountInStock] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Получение данных о товарах
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };
    fetchProducts();
  }, []);

  // Получение токена авторизации (например, из localStorage)
  const token = localStorage.getItem('token');

  // Обработчик для загрузки изображения
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  // Обработчик для сброса формы
  const resetForm = () => {
    setName('');
    setBrand('');
    setDescription('');
    setPrice(0);
    setSizes('');
    setColors('');
    setImage(null);
    setCountInStock(0);
    setIsEdit(false);
    setEditId(null);
  };

  // Обработчик для редактирования товара
  const handleEdit = (product) => {
    setName(product.name);
    setBrand(product.brand);
    setDescription(product.description);
    setPrice(product.price);
    setSizes(product.sizes.join(', '));
    setColors(product.colors.join(', '));
    setCountInStock(product.countInStock);
    setIsEdit(true);
    setEditId(product._id);
  };

  // Обработчик для удаления товара
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(products.filter((p) => p._id !== id));
        setMessage('Product deleted successfully');
      } catch (error) {
        setError('Failed to delete product');
        console.error('Error deleting product', error);
      }
    }
  };

  // Обработчик отправки формы
  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('brand', brand);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('sizes', sizes);
    formData.append('colors', colors);
    formData.append('countInStock', countInStock);
    if (image) {
      formData.append('image', image);
    }

    try {
      setUploading(true);

      if (isEdit) {
        // Обновляем существующий товар
        const { data } = await axios.put(`/api/products/${editId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(products.map((p) => (p._id === editId ? data : p)));
        setMessage('Product updated successfully');
      } else {
        // Создаем новый товар
        const { data } = await axios.post('/api/products', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts([...products, data]);
        setMessage('Product created successfully');
      }

      resetForm();
    } catch (error) {
      setError('Failed to save product');
      console.error('Error saving product', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col md={12}>
          <h2>{isEdit ? 'Edit Product' : 'Add New Product'}</h2>
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Sizes (comma separated)</Form.Label>
              <Form.Control
                type="text"
                placeholder="7, 8, 9, 10, 11"
                value={sizes}
                onChange={(e) => setSizes(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Colors (comma separated)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Black, White, Red"
                value={colors}
                onChange={(e) => setColors(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={uploadFileHandler}
              />
              {uploading && <p>Uploading...</p>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter count in stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={uploading}>
              {isEdit ? 'Update Product' : 'Add Product'}
            </Button>
            {isEdit && (
              <Button
                variant="secondary"
                className="ms-2"
                onClick={resetForm}
              >
                Cancel
              </Button>
            )}
          </Form>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={12}>
          <h2>Products</h2>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Card className="my-3 p-3 rounded">
                  <Link to={`/product/${product._id}`}>
                    <Card.Img
                      src={product.image}
                      variant="top"
                      style={{ height: '200px', objectFit: 'contain' }}
                    />
                  </Link>
                  <Card.Body>
                    <Card.Title as="div">
                      <strong>{product.name}</strong>
                    </Card.Title>
                    <Card.Text as="h3">${product.price}</Card.Text>
                    <Button
                      variant="info"
                      className="btn-sm me-2"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminProductPage;