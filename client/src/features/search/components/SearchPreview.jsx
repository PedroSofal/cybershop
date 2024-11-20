// Hooks
import useSearch from '@search/hooks/useSearch';

// Components
import ProductListMin from '@showcase/components/ProductListMin';
import Loader from '@components/ui/Loader';

function SearchPreview({ searchTerm }) {
  const { searchResults, isLoading, error } = useSearch(searchTerm);

  return (
    <ProductListMin
      emptyState={
        isLoading
          ? <Loader />
          : error
            ? <p>Lamentamos, mas um error ocorreu em nosso servidor. Por favor, tente novamente mais tarde.</p>
            : searchResults.length === 0
              ? <p>Nenhum produto encontrado</p>
              : null
      }
      products={searchResults}
      ariaLabel="prévia dos resultados da busca"
      seeMoreText={searchResults.length > 1
        ? `Ver todos os ${searchResults.length} resultados`
        : `Ver resultado`
      }
      seeMoreLink={`/busca/${searchTerm}`}
    />
  );
}

export default SearchPreview;