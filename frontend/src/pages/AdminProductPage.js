// src/pages/AdminProductPage.js
import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

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
  const [debug, setDebug] = useState(''); // For debugging information
  const navigate = useNavigate();

  // API URL
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';

  // Check authentication on every render
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
    const token = localStorage.getItem('token');

    if (!userInfo || !token) {
      setDebug('No user info or token found, redirecting to login...');
      navigate('/login');
      return;
    }

    if (!userInfo.isAdmin) {
      setDebug('User is not admin, redirecting to home...');
      navigate('/');
      return;
    }

    setDebug(`User authenticated as admin: ${userInfo.name}`);
  }, [navigate]);

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setDebug(`Fetching products from: ${apiUrl}/api/products`);
        const { data } = await axios.get(`${apiUrl}/api/products`);
        setDebug(`Products fetched: ${data.length} items`);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setDebug(`Error fetching products: ${error.message}`);
        setError(`Failed to load products: ${error.message}`);
      }
    };

    fetchProducts();
  }, [apiUrl]);

  // File upload handler
  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDebug(`File selected: ${file.name}, size: ${file.size} bytes, type: ${file.type}`);
      setImage(file);
    }
  };

  // Form reset handler
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
    setDebug('Form reset');
  };

  // Edit product handler
  const handleEdit = (product) => {
    setName(product.name);
    setBrand(product.brand);
    setDescription(product.description);
    setPrice(product.price);
    setSizes(Array.isArray(product.sizes) ? product.sizes.join(', ') : '');
    setColors(Array.isArray(product.colors) ? product.colors.join(', ') : '');
    setCountInStock(product.countInStock);
    setIsEdit(true);
    setEditId(product._id);
    setDebug(`Editing product: ${product.name} (ID: ${product._id})`);
  };

  // Delete product handler
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const token = localStorage.getItem('token');
        setDebug(`Deleting product ID: ${id}, Token: ${token ? 'Present' : 'Missing'}`);
        
        await axios.delete(`${apiUrl}/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        setProducts(products.filter((p) => p._id !== id));
        setMessage('Product deleted successfully');
        setDebug('Product deleted successfully');
      } catch (error) {
        console.error('Error deleting product:', error);
        setDebug(`Error deleting product: ${error.response?.data?.message || error.message}`);
        setError(`Failed to delete product: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  // Form submission handler
  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setDebug('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Authentication token missing. Please log in again.');
      setDebug('Token missing during form submission');
      return;
    }

    try {
      setUploading(true);
      
      // Create form data
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
        setDebug(`Adding image to form: ${image.name}`);
      } else if (isEdit) {
        setDebug('No new image selected for edit');
      } else {
        setDebug('No image selected for new product');
      }

      // Log form data entries for debugging
      for (let [key, value] of formData.entries()) {
        if (key !== 'image') {
          setDebug(prev => `${prev}\nForm data - ${key}: ${value}`);
        } else {
          setDebug(prev => `${prev}\nForm data - image: [File object]`);
        }
      }

      if (isEdit) {
        // Update existing product
        setDebug(`Updating product at: ${apiUrl}/api/products/${editId}`);
        
        const { data } = await axios.put(
          `${apiUrl}/api/products/${editId}`, 
          formData, 
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`
            }
          }
        );
        
        setDebug(`Product updated successfully: ${data._id}`);
        setProducts(products.map((p) => (p._id === editId ? data : p)));
        setMessage('Product updated successfully');
      } else {
        // Create new product
        setDebug(`Creating product at: ${apiUrl}/api/products`);
        
        const { data } = await axios.post(
          `${apiUrl}/api/products`, 
          formData, 
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`
            }
          }
        );
        
        setDebug(`Product created successfully: ${data._id}`);
        setProducts([...products, data]);
        setMessage('Product created successfully');
      }

      // Reset form after successful submission
      resetForm();
      
    } catch (error) {
      console.error('Error saving product:', error);
      
      const errorMsg = error.response?.data?.message || error.message || 'Unknown error';
      setDebug(`Error saving product: ${errorMsg}`);
      setError(`Failed to save product: ${errorMsg}`);
      
      // More detailed error logging
      if (error.response) {
        setDebug(`Response status: ${error.response.status}`);
        setDebug(`Response data: ${JSON.stringify(error.response.data)}`);
      }
    } finally {
      setUploading(false);
    }
  };

  // Helper function to get image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/200?text=No+Image';
    return imagePath.startsWith('/') ? `${apiUrl}${imagePath}` : imagePath;
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col md={12}>
          <h2>{isEdit ? 'Edit Product' : 'Add New Product'}</h2>
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          {debug && (
            <div className="mb-3 p-2 bg-light" style={{ whiteSpace: 'pre-wrap', fontSize: '12px' }}>
              <strong>Debug Info:</strong><br />
              {debug}
            </div>
          )}
          
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
                step="0.01"
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
                accept="image/*"
              />
              {uploading && <div className="mt-2">Uploading...</div>}
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
          {products.length === 0 ? (
            <Alert variant="info">No products found. Add your first product above!</Alert>
          ) : (
            <Row>
              {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Card className="my-3 p-3 rounded">
                    <Link to={`/product/${product._id}`}>
                      <Card.Img
                        src={getImageUrl(product.image)}
                        variant="top"
                        style={{ height: '200px', objectFit: 'contain' }}
                        onError={(e) => { 
                          e.target.onerror = null; 
                          e.target.src = 'https://via.placeholder.com/200?text=Image+Error'; 
                        }}
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
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminProductPage;
