import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../utils/api';
import ProductCard from '../components/ProductCard';
import Filter from './components/Filter';
import { Container, Grid, Pagination } from '@mui/material';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    company: '',
    rating: 0,
    priceRange: [0, 1000],
    availability: true,
    sortOrder: 'price',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const loadProducts = async () => {
      let allProducts = [];
      const companies = ['company1', 'company2', 'company3', 'company4', 'company5'];

      for (const company of companies) {
        const products = await fetchProducts('all', company);
        allProducts = allProducts.concat(products);
      }

      setProducts(allProducts);
    };

    loadProducts();
  }, []);

  // Filter, sort, and paginate products
  const filteredProducts = products.filter(product => {
    return (filters.category ? product.category === filters.category : true)
      && (filters.company ? product.company === filters.company : true)
      && (product.rating >= filters.rating)
      && (product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1])
      && (product.availability === filters.availability);
  });

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (filters.sortOrder === 'price') return a.price - b.price;
    if (filters.sortOrder === 'rating') return b.rating - a.rating;
    if (filters.sortOrder === 'discount') return b.discount - a.discount;
  });

  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container>
      <h1>All Products</h1>
      <Filter filters={filters} setFilters={setFilters} />
      <Grid container spacing={2}>
        {paginatedProducts.map(product => (
          <Grid item key={product.uniqueId} xs={12} sm={6} md={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(filteredProducts.length / itemsPerPage)}
        page={currentPage}
        onChange={(event, value) => setCurrentPage(value)}
      />
    </Container>
  );
};

export default AllProducts