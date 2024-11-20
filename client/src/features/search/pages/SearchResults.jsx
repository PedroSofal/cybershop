// Hooks
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import useSearch from '@search/hooks/useSearch';

// Components
import ProductList from '@showcase/components/ProductList';
import Loader from '@components/ui/Loader';
import ScreenContainer from '@containers/ScreenContainer';

function SearchResults() {
  const titleRef = useRef();
  const { searchTerm } = useParams();
  const { searchResults, isLoading, error } = useSearch(searchTerm);

  useEffect(() => {
    if (!isLoading) {
      titleRef.current?.focus();
    }
  }, [isLoading]);
  
  return (
    <main>
      {isLoading
        ? <Loader />
        : (
          <>
          <h1
            ref={titleRef}
            tabIndex={-1}
            className="page-title"
          >
            {`Você buscou por "${searchTerm}"`}
          </h1>
          {searchResults.length > 0
            ? <ProductList products={searchResults} withAddToCart></ProductList>
            : error
              ? <p>Lamentamos, mas um error ocorreu em nosso servidor. Por favor, tente novamente mais tarde.</p>
              : <NoResults searchTerm={searchTerm} />
          }
          </>
        )
      }
    </main>
  );
}

function NoResults({ searchTerm }) {
  return (
    <ScreenContainer>
      <p className="ascii">
      &gt; Procurando por produtos com o termo &apos;{searchTerm}&apos;...
      <br />&gt;
      <br />&gt; Infelizmente não encontramos resultados para a sua pesquisa.</p>
    </ScreenContainer>
  )
}

export default SearchResults;