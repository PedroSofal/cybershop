import useFetchFromStore from '@hooks/useFetchFromStore';
import ProductList from '@components/ProductList';
import Loader from '@components/ui/Loader';
import ServerError from '@components/ui/ServerError';

function RelatedProducts({ refProduct }) {
  const DATA_URL = `/products/category/${refProduct.category}`;
  const { dataList, isLoading, error } = useFetchFromStore(DATA_URL);

  const relatedProducts = dataList.filter(product => product.id !== refProduct.id);

  if (isLoading) return <Loader />
  if (error) return <ServerError />

  return (
    <ProductList products={relatedProducts}></ProductList>
  );
}

export default RelatedProducts;