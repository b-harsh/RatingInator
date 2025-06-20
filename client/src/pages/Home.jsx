import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import API from '../api';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get('/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };

    fetchProducts();

    const handleRefresh = () => {
      fetchProducts();
    };
    window.addEventListener('review-submitted', handleRefresh);

    return () => {
      window.removeEventListener('review-submitted', handleRefresh);
    };
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
