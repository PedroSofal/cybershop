import useFetchData from '@hooks/useFetchData';
import ProductList from '@components/ProductList';
import Loader from '@components/ui/Loader';
import ServerError from '@components/ui/ServerError';

const DATA_URL = 'https://fakestoreapi.com/products/category';

function RelatedProducts({ refProduct }) {
  const { dataList, isLoading, error } = useFetchData(`${DATA_URL}/${refProduct.category}`);

  const relatedProducts = dataList.filter(product => product.id !== refProduct.id);

  if (isLoading) return <Loader />
  if (error) return <ServerError />

  return (
    <ProductList products={relatedProducts}></ProductList>
  );
}

export default RelatedProducts;