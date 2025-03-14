import { Row, Col } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Используем полный URL бэкенда или переменную окружения
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
        const { data } = await axios.get(`${apiUrl}/api/products`);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <h1>Latest Sneakers</h1>
      <Row>
        {products.map((product, index) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <ProductCard product={product} index={index} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomePage;
