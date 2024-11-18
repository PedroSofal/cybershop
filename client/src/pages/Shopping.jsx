import useFetchFromStore from '@hooks/useFetchFromStore';
import CategoryDisplay from '@components/CategoryDisplay';
import HeroBanner from '@banners/HeroBanner';
import Loader from '@components/ui/Loader';
import ServerError from '@components/ui/ServerError';

function Shopping() {
  const { dataList, isLoading, error } = useFetchFromStore('/products');
  
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