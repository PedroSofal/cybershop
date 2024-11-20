// Hooks
import { Navigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Components
import ProductList from '@showcase/components/ProductList';

// Data
import categories from '@data/categories';

function CategoryDisplay({ allProducts }) {
  const { category } = useParams();
  
  const [ displayedCategory, setDisplayedCategory ] = useState([]);
  const [ categoryName, setCategoryName ] = useState('');
  
  const validPage = categories[category];

  useEffect(() => {
    const filteredData = allProducts.filter(product => {
      if (validPage) {
        return product.category === validPage.name;
      }
    });

    setDisplayedCategory(filteredData);
    setCategoryName(validPage?.title);
  }, [allProducts, category]);

  if (!validPage) return <Navigate to='/404' replace />

  return (
    displayedCategory.length > 0 &&
    <main>
      <h1 className="page-title">{categoryName}</h1>
      <ProductList products={displayedCategory} withAddToCart></ProductList>
    </main>
  );
}

export default CategoryDisplay;