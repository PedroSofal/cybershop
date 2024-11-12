import useFetchData from '@hooks/useFetchData';
import CategoryDisplay from '@components/CategoryDisplay';
import HeroBanner from '@banners/HeroBanner';
import Loader from '@components/ui/Loader';
import ServerError from '@components/ui/ServerError';

const DATA_URL = 'https://fakestoreapi.com/products';

function Shopping() {
  const { dataList, isLoading, error } = useFetchData(DATA_URL);
  
  if (isLoading) return <Loader />
  if (error) return <ServerError />

  return (
    <>
    <HeroBanner />
    <CategoryDisplay allProducts={dataList} />
    </>
  )
}

export default Shopping;